import s from "./Skyline.module.css";

/**
 * Skyline do país em traço fino, na base do hero: identidade local sem foto
 * de stock. Cada path recebe pathLength=1 para a animação de "desenho"
 * (stroke-dashoffset) funcionar com delay escalonado, ver Skyline.module.css.
 * Silhuetas: Vilnius (Torre de Gediminas, campanário e catedral, Santa Ana,
 * Três Cruzes) · Lisboa (Torre de Belém, arcos, Ponte 25 de Abril, Cristo
 * Rei, elétrico) · Roma (Coliseu, arco, cúpula de São Pedro, pinheiros).
 */

const VILNIUS = [
  "M20 200 Q120 128 220 200",
  "M92 138 h56 v-44 h-56 z M92 94 h8 v-8 h8 v8 h8 v-8 h8 v8 h8 v-8 h8 v8 h8",
  "M120 86 v-22 M120 64 h18 v10 h-18",
  "M300 200 v-96 h34 v96 M300 138 h34 M300 166 h34 M307 104 h20 M310 104 v-16 h14 v16",
  "M317 88 v-14 M311 74 h12",
  "M370 200 v-56 h150 v56 M370 144 l75 -30 l75 30",
  "M392 200 v-44 M418 200 v-44 M444 200 v-44 M470 200 v-44 M496 200 v-44",
  "M445 114 v-12 M439 106 h12",
  "M620 200 v-64 l16 -26 l16 26 v64 M636 110 v-18 M630 98 h12",
  "M668 200 v-84 l20 -34 l20 34 v84 M688 82 v-20 M681 69 h14",
  "M724 200 v-64 l16 -26 l16 26 v64 M740 110 v-18 M734 98 h12",
  "M810 200 v-46 h58 v46 M810 154 l29 -20 l29 20 M830 200 v-24 h18 v24",
  "M950 200 Q1040 150 1130 200",
  "M1012 160 v-38 M998 134 h28",
  "M1040 152 v-46 M1024 118 h32",
  "M1068 160 v-38 M1054 134 h28",
];

const LISBOA = [
  "M70 200 v-104 h64 v104 M70 96 h-14 v30 h14 M134 96 h14 v30 h-14",
  "M70 96 h8 v-10 h8 v10 h8 v-10 h8 v10 h8 v-10 h8 v10 h8 v-10 h8 v10",
  "M86 200 v-28 a16 16 0 0 1 32 0 v28 M92 140 h20 M92 122 h20",
  "M62 126 a8 8 0 0 0 16 0 M126 126 a8 8 0 0 0 16 0",
  "M240 200 v-58 h36 M312 200 v-58 h-36 M240 142 h72",
  "M252 200 v-30 a12 12 0 0 1 24 0 v30 M288 200 v-30 a12 12 0 0 1 12 -12",
  "M262 142 v-22 M256 128 h12",
  "M420 200 v-120 M452 200 v-120 M420 92 h32 M420 128 h32 M420 164 h32",
  "M780 200 v-120 M812 200 v-120 M780 92 h32 M780 128 h32 M780 164 h32",
  "M356 176 Q436 84 616 84 Q796 84 876 176",
  "M356 176 h520",
  "M486 176 v-58 M556 176 v-76 M616 176 v-80 M676 176 v-76 M746 176 v-58",
  "M1000 200 v-72 h14 v-30 h20 v30 h14 v72",
  "M1024 98 v-32 M1002 78 h44 M1024 66 a7 7 0 1 0 0.1 0",
  "M1108 200 v-6 M1160 200 v-6 M1100 194 h68 v-34 h-68 z M1112 178 h12 v-10 h-12 z M1132 178 h12 v-10 h-12 z M1152 178 h8 v-10 h-8 z M1134 160 v-12 M1126 148 l8 -8 l8 8",
];

const ROMA = [
  "M60 200 v-96 Q170 76 280 104 v96",
  "M60 132 Q170 104 280 132 M60 166 Q170 140 280 166",
  "M84 200 v-22 a9 9 0 0 1 18 0 v22 M126 200 v-24 a9 9 0 0 1 18 0 v24 M170 200 v-25 a9 9 0 0 1 18 0 v25 M214 200 v-24 a9 9 0 0 1 18 0 v24",
  "M88 160 a8 8 0 0 1 16 0 M130 156 a8 8 0 0 1 16 0 M172 154 a8 8 0 0 1 16 0 M214 156 a8 8 0 0 1 16 0",
  "M92 126 a7 7 0 0 1 14 0 M134 121 a7 7 0 0 1 14 0 M176 120 a7 7 0 0 1 14 0 M218 122 a7 7 0 0 1 14 0",
  "M360 200 v-72 h96 v72 M360 128 h96 M372 118 h72",
  "M382 200 v-36 a14 14 0 0 1 28 0 v36 M424 200 v-28 a10 10 0 0 1 20 0 v28",
  "M580 200 v-64 h150 v64 M580 136 h150",
  "M600 200 v-40 M630 200 v-40 M660 200 v-40 M690 200 v-40 M710 200 v-40",
  "M613 136 a42 42 0 0 1 84 0",
  "M627 136 a28 46 0 0 1 56 0 M645 136 a10 46 0 0 1 20 0",
  "M655 90 h20 M665 90 v-16 M659 80 h12",
  "M850 200 v-52 M822 148 Q850 108 878 148 z",
  "M930 200 v-64 M896 136 Q930 88 964 136 z",
  "M1040 200 v-98 h34 v98 M1040 130 h34 M1046 122 h22 M1046 122 v-14 h22 v14 M1057 108 v-14 M1051 98 h12",
];

const POR_PAIS: Record<string, string[]> = {
  "Lituânia": VILNIUS,
  "Portugal": LISBOA,
  "Itália": ROMA,
};

export default function Skyline({ pais }: { pais: string }) {
  const paths = POR_PAIS[pais] ?? [];
  if (paths.length === 0) return null;
  return (
    <div className={s.faixa} aria-hidden="true">
      <svg className={s.svg} viewBox="0 0 1200 200" fill="none" preserveAspectRatio="xMidYMax meet">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {paths.map((d, i) => (
            <path key={i} d={d} pathLength={1} style={{ animationDelay: `${0.15 + i * 0.09}s` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
