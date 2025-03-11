module.exports = {
  root: true,
  plugins: [
    "@typescript-eslint",
    "react",
    "jest",
    "react-native",
    "import",
    "react-compiler",
    "eslint-comments",
    "prettier",
    "react-perf",
  ],
  extends: [
    "@react-native",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:react-perf/recommended",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "<root>/tsconfig.json",
      },
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        quoteProps: "consistent",
        trailingComma: "all",
      },
    ],
    // react-hooks
    "react-hooks/exhaustive-deps": "warn",
    // react
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: ["ref", "key"],
      },
    ],
    "react/jsx-no-bind": [
      "warn",
      {
        // should be an error, but we need to fix a lot of places
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    // react-perf
    "react-perf/jsx-no-new-function-as-prop": "off", // because we have jsx-no-bind
    "react-perf/jsx-no-jsx-as-prop": "warn",
    "react-perf/jsx-no-new-array-as-prop": "warn",
    "react-perf/jsx-no-new-object-as-prop": "warn",
    // typescript
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        caughtErrors: "none", // This allows unused variables in catch clauses
      },
    ],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-var-requires": "warn",
    // import
    "sort-imports": [
      "error",
      {
        // sort destructure imports
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
        allowSeparatedGroups: true,
      },
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type",
        ],
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
    "import/no-cycle": ["error", { maxDepth: "∞" }],
    // react-compiler
    "react-compiler/react-compiler": "error",
    // eslint-comments
    "eslint-comments/no-unused-disable": "error",
    // eslint
    "curly": "error",
    "eqeqeq": ["error", "always"], // check “===”
    "no-nested-ternary": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "try", "throw", "function", "for", "while", "do"],
      },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      { blankLine: "always", prev: "*", next: "if" },
      { blankLine: "any", prev: "if", next: "if" },
    ],
    "no-param-reassign": "error",
    "max-lines": ["warn", { max: 300 }],
  },
  overrides: [
    {
      files: ["packages/src/specs/**"],
      rules: {
        "@typescript-eslint/ban-types": [
          "error",
          {
            extendDefaults: true,
            types: {
              "{}": false,
            },
          },
        ],
      },
    },
    {
      files: [
        "package/src/native/specs/**",
        "apps/example/metro.config.js",
        "apps/example/webpack.config.js",
        "apps/example/react-native.config.js",
        "package/src/native/MaskedTextInputNative.tsx",
      ],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
    {
      files: ["apps/example/src/navigation/Root/types.ts"],
      rules: {
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-empty-object-type": "off",
      },
    },
  ],
  env: {
    "react-native/react-native": true,
    "jest/globals": true,
  },
  ignorePatterns: [
    "node_modules/**/*",
    "package/lib/**",
    "package/**/build/**",
    "scripts/**",
    "apps/**/build/**",
  ],
};
