const breakpointsInt = {s: 512, m: 1024}

const colors = {
  primary: "#4794e6",
  secondary: "#5ddb95",
}
const baseTheme = {
  breakpointsInt,
  breakpoints: {
    s: `${breakpointsInt.s}px`,
    m: `${breakpointsInt.m}px`,
    l: `${breakpointsInt.l}px`,
  },
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48],
  space: [0, 8, 16, 32, 64],
  radii: [0, 5, 10, 20],
  transition: "500ms",
  colors: {
    ...colors,
    gradient: `linear-gradient(to right, ${colors.secondary} 0%, ${colors.primary} 100%)`,
  },
}

module.exports = {
  defaultTheme: "dark",
  colors,
  themes: {
    light: {
      ...baseTheme,
      boxShadow: `4px 4px 20px rgba(50, 50, 50, 0.1)`,
      colors: {
        ...baseTheme.colors,
        background: "#f5f5f5",
        backgroundLight: "#fff",
        text: "#4a4a4a",
      },
    },
    dark: {
      ...baseTheme,
      boxShadow: `4px 4px 20px rgba(0, 0, 0, .2)`,
      colors: {
        ...baseTheme.colors,
        background: "#1e2334",
        backgroundLight: "#2c3049",
        text: "#ededed",
      },
    },
  },
}
