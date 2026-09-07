// A small, curated set of generic icons — deliberately not tied to any
// niche. A quiz question just references a key ("shield", "droplet", ...);
// which key goes with which question lives entirely in config/niches/*.
const ICONS: Record<string, JSX.Element> = {
  power: (
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinejoin="round" strokeLinecap="round" />
  ),
  heart: (
    <path
      d="M12 20.5s-7.5-4.6-10-9.3C.4 8 1.8 4.5 5 3.4c2.1-.7 4.3.1 5.5 1.9.3.4.9.4 1.2 0C13 3.5 15.2 2.7 17.3 3.4c3.2 1.1 4.6 4.6 3 7.8-2.5 4.7-10 9.3-10 9.3Z"
      strokeLinejoin="round"
    />
  ),
  droplet: (
    <path
      d="M12 3s6.5 7.2 6.5 12A6.5 6.5 0 1 1 5.5 15C5.5 10.2 12 3 12 3Z"
      strokeLinejoin="round"
    />
  ),
  basket: (
    <path
      d="M4 10h16l-1.5 9.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 10Zm3-3 2-4m6 4-2-4M9 14v3m6-3v3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chat: (
    <path
      d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.3A8 8 0 1 1 21 12Z"
      strokeLinejoin="round"
    />
  ),
  shield: (
    <path
      d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3Z"
      strokeLinejoin="round"
    />
  ),
  clipboard: (
    <path
      d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Zm-3 2h12a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm2.5 6 2 2 4-4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sun: (
    <path
      d="M12 4v2m0 12v2m8-8h-2M6 12H4m12.9-6.9-1.4 1.4M6.5 17.5l-1.4 1.4m0-13.8 1.4 1.4M17.5 17.5l1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  leaf: (
    <path
      d="M20 4S9 3 5.5 9.5C2.7 14.7 6 20 6 20s5.3 1.7 10-3c4-4 4-13 4-13Z M6 20 15 9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  seed: (
    <path
      d="M12 21c-4.4 0-8-3.6-8-8 0-6 8-11 8-11s8 5 8 11c0 4.4-3.6 8-8 8Zm0 0v-8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  clock: (
    <path
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  wallet: (
    <path
      d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2H5a2 2 0 0 1-2-2Zm0 0v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H8m9 5h.01"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  house: (
    <path
      d="M4 11 12 4l8 7m-15-2v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "h-6 w-6" }: IconProps) {
  const path = ICONS[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
