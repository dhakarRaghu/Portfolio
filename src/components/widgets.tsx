"use client";

import { useEffect, useId, useState, type ComponentType } from "react";
import { createRoot, type Root } from "react-dom/client";

const GIB = 1024 ** 3;

type KvProps = {
  layers?: number;
  kvHeads?: number;
  headDim?: number;
  bytesPerValue?: number;
  gpuGb?: number;
  util?: number;
  weightsGb?: number;
  context?: number;
};

const CONTEXTS = [1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072];
const KV_HEADS = [1, 2, 4, 8, 16, 32];

function formatBytes(bytes: number): string {
  if (bytes >= GIB) return `${(bytes / GIB).toFixed(bytes >= 10 * GIB ? 1 : 2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

/**
 * KV cache size and how many requests fit on one GPU. The same formula as
 * the posts: 2 x layers x kv_heads x head_dim x bytes per value, per token.
 * Memory is counted in GiB and written GB, as the posts do.
 */
function KvCalculator(props: KvProps) {
  const id = useId();
  const layers = props.layers ?? 32;
  const headDim = props.headDim ?? 128;
  const bytesPerValue = props.bytesPerValue ?? 2;
  const gpuGb = props.gpuGb ?? 80;
  const weightsGb = props.weightsGb ?? 16;
  const [kvHeads, setKvHeads] = useState(props.kvHeads ?? 8);
  const [contextIndex, setContextIndex] = useState(
    Math.max(0, CONTEXTS.indexOf(props.context ?? 8192)),
  );
  const [util, setUtil] = useState(props.util ?? 0.92);

  const context = CONTEXTS[contextIndex];
  const perToken = 2 * layers * kvHeads * headDim * bytesPerValue;
  const perRequest = perToken * context;
  const pool = Math.max(0, gpuGb * util - weightsGb) * GIB;
  const fits = Math.floor(pool / perRequest);

  return (
    <div className="calc" role="group" aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="calc-title">
        KV cache calculator: {layers} layers, head_dim {headDim}, {bytesPerValue}-byte values,{" "}
        {gpuGb} GB GPU, {weightsGb} GB of weights
      </p>

      <div className="calc-controls">
        <label className="calc-field">
          <span>
            Context length <strong>{context.toLocaleString("en-US")} tokens</strong>
          </span>
          <input
            type="range"
            min={0}
            max={CONTEXTS.length - 1}
            step={1}
            value={contextIndex}
            onChange={(e) => setContextIndex(Number(e.target.value))}
            aria-valuetext={`${context} tokens`}
          />
        </label>

        <label className="calc-field">
          <span>
            Key-value heads <strong>{kvHeads}</strong>
          </span>
          <input
            type="range"
            min={0}
            max={KV_HEADS.length - 1}
            step={1}
            value={Math.max(0, KV_HEADS.indexOf(kvHeads))}
            onChange={(e) => setKvHeads(KV_HEADS[Number(e.target.value)])}
            aria-valuetext={`${kvHeads} key-value heads`}
          />
        </label>

        <label className="calc-field">
          <span>
            gpu_memory_utilization <strong>{util.toFixed(2)}</strong>
          </span>
          <input
            type="range"
            min={0.5}
            max={0.95}
            step={0.01}
            value={util}
            onChange={(e) => setUtil(Number(e.target.value))}
          />
        </label>
      </div>

      <dl className="calc-results" aria-live="polite">
        <div>
          <dt>Per token</dt>
          <dd>{formatBytes(perToken)}</dd>
        </div>
        <div>
          <dt>Per request</dt>
          <dd>{formatBytes(perRequest)}</dd>
        </div>
        <div>
          <dt>KV pool</dt>
          <dd>{formatBytes(pool)}</dd>
        </div>
        <div>
          <dt>Requests that fit</dt>
          <dd className="calc-big">{fits.toLocaleString("en-US")}</dd>
        </div>
      </dl>

      <p className="calc-note">
        2 × {layers} × {kvHeads} × {headDim} × {bytesPerValue} = {perToken.toLocaleString("en-US")}{" "}
        bytes per token. Pool = {gpuGb} × {util.toFixed(2)} − {weightsGb}. Arithmetic, not a
        benchmark.
      </p>
    </div>
  );
}

type Series = { name: string; values: number[] };
type ChartProps = {
  type?: "bar" | "line" | "stack";
  title?: string;
  unit?: string;
  labels?: string[];
  series?: Series[];
  caption?: string;
};

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 1 });

/** Horizontal bars, one row per label: the label sits above its bar. */
function Bars({ labels, series, unit }: Required<Pick<ChartProps, "labels" | "series">> & { unit?: string }) {
  const values = series[0]?.values ?? [];
  const max = Math.max(...values, 1);
  return (
    <ul className="chart-bars">
      {labels.map((label, i) => (
        <li key={label}>
          <span className="chart-label">{label}</span>
          <span className="chart-track">
            <span className="chart-bar" style={{ width: `${(values[i] / max) * 100}%` }} />
            <span className="chart-value">
              {fmt(values[i])}
              {unit ? ` ${unit}` : ""}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** One bar split into parts, such as where a GPU's memory goes. */
function Stack({ labels, series, unit }: Required<Pick<ChartProps, "labels" | "series">> & { unit?: string }) {
  const values = series[0]?.values ?? [];
  const total = values.reduce((a, b) => a + b, 0) || 1;
  return (
    <div>
      <div className="chart-stack" role="img" aria-label={labels.map((l, i) => `${l} ${fmt(values[i])}${unit ? " " + unit : ""}`).join(", ")}>
        {values.map((v, i) => (
          <span key={labels[i]} className={`chart-part part-${i % 4}`} style={{ width: `${(v / total) * 100}%` }} />
        ))}
      </div>
      <ul className="chart-legend">
        {labels.map((label, i) => (
          <li key={label}>
            <span className={`chart-swatch part-${i % 4}`} aria-hidden />
            {label} <strong>{fmt(values[i])}{unit ? ` ${unit}` : ""}</strong>{" "}
            <span className="chart-share">({Math.round((values[i] / total) * 100)}%)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Lines over a few x values, drawn as SVG in the page's colours. */
function Lines({ labels, series, unit }: Required<Pick<ChartProps, "labels" | "series">> & { unit?: string }) {
  const W = 460, H = 240, L = 52, R = 12, T = 22, B = 34;
  const all = series.flatMap((s) => s.values);
  const top = Math.max(...all, 1);
  const step = 10 ** Math.floor(Math.log10(top));
  const yMax = Math.ceil(top / step) * step;
  const x = (i: number) => L + (labels.length === 1 ? 0 : (i * (W - L - R)) / (labels.length - 1));
  const y = (v: number) => T + (1 - v / yMax) * (H - T - B);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img"
        aria-label={series.map((s) => `${s.name}: ${s.values.map(fmt).join(", ")}`).join("; ")}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="chart-grid" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end" className="chart-axis">{fmt(t)}</text>
          </g>
        ))}
        {labels.map((label, i) => (
          <text key={label} x={x(i)} y={H - 10} textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"} className="chart-axis">
            {label}
          </text>
        ))}
        {series.map((s, si) => (
          <g key={s.name} className={`series-${si % 4}`}>
            <polyline fill="none" strokeWidth={2.5} points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} />
            {s.values.map((v, i) => (
              <g key={i}>
                <circle cx={x(i)} cy={y(v)} r={4} />
                <text x={x(i) + (i === s.values.length - 1 ? -8 : 8)} y={y(v) - 10}
                  textAnchor={i === s.values.length - 1 ? "end" : "start"} className="chart-point">
                  {fmt(v)}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
      <ul className="chart-legend">
        {series.map((s, si) => (
          <li key={s.name}>
            <span className={`chart-swatch part-${si % 4}`} aria-hidden />
            {s.name}
          </li>
        ))}
      </ul>
      {unit ? <p className="chart-unit">Values in {unit}.</p> : null}
    </div>
  );
}

/**
 * A chart from JSON props. Plain HTML and SVG coloured by the site's CSS
 * variables, so it follows the theme without redrawing and stays readable
 * on a phone.
 */
function Chart({ type = "bar", title, unit, labels = [], series = [], caption }: ChartProps) {
  return (
    <figure className="chart">
      {title ? <p className="chart-title">{title}</p> : null}
      {type === "line" ? (
        <Lines labels={labels} series={series} unit={unit} />
      ) : type === "stack" ? (
        <Stack labels={labels} series={series} unit={unit} />
      ) : (
        <Bars labels={labels} series={series} unit={unit} />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

const WIDGETS: Record<string, ComponentType<Record<string, unknown>>> = {
  "kv-calculator": KvCalculator as ComponentType<Record<string, unknown>>,
  chart: Chart as ComponentType<Record<string, unknown>>,
};

/** Mounts each `div.widget` on the page as the component its name picks. */
export function Widgets() {
  useEffect(() => {
    const roots: Root[] = [];
    for (const el of document.querySelectorAll<HTMLElement>("div.widget[data-widget]")) {
      const Widget = WIDGETS[el.dataset.widget ?? ""];
      if (!Widget) continue;
      let props: Record<string, unknown> = {};
      try {
        props = JSON.parse(el.dataset.props ?? "{}");
      } catch {
        // Bad props: the widget uses its defaults.
      }
      const root = createRoot(el);
      root.render(<Widget {...props} />);
      roots.push(root);
    }
    return () => roots.forEach((r) => r.unmount());
  }, []);
  return null;
}
