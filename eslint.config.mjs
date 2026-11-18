import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import react from "eslint-plugin-react"
import globals from "globals"

export default [
  {ignores: [".cache/", "public/", ".yalc/", "content/", "node_modules/"]},
  js.configs.recommended,
  react.configs.flat.recommended,
  prettier,
  {
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
    },
    settings: {react: {version: "detect"}},
    rules: {
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
]
