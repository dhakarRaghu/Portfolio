"use client";

import { useEffect } from "react";

/**
 * A CSS colour as #rrggbb, painted over the page background. The site's
 * tokens are oklch() and some carry alpha; mermaid's colour maths reads
 * only hex and rgb, so each token is resolved by painting one pixel.
 */
function toHex(color: string, background: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "#888888";
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
}

/** Colours for diagrams, read from the page so both themes match the site. */
function themeVariables() {
  const css = getComputedStyle(document.documentElement);
  const bg = css.getPropertyValue("--bg").trim() || "#ffffff";
  const v = (name: string) => toHex(css.getPropertyValue(name).trim() || "#888888", bg);
  return {
    fontFamily: getComputedStyle(document.body).fontFamily,
    fontSize: "14px",
    background: v("--bg"),
    primaryColor: v("--surface"),
    primaryBorderColor: v("--border-strong"),
    primaryTextColor: v("--fg"),
    secondaryColor: v("--bg-subtle"),
    tertiaryColor: v("--bg-subtle"),
    lineColor: v("--fg-muted"),
    textColor: v("--fg"),
    mainBkg: v("--surface"),
    nodeBorder: v("--border-strong"),
    clusterBkg: v("--bg-subtle"),
    edgeLabelBackground: v("--bg"),
    pie1: v("--accent"),
    pie2: v("--fg-muted"),
    pie3: v("--border-strong"),
    pieStrokeColor: v("--bg"),
    pieTitleTextColor: v("--fg"),
    pieSectionTextColor: v("--bg"),
    pieLegendTextColor: v("--fg"),
    xyChart: {
      backgroundColor: v("--bg"),
      titleColor: v("--fg"),
      xAxisLabelColor: v("--fg-muted"),
      xAxisTitleColor: v("--fg-muted"),
      xAxisLineColor: v("--border"),
      xAxisTickColor: v("--border"),
      yAxisLabelColor: v("--fg-muted"),
      yAxisTitleColor: v("--fg-muted"),
      yAxisLineColor: v("--border"),
      yAxisTickColor: v("--border"),
      plotColorPalette: [v("--accent"), v("--fg-muted")].join(","),
    },
  };
}

/**
 * Draws every `pre.mermaid` on the page as an SVG, and draws them again when
 * the theme changes. The source stays in a data attribute so a redraw starts
 * from the text, not from the last SVG.
 */
export function Diagrams() {
  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const blocks = [...document.querySelectorAll<HTMLElement>("pre.mermaid")];
      if (blocks.length === 0) return;
      for (const block of blocks) {
        if (!block.dataset.source) block.dataset.source = block.textContent ?? "";
      }
      const mermaid = (await import("mermaid")).default;
      if (cancelled) return;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: themeVariables(),
        flowchart: { curve: "basis", padding: 12, useMaxWidth: true },
        pie: { useMaxWidth: true },
        xyChart: { width: 520, height: 320 },
      });
      for (const [i, block] of blocks.entries()) {
        try {
          const { svg } = await mermaid.render(`diagram-${i}-${Date.now()}`, block.dataset.source!);
          if (cancelled) return;
          block.innerHTML = svg;
          block.dataset.drawn = "true";
        } catch {
          // A diagram that does not parse stays as its source text.
          block.textContent = block.dataset.source!;
          block.dataset.drawn = "false";
        }
      }
    }

    draw();
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return null;
}
