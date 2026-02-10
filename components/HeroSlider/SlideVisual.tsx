import type { HeroSlide } from './types';

type SlideVisualProps = {
  slide: HeroSlide;
  index: number;
  isActive: boolean;
  reducedMotion: boolean;
};

export const SlideVisual = ({ slide, index, isActive, reducedMotion }: SlideVisualProps) => {
  const commonClasses = [
    'absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
    isActive ? 'opacity-100 translate-y-0 scale-[1.01]' : 'opacity-0 translate-y-2 scale-100 pointer-events-none',
    reducedMotion ? 'duration-150' : '',
  ].join(' ');

  return (
    <div
      className={[
        commonClasses,
        'rounded-[1.75rem] border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-[0_20px_80px_rgba(3,14,12,0.35)]',
      ].join(' ')}
      aria-hidden={!isActive}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/20"
        style={reducedMotion ? undefined : { animation: 'hs-float 6s ease-in-out infinite' }}
      >
        {slide.visual.type === 'image' ? (
          <img
            src={slide.visual.src}
            alt={slide.visual.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={slide.visual.src}
            poster={slide.visual.poster}
            muted={slide.visual.muted ?? true}
            loop={slide.visual.loop ?? true}
            playsInline
            autoPlay={isActive}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};
