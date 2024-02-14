---
title: 의존성 배열을 가지지 않는 useEffect 훅
tags: [react]
date: 2024-02-14
description: 의존성 배열을 사용하지 않는 useEffect 훅과 이를 사용하지 않는 일반 작업의 차이에 대해 알아봅니다.
---

의존성 배열을 가지지 않는 `useEffect` 훅에 전달된 콜백 함수와 컴포넌트 내부에서 실행되는 일반 작업은 컴포넌트가 렌더링될 때마다 실행된다는 공통점을 가집니다. 그렇다고 해서 이 둘을 무분별하게 사용하면 안됩니다.

## 의존성 배열을 가지지 않는 useEffect

- 컴포넌트가 완전히 렌더링된 후에 비동기적으로 실행됩니다.
- 이러한 이유로 렌더링을 차단하지 않아 렌더링 출력과 관련없는 작업 (예: 데이터 페칭)에 사용됩니다.

## 컴포넌트 내부에서 실행되는 일반 작업

- 컴포넌트의 렌더링 프로세스에 포함되어 동기적으로 실행됩니다.
- 렌더링 프로세스의 포함되기 때문에 오래 걸리는 작업이 할당된 경우 컴포넌트가 늦게 렌더링될 수 있습니다.

```js
import React from "react";

export default function App() {
  console.log("before useEffect");

  React.useEffect(() => {
    console.log("useEffect");
  });

  console.log("after useEffect");

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
```

```
before useEffect
after useEffect
useEffect
```
