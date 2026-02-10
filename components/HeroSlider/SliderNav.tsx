type SliderNavProps = {
  currentIndex: number;
  total: number;
  progressPercent: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  helperText?: string;
};

const formatCounter = (value: number) => String(value + 1).padStart(2, '0');

export const SliderNav = ({
  currentIndex,
  total,
  progressPercent,
  onPrev,
  onNext,
  onGoTo,
  helperText,
}: SliderNavProps) => (
  <div className="mt-8 rounded-2xl border border-white/10 bg-[var(--hs-nav-bg)]/80 p-4 backdrop-blur md:mt-10 md:p-5">
    <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:gap-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Önceki slayt"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hs-accent)]"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Sonraki slayt"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hs-accent)]"
        >
          →
        </button>
      </div>

      <div className="flex min-w-[110px] items-center justify-center font-mono text-sm tracking-[0.2em] text-white/90">
        <span>{formatCounter(currentIndex)}</span>
        <span className="mx-2 text-white/40">—</span>
        <span>{String(total).padStart(2, '0')}</span>
      </div>

      <div className="order-4 w-full flex-1 md:order-none">
        <div className="relative h-[3px] overflow-hidden rounded-full bg-white/20">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--hs-accent)] transition-[width] duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div
          className="mt-3 grid gap-2"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: total }, (_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                type="button"
                aria-label={`${index + 1}. slayta git`}
                onClick={() => onGoTo(index)}
                className={[
                  'h-1.5 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hs-accent)]',
                  isActive ? 'bg-[var(--hs-accent)]' : 'bg-white/20 hover:bg-white/40',
                ].join(' ')}
              />
            );
          })}
        </div>
      </div>

      {helperText ? (
        <p className="ml-auto text-xs uppercase tracking-[0.16em] text-white/60 md:text-sm">{helperText}</p>
      ) : null}
    </div>
  </div>
);
