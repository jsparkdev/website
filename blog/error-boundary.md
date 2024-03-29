---
title: Error Boundary 알아보기
description: Error Boundary를 사용하여 애플리케이션을 종료하지 않고 React 컴포넌트의 에러를 처리하는 방법에 대해 알아봅니다.
titleTemplate: ':title | React'
---

# Error Boundary 알아보기

컴포넌트에서 렌더링 로직이 실행되는 동안 오류가 발생하면 React는 컴포넌트를 DOM에 마운트하지 않기 때문에 전체 애플리케이션이 동작하지 않습니다.

```tsx twoslash
function App() {
// @errors: 2339
  const count = 10;
  const result = count.toUpperCase();
  // ...
}
```

하나의 작은 컴포넌트에 오류가 발생하더라도 전체 애플리케이션이 동작하지 않기 때문에 이는 큰 문제입니다.

이러한 문제를 해결하기 위해 `try catch` 구문을 도입할 수 있습니다.

```tsx
function App() {
  const count = 10;

  try { // [!code ++]
    const result = count.toUpperCase();
    return <div>The result is {result}</div>;
  } catch (error) { // [!code ++]
    return <div>Something went wrong.</div>; // [!code ++]
  } // [!code ++]
}
```

하지만, 이 방법을 이용해 모든 컴포넌트의 예외를 처리하는 것은 번거로우며 실수할 가능성이 높습니다.

대신, 다음과 같이 컴포넌트 렌더링을 시도하고, 렌더링 중 오류가 발생하면 대체 콘텐츠를 렌더링할 수 있도록 도와주는 컴포넌트가 있으면 좋을 것 같습니다.

```tsx
<Try catch={<div>Something went wrong.</div>}>
  <App />
</Try>
```

React의 [Error Boundary](https://www.npmjs.com/package/react-error-boundary)는 위 아이디어를 구현한 라이브러리입니다. 기본적인 사용 방법은 다음과 같습니다.

```tsx
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<div>Something went wrong.</div>}>
  <App />
</ErrorBoundary>
```

## 사이드 이펙트 오류 처리

렌더링 중 발생한 오류가 아닌 이벤트 핸들러, 비동기 코드 등 사이드 이펙트에서 발생하는 오류는 React 호출 스택 외부에서 발생합니다.

아래 코드에서 버튼을 클릭해도 `ErrorBoundary`가 오류를 감지하지 못합니다.

::: code-group
```tsx [App.tsx]
function App() {
  function handleButtonClick() {
    try {
      const count = 10;
      const result = count.toUpperCase();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button type="button" onClick={handleButtonClick}>
      Click!
    </button>
  );
}

export default App;
```
```tsx [main.tsx]
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
```
:::

이 문제를 해결하기 위한 가장 쉬운 방법은 React가 감지하지 못하는 오류를 Error Boundary에 알려주는 `showBoundary` 함수를 사용하는 것입니다.

::: code-group
```tsx [App.tsx]
import { useErrorBoundary } from "react-error-boundary"; // [!code ++]

function App() {
  const { showBoundary } = useErrorBoundary(); // [!code ++]

  function handleButtonClick() {
    try {
      const count = 10;
      const result = count.toUpperCase();
      console.log(result);
    } catch (error) {
      console.error(error); // [!code --]
      showBoundary(error); // [!code ++]
    }
  }

  return (
    <button type="button" onClick={handleButtonClick}>
      Click!
    </button>
  );
}

export default App;
```
```tsx [main.tsx]
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
```
:::

## 대체 컴포넌트 정의

`ErrorBoundary` 컴포넌트에 대체 콘텐츠를 전달하기 위해 `fallback` 프로퍼티에 JSX를 전달할 수도 있지만, 오류 정보 및 복구 기능을 갖춘 대체 컴포넌트를 정의하여 `FallbackComponent` 프로퍼티에 전달할 수도 있습니다.

대체 컴포넌트는 인자의 타입이 `FallbackProps`인 컴포넌트입니다.

```tsx{4,20}
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

function FallbackComponent({ error, resetErrorBoundary }: FallbackProps) { // [!code ++] 
  return ( // [!code ++]
    <div> // [!code ++]
      <p>Something went wrong:</p> // [!code ++]
      <pre>{error.message}</pre> // [!code ++]
      <button onClick={resetErrorBoundary} type="button"> // [!code ++]
        Try again // [!code ++]
      </button> // [!code ++]
    </div> // [!code ++]
  ); // [!code ++]
} // [!code ++]

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={FallbackComponent}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
);
```


