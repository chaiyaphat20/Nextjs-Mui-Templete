## 1.Install MUI
```
1.$ npm install @mui/material @emotion/react @emotion/styled
2.$ npm install @mui/material @mui/styled-engine-sc styled-components
```

## 2.Setup theme caching
- theme\EmotionCache.tsx
- theme\ThemeRegistry.tsx

## 3.Setup Eslint
```
{
  "parser": "@typescript-eslint/parser",
  "extends": ["plugin:@typescript-eslint/recommended", "next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off"
  }
}

```