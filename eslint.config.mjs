import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
  ]),
  // Site-wide rule overrides
  {
    rules: {
      // Content-heavy marketing site — apostrophes and quotes in copy are intentional.
      // Escaping every ' and " in JSX text adds noise with no real security benefit.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
