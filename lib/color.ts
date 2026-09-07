/**
 * Converts a "#rrggbb" hex color into a space-separated "r g b" channel
 * string — the format Tailwind's `rgb(var(--x) / <alpha-value>)` pattern
 * expects so branded utilities (bg-brand-600, text-brand-600/80, ...) keep
 * working with opacity modifiers while the actual color comes from config
 * at runtime instead of being baked into the Tailwind build.
 */
export function hexToRgbChannels(hex: string): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}
