"use client";

import { useMemo } from "react";

// Граф логотипа Abadan: узлы на сфере, как на знаке «People. Growth. Technology».
// От сцены к сцене узлов становится больше — от нескольких людей до полной
// сферы, а по рёбрам бегут горчичные импульсы: знание, ставшее привычкой.
// Рисуется кодом (SVG), чтобы оставаться чётким на любом экране и весить
// килобайты, а не мегабайты.

const TOTAL = 26;
const SIZE = 320;
const R = 128;

type Node = { x: number; y: number; z: number; gold: boolean };

// Детерминированная раскладка точек по сфере (спираль Фибоначчи):
// никакого Math.random — серверный и клиентский рендер совпадают.
function sphereNodes(): Node[] {
  const nodes: Node[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < TOTAL; i++) {
    const y = 1 - (i / (TOTAL - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i + 0.6;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    nodes.push({ x: SIZE / 2 + x * R, y: SIZE / 2 + y * R, z, gold: i % 3 === 0 });
  }
  // Порядок появления — от центра сферы наружу, чтобы граф «рос», а не мигал.
  return nodes.sort((a, b) => Math.hypot(a.x - SIZE / 2, a.y - SIZE / 2) - Math.hypot(b.x - SIZE / 2, b.y - SIZE / 2));
}

function edgesFor(nodes: Node[]): [number, number][] {
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    const nearest = nodes
      .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);
    for (const { j } of nearest) {
      if (!edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) edges.push([i, j]);
    }
  });
  return edges;
}

export default function KnowledgeGraph({ visible, className = "" }: { visible: number; className?: string }) {
  const nodes = useMemo(() => sphereNodes(), []);
  const edges = useMemo(() => edgesFor(nodes), [nodes]);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {edges.map(([a, b], k) => {
        const on = a < visible && b < visible;
        const A = nodes[a];
        const B = nodes[b];
        const path = `M${A.x.toFixed(1)} ${A.y.toFixed(1)} L${B.x.toFixed(1)} ${B.y.toFixed(1)}`;
        return (
          <g key={k} style={{ opacity: on ? 1 : 0, transition: "opacity 700ms cubic-bezier(.2,.8,.2,1)" }}>
            <path d={path} stroke="#00767D" strokeOpacity={0.35 + (A.z + B.z + 2) * 0.1} strokeWidth={1.2} fill="none" />
            {on && k % 3 === 0 && (
              <circle r={2.6} fill="#F0BB1E" className="story-impulse">
                <animateMotion dur={`${2.2 + (k % 5) * 0.45}s`} repeatCount="indefinite" path={path} begin={`${(k % 7) * 0.3}s`} />
              </circle>
            )}
          </g>
        );
      })}
      {nodes.map((n, i) => {
        const on = i < visible;
        const r = 3.2 + (n.z + 1) * 2.4;
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={r}
            fill={n.gold ? "#F0BB1E" : "#00767D"}
            fillOpacity={0.55 + (n.z + 1) * 0.22}
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "scale(1)" : "scale(0.4)",
              transformOrigin: `${n.x}px ${n.y}px`,
              transition: "opacity 600ms ease-out, transform 600ms cubic-bezier(.2,.8,.2,1)",
            }}
          />
        );
      })}
    </svg>
  );
}
