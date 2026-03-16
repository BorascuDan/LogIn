import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    rules: {
      "indent": ["error", 2],
    },
    languageOptions: { 
      globals: globals.browser 
    } 
  },
]);