## 1.Install MUI
```
1.$ npm install @mui/material @emotion/react @emotion/styled
2.$ npm install @mui/material @mui/styled-engine-sc styled-components
```

## 2.Setup theme caching
- theme\EmotionCache.tsx
- theme\ThemeRegistry.tsx

## 3.1 Setup Eslint ที่ไฟล์ .eslintrc.json
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

## 3.2 install Lib for husky and prettier ที่ package.json และ Set up husky ที่ package.json  แล้ว พิมพ์ npm i
```
"devDependencies": {
    ...
    "@typescript-eslint/eslint-plugin": "^6.8.0",
    "husky": "^8.0.3",
    "jest": "29.6.4",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.3",
    "prettier-plugin-organize-imports": "^3.2.3"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
```

## 4 แก้ scripts ที่  package.json สำหรับ eslint and prettier
```
"scripts": {
    ...
    "format": "prettier --write \"./**/*.{js,jsx,ts,tsx,json}\"",
    "prepare": "husky install",
    "pre-commit": "npm run format && next lint && git add -A ."
  },
```

## 5. Create folder .vscode และไฟล์  .vscode/settings.json
```
{
  "editor.tabSize": 2,
  "prettier.tabWidth": 2,
  "prettier.useTabs": true
}
```

## 6.Create file .prettierrc  
```
{
  "singleQuote": true,
  "printWidth": 80,
  "editor.formatOnSave": true,
  "proseWrap": "always",
  "tabWidth": 2,
  "requireConfig": false,
  "useTabs": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "semi": false,
  "plugins": ["prettier-plugin-organize-imports"]
}
```

## 7.ใช้คำสั่ง เพื่อ generates file .husky  และ setting command ที่ต้องรัน เมื่อพิมพ์ git commit -m
```
npm run prepare
npx husky add .husky/pre-commit "npm run pre-commit"
```