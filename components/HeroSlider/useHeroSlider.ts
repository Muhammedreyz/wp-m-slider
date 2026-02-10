import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type UseHeroSliderOptions = {
  total: number;
  autoPlay: boolean;
  intervalMs: number;
  initialIndex: number;
  onSlideChange?: (index: number) => void;
};

type SwipeHandlers = {
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchMove: (event: React.TouchEvent) => void;
  onTouchEnd: () => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const useHeroSlider = ({
  total,
  autoPlay,
  intervalMs,
  initialIndex,
  onSlideChange,
}: UseHeroSliderOptions) => {
  const [currentIndex, setCurrentIndex] = useState(() => clamp(initialIndex, 0, Math.max(total - 1, 0)));
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [progressMs, setProgressMs] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (total <= 0) return;
      const normalized = (index + total) % total;
      setCurrentIndex(normalized);
      setProgressMs(0);
    },
    [total],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  useEffect(() => {
    const onVisibility = () => setIsTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();

    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!autoPlay || reducedMotion || isHovered || !isTabVisible || total < 2) return;

    let frameId = 0;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      setProgressMs(elapsed);

      if (elapsed >= intervalMs) {
        next();
        start = timestamp;
        setProgressMs(0);
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [autoPlay, intervalMs, isHovered, isTabVisible, next, reducedMotion, total]);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchCurrentX.current = touchStartX.current;
  }, []);

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    touchCurrentX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchCurrentX.current === null) return;

    const delta = touchCurrentX.current - touchStartX.current;
    const threshold = 48;

    if (Math.abs(delta) >= threshold) {
      if (delta > 0) prev();
      else next();
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  }, [next, prev]);

  const swipeHandlers: SwipeHandlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };

  return {
    currentIndex,
    progressPercent: Math.min((progressMs / intervalMs) * 100, 100),
    setHovered: setIsHovered,
    goTo,
    next,
    prev,
    swipeHandlers,
    reducedMotion,
  };
};
