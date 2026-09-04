import type { Metric } from "@/lib/content";

/**
 * A row of hard numbers pulled out of the bullet points, so the scale of a
 * system is readable before anyone reads the prose.
 */
export function MetricRow({ metrics }: { metrics?: Metric[] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-5">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span className="block font-serif text-[26px] leading-none tracking-tight text-fg">
              {metric.value}
            </span>
            <span className="label mt-2 block">{metric.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
