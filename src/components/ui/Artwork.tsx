/**
 * Original abstract artwork for each project — no stock photography.
 * Each composition echoes what the project actually does.
 */

export function CosmosArt({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 640 480" role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="asl-cosmos" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#8f6fd6" stopOpacity=".85" />
          <stop offset="60%" stopColor="#5b3f90" stopOpacity=".35" />
          <stop offset="100%" stopColor="#5b3f90" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#6a5f83" fill="none" strokeWidth="1" opacity=".55">
        <ellipse cx="320" cy="224" rx="230" ry="86" transform="rotate(-18 320 224)" />
        <ellipse cx="320" cy="224" rx="180" ry="180" />
        <ellipse cx="320" cy="224" rx="272" ry="120" transform="rotate(22 320 224)" />
      </g>
      <circle cx="320" cy="224" r="150" fill="url(#asl-cosmos)" />
      <circle cx="320" cy="224" r="78" fill="#c3a9ec" opacity=".92" />
      <circle cx="292" cy="204" r="14" fill="#5b3f90" opacity=".35" />
      <circle cx="342" cy="246" r="9" fill="#5b3f90" opacity=".28" />
      <circle cx="330" cy="192" r="5" fill="#5b3f90" opacity=".22" />
      <circle cx="105" cy="150" r="7" fill="#f8f5f0" opacity=".9" />
      <circle cx="548" cy="322" r="5" fill="#f8f5f0" opacity=".75" />
      <g fill="#f8f5f0" opacity=".55">
        <circle cx="70" cy="368" r="2" />
        <circle cx="180" cy="86" r="2" />
        <circle cx="470" cy="110" r="2.5" />
        <circle cx="560" cy="200" r="1.8" />
        <circle cx="250" cy="420" r="2" />
        <circle cx="420" cy="400" r="1.8" />
      </g>
    </svg>
  );
}

function OfoqArt({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill="#efeae2" />
      <path d="M0 268h640" stroke="#d5cdc0" strokeWidth="1" />
      <circle cx="320" cy="268" r="118" fill="none" stroke="#6a4a9c" strokeWidth="1.5" opacity=".5" />
      <path d="M202 268a118 118 0 0 1 236 0z" fill="#6a4a9c" opacity=".13" />
      <circle cx="320" cy="268" r="46" fill="#6a4a9c" opacity=".9" />
      <g stroke="#6a4a9c" strokeWidth="1.4" opacity=".55" strokeLinecap="round">
        <path d="M320 158v-34" />
        <path d="M236 184l-22-24" />
        <path d="M404 184l22-24" />
        <path d="M180 268h-38" />
        <path d="M460 268h38" />
      </g>
      <g fill="#16151a" opacity=".8">
        <rect x="86" y="308" width="132" height="7" rx="3.5" />
        <rect x="86" y="326" width="86" height="7" rx="3.5" opacity=".45" />
      </g>
    </svg>
  );
}

function InfraArt({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill="#f8f5f0" />
      <g stroke="#d5cdc0" strokeWidth="1">
        <path d="M0 100h640M0 200h640M0 300h640" />
      </g>
      <g stroke="#6a4a9c" strokeWidth="1.6" fill="none">
        <path d="M96 200h96M288 200h64M448 200h96" strokeDasharray="5 6" />
        <path d="M240 200v-70h112" />
        <path d="M240 200v70h112" />
      </g>
      <g fill="#ffffff" stroke="#16151a" strokeWidth="1.4">
        <rect x="40" y="176" width="58" height="48" rx="8" />
        <rect x="192" y="176" width="52" height="48" rx="8" />
        <rect x="352" y="106" width="96" height="48" rx="8" />
        <rect x="352" y="176" width="96" height="48" rx="8" />
        <rect x="352" y="246" width="96" height="48" rx="8" />
        <rect x="544" y="164" width="60" height="72" rx="10" />
      </g>
      <g fill="#6a4a9c">
        <circle cx="400" cy="130" r="5" />
        <circle cx="400" cy="200" r="5" />
        <circle cx="400" cy="270" r="5" />
        <rect x="558" y="182" width="32" height="6" rx="3" />
        <rect x="558" y="196" width="22" height="6" rx="3" opacity=".5" />
        <rect x="558" y="210" width="28" height="6" rx="3" opacity=".3" />
      </g>
      <g fill="#16151a" opacity=".55">
        <rect x="52" y="194" width="34" height="5" rx="2.5" />
        <rect x="52" y="205" width="22" height="5" rx="2.5" />
        <rect x="204" y="194" width="28" height="5" rx="2.5" />
        <rect x="204" y="205" width="18" height="5" rx="2.5" />
      </g>
    </svg>
  );
}

