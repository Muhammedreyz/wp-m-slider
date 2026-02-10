import { useMemo } from 'react';
import { SlideContent } from './SlideContent';
import { SlideVisual } from './SlideVisual';
import { SliderNav } from './SliderNav';
import type { HeroSlide, HeroSliderProps, HeroSliderThemeVars } from './types';
import { useHeroSlider } from './useHeroSlider';

const DEFAULT_HELPER_TEXT = 'Aşağı Kaydır';

const fallbackTheme = {
  gradientFrom: '#0E251F',
  gradientTo: '#06120E',
  accent: '#34D399',
  text: '#F3F7F6',
  buttonBg: '#2DD4BF',
  buttonText: '#03231D',
  navBg: '#0c1916',
  glow: '#39d39b',
};

const getThemeVars = (slide: HeroSlide): HeroSliderThemeVars => ({
  '--hs-from': slide.theme.gradientFrom || fallbackTheme.gradientFrom,
  '--hs-to': slide.theme.gradientTo || fallbackTheme.gradientTo,
  '--hs-accent': slide.theme.accent || fallbackTheme.accent,
  '--hs-text': slide.theme.text || fallbackTheme.text,
  '--hs-glow': slide.theme.glow || fallbackTheme.glow,
  '--hs-btn-bg': slide.theme.buttonBg || fallbackTheme.buttonBg,
  '--hs-btn-text': slide.theme.buttonText || fallbackTheme.buttonText,
  '--hs-nav-bg': slide.theme.navBg || fallbackTheme.navBg,
});

export const HeroSlider = ({
  slides,
  autoPlay = true,
  intervalMs = 5500,
  showNav = true,
  initialIndex = 0,
  helperText = DEFAULT_HELPER_TEXT,
  onSlideChange,
}: HeroSliderProps) => {
  const total = slides.length;

  const { currentIndex, progressPercent, setHovered, goTo, next, prev, swipeHandlers, reducedMotion } =
    useHeroSlider({
      total,
      autoPlay,
      intervalMs,
      initialIndex,
      onSlideChange,
    });

  const currentSlide = slides[currentIndex];

  const themeVars = useMemo(() => {
    if (!currentSlide) return undefined;
    return getThemeVars(currentSlide);
  }, [currentSlide]);

  if (!total || !currentSlide) {
    return null;
  }

  return (
    <section
      className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.09),transparent_55%),linear-gradient(135deg,var(--hs-from),var(--hs-to))] px-5 py-8 text-[var(--hs-text)] shadow-[0_16px_80px_rgba(1,12,10,0.35)] md:min-h-[80vh] md:px-8 md:py-10 lg:px-12"
      style={themeVars}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...swipeHandlers}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') prev();
        if (event.key === 'ArrowRight') next();
      }}
      tabIndex={0}
      aria-label="Hero tanıtım slider"
    >
      {/* Soft vignette + glow for premium depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.3),transparent_50%)]" />
      <div
        className="pointer-events-none absolute right-[8%] top-[15%] h-52 w-52 rounded-full blur-[90px]"
        style={{ background: 'color-mix(in srgb, var(--hs-glow) 50%, transparent)' }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col gap-8 md:items-center lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="relative order-2 min-h-[280px] lg:order-1 lg:min-h-[360px]">
          {slides.map((slide, index) => (
            <SlideContent
              key={slide.id}
              slide={slide}
              isActive={index === currentIndex}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <div className="relative order-1 h-[320px] w-full lg:order-2 lg:h-[560px]">
          {slides.map((slide, index) => (
            <SlideVisual
              key={slide.id}
              slide={slide}
              index={index}
              isActive={index === currentIndex}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>

      {showNav ? (
        <div className="relative z-10 mx-auto w-full max-w-[1320px]">
          <SliderNav
            currentIndex={currentIndex}
            total={total}
            progressPercent={progressPercent}
            onPrev={prev}
            onNext={next}
            onGoTo={goTo}
            helperText={helperText}
          />
        </div>
      ) : null}

      {!reducedMotion ? (
        <style>{`@keyframes hs-float { 0% { transform: translateY(0px); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0px);} }`}</style>
      ) : null}
    </section>
  );
};
