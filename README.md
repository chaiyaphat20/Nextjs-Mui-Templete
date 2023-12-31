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

## 8.เรียกไฟล์ ThemeRegistry.tsx ใน Layout.tsx
```
 <html lang="en">
      <ThemeRegistry>
        <body
          className={`${inter.className} antialiased`}
          style={{
            height: '100%',
            width: '100%',
            scrollBehavior: 'smooth'
          }}
        >
          {children}
        </body>
      </ThemeRegistry>
    </html>
```

## 9.สร้าง file .env และ .env.example ที่root
```
NEXT_PUBLIC_ENV=DEV  #สำหรับ ฝั่ง clinet เวลาใช้ก็ window_.env._NEXT_PUBLIC_ENV
NEXTAUTH_URL=http://localhost:8000 #สำหรับ ฝั่ง server เวลา เรียกใช้ก้ process.env.NEXTAUTH_URL
```

## 10.สร้าง type สำหรับ env client


## 11.สร้าง Dockerfile and docker-compose.yaml  (ดูในโปรเจค)
## 12. สร้าง file config\config.ts
```
interface Config {
  NEXT_PUBLIC_ENV?: string;
}

let Config: Config = {};
if (process.env.NODE_ENV === 'production') {
  Config = {
    NEXT_PUBLIC_ENV: '$NEXT_PUBLIC_ENV' //$NEXT_PUBLIC_ENV env บน docker จะติด $ มาด้วย
  };
} else {
  Config = {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV
  };
}
export default Config;
```

## 14 สร้างfile next-start.sh  (ดูในโปรเจค)
## 15.แก้ scrips ที่ package.json สำหรับการ build
```
"scripts": {
    ...
    "build": "NODE_ENV=production APP_ENV=production next build",
    "build-for-windows": "SET NODE_ENV=production SET APP_ENV=production && next build",
  },
```

## 17 File ใช้ที่ต้องการใช้ Config.env ให้ใส่ 'use client' บนสุดของ file.tsx

## 16.1 ทดสอบ รัน ในเครื่อง แบบ dev  (http://localhost:3000/)
```
npm run dev
```
จะได้ NEXT_PUBLIC_ENV= DEV

## 16.1 ทดสอบ รัน ในเครื่อง แบบ PRD เครื่อง windows ใช้ docker (http://localhost:3000/)
```
docker-compose up
npm start
```
จะได้ NEXT_PUBLIC_ENV= PRD


## 17 กรณี git commit -m "" แล้ว ขึ้น hint: The '.husky/pre-commit' hook was ignored because it's not set as executable. ใช้คำสั่ง
```
chmod ug+x .husky/*
```