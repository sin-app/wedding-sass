export interface Theme {
  slug: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  onPrimary: string;
  accent: string;
  fontHeading: string;
  fontScript: string;
  fontBody: string;
  heroOverlay: string;
  useScript: boolean;
  uppercaseLabels: boolean;
  ampersand: string;
}

export const THEMES: Record<string, Theme> = {
  classic: {
    slug: "classic",
    bg: "#faf6f0",
    surface: "#ffffff",
    text: "#3a2e26",
    muted: "#8a7d72",
    primary: "#8a5a3b",
    onPrimary: "#ffffff",
    accent: "#efe3d8",
    fontHeading: "var(--font-serif)",
    fontScript: "var(--font-script)",
    fontBody: "var(--font-sans)",
    heroOverlay: "rgba(30,20,12,0.5)",
    useScript: true,
    uppercaseLabels: true,
    ampersand: "&",
  },
  floral: {
    slug: "floral",
    bg: "#fdf3f5",
    surface: "#ffffff",
    text: "#5a2a37",
    muted: "#a07680",
    primary: "#c96a86",
    onPrimary: "#ffffff",
    accent: "#f8dde4",
    fontHeading: "var(--font-serif)",
    fontScript: "var(--font-script)",
    fontBody: "var(--font-sans)",
    heroOverlay: "rgba(90,30,50,0.45)",
    useScript: true,
    uppercaseLabels: false,
    ampersand: "&",
  },
  minimalist: {
    slug: "minimalist",
    bg: "#ffffff",
    surface: "#f7f7f8",
    text: "#1f2937",
    muted: "#6b7280",
    primary: "#1f2937",
    onPrimary: "#ffffff",
    accent: "#eceef1",
    fontHeading: "var(--font-sans)",
    fontScript: "var(--font-sans)",
    fontBody: "var(--font-sans)",
    heroOverlay: "rgba(10,12,16,0.55)",
    useScript: false,
    uppercaseLabels: true,
    ampersand: "×",
  },
  luxury: {
    slug: "luxury",
    bg: "#0f0f12",
    surface: "#1a1a1f",
    text: "#f2eede",
    muted: "#9d967f",
    primary: "#c9a227",
    onPrimary: "#0f0f12",
    accent: "#26241c",
    fontHeading: "var(--font-serif)",
    fontScript: "var(--font-script)",
    fontBody: "var(--font-sans)",
    heroOverlay: "rgba(0,0,0,0.6)",
    useScript: true,
    uppercaseLabels: true,
    ampersand: "&",
  },
};

export function getTheme(slug: string): Theme {
  return THEMES[slug] ?? THEMES.classic;
}
