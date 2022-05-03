const {colors} = require("./theme.js")

exports.manifestOptions = {
  name: "Cédric Delpoux",
  short_name: "Cédric Delpoux",
  description:
    "Site de Cédric Delpoux: sport, programmation, voyages et bien plus...",
  start_url: "/",
  background_color: "#fff",
  theme_color: colors.secondary,
  display: "standalone",
  icon: "static/favicon.svg",
  icon_options: {
    purpose: "any maskable",
  },
  lang: "fr",
  localize: [
    {
      start_url: "/en",
      lang: "en",
      name: "Cédric Delpoux",
      short_name: "Cédric Delpoux",
      description:
        "Cédric Delpoux website: sport, programming, travels and more...",
    },
  ],
}
