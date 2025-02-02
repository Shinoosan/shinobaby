module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked", // Type-aware linting
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended", // Add React linting
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"], // Enables type-aware rules
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "react"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-unused-vars": ["warn"], // Warn for unused variables
    "react/jsx-uses-react": "off", // Not needed for React 17+
    "react/react-in-jsx-scope": "off", // Not needed with JSX transform
  },
  settings: {
    react: {
      version: "detect", // Auto-detect React version
    },
  },
};