function SunGuardArt({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill="#efeae2" />
      <circle cx="168" cy="150" r="48" fill="#6a4a9c" opacity=".92" />
      <g stroke="#6a4a9c" strokeWidth="2" strokeLinecap="round" opacity=".6">
        <path d="M168 74V44" />
        <path d="M168 256v-30" />
        <path d="M92 150H62" />
        <path d="M274 150h-30" />
        <path d="M114 96 93 75" />
        <path d="M222 204l21 21" />
        <path d="M222 96l21-21" />
        <path d="M114 204l-21 21" />
      </g>
      <g fill="#16151a">
        <rect x="336" y="252" width="42" height="60" rx="6" opacity=".85" />
        <rect x="394" y="212" width="42" height="100" rx="6" opacity=".85" />
        <rect x="452" y="164" width="42" height="148" rx="6" fill="#6a4a9c" />
        <rect x="510" y="228" width="42" height="84" rx="6" opacity=".85" />
      </g>
      <path
        d="M336 196l58-40 58-52 58 34"
        fill="none"
        stroke="#6a4a9c"
        strokeWidth="1.6"
        strokeDasharray="4 5"
      />
      <path d="M300 336h280" stroke="#d5cdc0" strokeWidth="1.5" />
    </svg>
  );
}

function TadawiArt({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill="#f8f5f0" />
      <rect x="212" y="46" width="216" height="308" rx="26" fill="#ffffff" stroke="#16151a" strokeWidth="1.5" />
      <rect x="272" y="62" width="96" height="7" rx="3.5" fill="#d5cdc0" />
      <rect x="238" y="96" width="86" height="9" rx="4.5" fill="#16151a" opacity=".85" />
      <rect x="238" y="114" width="140" height="7" rx="3.5" fill="#d5cdc0" />
      <rect x="238" y="146" width="164" height="112" rx="10" fill="#f8f5f0" stroke="#e4ded4" />
      <g fill="#d5cdc0">
        <rect x="252" y="162" width="18" height="18" rx="4" />
        <rect x="278" y="162" width="18" height="18" rx="4" />
        <rect x="304" y="162" width="18" height="18" rx="4" />
        <rect x="330" y="162" width="18" height="18" rx="4" />
        <rect x="356" y="162" width="18" height="18" rx="4" />
        <rect x="252" y="188" width="18" height="18" rx="4" />
        <rect x="278" y="188" width="18" height="18" rx="4" />
        <rect x="330" y="188" width="18" height="18" rx="4" />
        <rect x="356" y="188" width="18" height="18" rx="4" />
        <rect x="252" y="214" width="18" height="18" rx="4" />
        <rect x="304" y="214" width="18" height="18" rx="4" />
        <rect x="330" y="214" width="18" height="18" rx="4" />
        <rect x="356" y="214" width="18" height="18" rx="4" />
      </g>
      <rect x="304" y="188" width="18" height="18" rx="4" fill="#6a4a9c" />
      <rect x="278" y="214" width="18" height="18" rx="4" fill="#6a4a9c" opacity=".35" />
      <rect x="238" y="276" width="164" height="38" rx="19" fill="#6a4a9c" />
      <path
        d="m302 295 8 8 18-18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="146" cy="140" r="30" fill="none" stroke="#6a4a9c" strokeWidth="1.4" opacity=".5" />
      <circle cx="498" cy="268" r="44" fill="none" stroke="#6a4a9c" strokeWidth="1.4" opacity=".35" />
    </svg>
  );
}

const MAP: Record<string, (p: { title: string }) => React.JSX.Element> = {
  cosmos: CosmosArt,
  ofoq: OfoqArt,
  infra: InfraArt,
  sunguard: SunGuardArt,
  tadawi: TadawiArt,
};

export default function Artwork({ id, title }: { id: string; title: string }) {
  const Art = MAP[id] ?? OfoqArt;
  return <Art title={title} />;
}
