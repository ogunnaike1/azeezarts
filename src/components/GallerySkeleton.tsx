/**
 * Loading state for the catalogue and shop grids. Empty frames on the wall —
 * the same objects the real cards render, so nothing jumps when they arrive.
 */
export function GallerySkeleton({ count = 6 }: { count?: number }) {
  const ratios = ["4 / 5", "1 / 1", "3 / 4", "5 / 4", "4 / 3", "4 / 5"];

  return (
    <div className="shell pb-[clamp(70px,9vw,130px)] pt-[clamp(34px,4.5vw,64px)]">
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-start gap-[clamp(26px,3.4vw,56px)]"
        aria-hidden="true"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>
            <div
              className="skeleton frame w-full"
              style={{ aspectRatio: ratios[i % ratios.length] }}
            />
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <div className="flex-1">
                <div className="skeleton h-[18px] w-[68%]" />
                <div className="skeleton mt-2.5 h-[11px] w-[44%]" />
              </div>
              <div className="skeleton h-[12px] w-[52px]" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading works…</span>
    </div>
  );
}
