---
title: React와 JSX 그리고 컴포넌트
tags: [react]
date: 2024-02-12
description: React가 등장하게 된 배경과 JSX, 컴포넌트를 사용하는 방법에 대해 알아봅니다.
---

`HTML`에 더 많은 상호작용을 추가할수록 코드의 양이 기하급수적으로 증가하게 되었고, 클라이언트 측 상태 관리가 복잡해져 성능 문제가 발생하게 되었습니다. 이러한 문제를 해결하기 위해 등장한 `React`는 다음과 같은 특징을 통해 이러한 문제를 해결합니다.

- 개발자가 DOM을 직접 조작하는 대신 프로그래밍 방식으로 DOM을 조작합니다.
- 브라우저의 명령적 API를 사용하는 대신 선언적 API를 제공합니다.
- 컴포넌트 기반 접근 방식을 사용하여 UI 생성을 단순화합니다.

## React 요소 생성 및 렌더링

다음 코드는 클라이언트 측 `JavaScript`를 사용하여 DOM을 조작합니다.

```html
<body>
  <div id="root"></div>
  <script type="module">
    const rootElement = document.querySelector("#root");
    const divElement = document.createElement("div");
    divElement.className = "my-text";
    divElement.textContent = "Hello, World!";
    rootElement.append(divElement);
  </script>
</body>
```

위 코드는 다음과 같은 DOM을 생성합니다.

```html
<div id="root">
  <div class="my-text">Hello, World!</div>
</div>
```

`React`를 사용하여 위 코드를 작성하면 다음과 같습니다.

```js
import React from "react";
import ReactDOM from "react-dom/client";

const tag = "div";
const attrs = { className: "my-text" };
const children = "Hello World!";

const element = React.createElement(tag, attrs, children);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(element);
```

## JSX

`JSX`를 사용하면 위에서 사용한 원시 `React` API를 `HTML`과 유사한 형태로 작성하여 마크업을 더 쉽게 작성할 수 있습니다. 아래 코드의 두 변수는 모두 같은 결과를 반환합니다.

```js
const tag = "div";
const attrs = { className: "my-text" };
const children = "Hello World!";

const element = React.createElement(tag, attrs, children);
const jsxElement = <div className="my-text">Hello World!</div>;
```

> 실제로, 컴파일러는 `JSX`를 `React.createElement` 호출로 변환합니다.

## 컴포넌트

프로그래밍에서 코드를 재사용하기 위해서는 함수를 사용합니다. 컴포넌트는 `React` 요소를 반환하는 함수입니다.

일반적으로 `React` 요소를 반환하지만, 기본적으로 함수이므로 문자열, `null`, 숫자 등 렌더링 가능한 다른 항목을 반환할 수도 있습니다.

다음과 같이 동일한 형태의 `JSX`가 존재한다고 가정해봅시다.

```js
import React from "react";

export default function App() {
  return (
    <div>
      <div className="greeting">Hello</div>
      <div className="greeting">Bye</div>
      <div className="greeting">Hi</div>
      <div className="greeting">안녕</div>
    </div>
  );
}
```

재사용성을 높이기 위해 `React` 요소를 반환하는 함수인 `Greeting` 컴포넌트를 만들어 사용할 수 있습니다.

```js
import React from "react";

function Greeting({ children }) {
  return <div className="greeting">{children}</div>;
}

export default function App() {
  return (
    <div>
      <Greeting>Hello</Greeting>
      <Greeting>Bye</Greeting>
      <Greeting>Hi</Greeting>
      <Greeting>안녕</Greeting>
    </div>
  );
}
```
