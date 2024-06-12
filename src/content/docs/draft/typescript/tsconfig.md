---
title: a
---

# tsconfig.json

이 파일은 컴파일러 (`tsc`)가 TypeScript 파일 (`.ts`, `.tsx`)을 JavaScript 파일 (`.js`)로 변환하는 규칙을 정의합니다.

다음 코드는 `tsconfig.json` 파일의 예시입니다.

```json
{
  "extends": "@total-typescript/tsconfig/bundler/dom/app",
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/.server/**/*.ts",
    "**/.server/**/*.tsx",
    "**/.client/**/*.ts",
    "**/.client/**/*.tsx"
  ],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "types": [
      "@remix-run/cloudflare",
      "vite/client",
      "@cloudflare/workers-types/2023-07-01"
    ],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "target": "ES2022",
    "strict": true,
    "allowJs": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    },
    "noEmit": true
  }
}
```

## extends

- 다른 `tsconfig.json` 파일을 상속받습니다.
- 기본적으로 이 속성의 값으로 설정된 파일을 사용하며, `tsconfig.json` 파일에서 특정 속성의 값을 재정의할 수 있습니다.

## include

- 컴파일의 대상이 될 파일 또는 디렉터리를 명시적으로 설정합니다.
- 값을 설정하지 않으면 프로젝트의 모든 TypeScript 파일 (`.ts`, `.tsx`)이 컴파일 대상이 됩니다.

## exclude

- 컴파일의 대상에서 제외할 파일 또는 디렉터리를 명시적으로 설정합니다.
- [`include`](#include)와 마찬가지로 값을 설정하지 않으면 프로젝트의 모든 TypeScript 파일 (`.ts`, `.tsx`)이 컴파일 대상이 됩니다.

### compilerOptions

- TypeScript 컴파일러 (`tsc`)에 전달할 옵션을 설정합니다.
- 상당히 많은 옵션을 제공하며, [tsconfig Reference](https://www.typescriptlang.org/tsconfig/#compiler-options)에서 해당 목록을 확인할 수 있습니다.