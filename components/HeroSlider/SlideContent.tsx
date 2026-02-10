import type { HeroSlide } from './types';

type SlideContentProps = {
  slide: HeroSlide;
  isActive: boolean;
  reducedMotion: boolean;
};

const highlightTitle = (title: string, highlightWords: string[] = []) => {
  if (!highlightWords.length) return title;

  const escaped = highlightWords
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .filter(Boolean);

  if (!escaped.length) return title;

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  return title.split(regex).map((part, index) => {
    const isHighlight = highlightWords.some((word) => word.toLowerCase() === part.toLowerCase());
    if (!isHighlight) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <span key={`${part}-${index}`} className="text-[var(--hs-accent)]">
        {part}
      </span>
    );
  });
};

export const SlideContent = ({ slide, isActive, reducedMotion }: SlideContentProps) => (
  <div
    className={[
      'w-full max-w-[620px] space-y-5 md:space-y-6',
      'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none absolute',
      reducedMotion ? 'duration-150' : '',
    ].join(' ')}
  >
    {slide.eyebrow ? (
      <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70 backdrop-blur">
        {slide.eyebrow}
      </p>
    ) : null}

    <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
      {highlightTitle(slide.title, slide.highlightWords)}
    </h1>

    <p className="max-w-[52ch] text-base leading-relaxed text-white/80 md:text-lg">{slide.description}</p>

    <a
      href={slide.cta.href}
      className={[
        'inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hs-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:text-base',
        slide.cta.variant === 'outline'
          ? 'border border-white/35 bg-transparent text-white hover:bg-white/10'
          : 'bg-[var(--hs-btn-bg)] text-[var(--hs-btn-text)] hover:brightness-110',
      ].join(' ')}
    >
      {slide.cta.label}
    </a>
  </div>
);
