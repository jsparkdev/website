---
title: JSX 없이 만들어보는 리액트 요소
tags: [react]
date: 2024-02-12
---

브라우저는 기본적으로 HTML 코드를 분석하여 DOM을 생성합니다. 이렇게 생성된 DOM은 브라우저에 의해 클라이언트 측 JavaScript에 노출됩니다. 이를 통해 클라이언트 측 JavaScript는 DOM에 상호작용 레이어를 추가할 수 있습니다.

전통적 방식의 웹 개발에서는 개발자가 HTML을 생성하고, 서버가 요청을 받으면 이 HTML 파일을 클라이언트에 전송하고, 클라이언트 측 JavaScript로 상호작용을 추가하였습니다.

하지만, 최근에는 HTML에 더 많은 상호작용을 요구하게 되어 전통적 방식의 웹 개발의 한계가 드러나게 됩니다. 증가하는 상호작용 요구사항을 처리하기 위해 JavaScript 코드의 양이 크게 증가하였고, 클라이언트 측 상태 관리가 복잡해져 성능 문제가 발생하게 되었습니다.

이러한 문제를 해결하기 위해 등장한 React와 같은 프레임워크, 라이브러리는 개발자가 직접 DOM을 조작하는 대신 프로그래밍 방식으로 DOM을 조작할 수 있게 해줍니다. 또한 명령적 브라우저 API 대신 선언적 API를 제공하고, 컴포넌트 기반 접근 방식을 사용하여 UI 생성을 단순화하였습니다.

## React 사용해보기

위에서 React는 명령적 브라우저 API 대신 선언적 API를 제공한다고 하였습니다. 코드 샘플을 통해 이게 무슨 의미인지 알아보겠습니다.

브라우저 API를 통해 DOM을 조작하는 방식은 아래와 같습니다. 아래 코드는 `id`가 `root`인 `div` 태그에 콘텐츠가 `Hello World!`인 `div` 태그를 추가하는 예시입니다.

```html
<body>
  <div id="root"></div>
  <script type="module">
    const rootElement = document.querySelector("#root");

    const divElement = document.createElement("div");
    divElement.textContent = "Hello, World!";

    rootElement.append(divElement);
  </script>
</body>
```

위 코드를 React 코드로 변환하기 위해 `React` 및 `ReactDOM` 모듈을 가져옵니다.

```html
<script
  crossorigin
  src="https://unpkg.com/react@latest/umd/react.development.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js"
></script>

<script type="module">
  console.log(React);
  console.log(ReactDOM);
</script>
```

이 두 모듈을 가져오면 각 모듈에서 정의된 React 및 ReactDOM 객체에 접근할 수 있습니다. 각 객체의 역할은 다음과 같습니다.

1. `React`: 요소를 생성하기 위한 기능을 가지고 있습니다. 위 코드의 `document.createElement`의 역할을 하고 있다고 할 수 있습니다.
2. `ReactDOM`: 요소를 DOM에 렌더링하기 위한 기능을 가지고 있습니다. 위 코드의 `rootElement.append` 역할을 한다고 할 수 있습니다.

다음은 React를 이용해 요소를 생성하는 코드입니다. 요소를 생성하기 위해서는 React 객체에 있는 `createElement` 메서드를 사용합니다. 이 메서드는 첫 번째 인자로 생성할 태그의 이름을, 두 번재 인자로 태그에 추가될 속성들이 담긴 객체를, 세 번째 인자로 렌더링할 콘텐츠를 전달받습니다.

```js
const tagName = "div";
const props = { className: "my-text" };
const content = "Hello World!";
const element = React.createElement(tagName, props, content);
```

> 참고로, 세 번째 인자로 전달된 콘텐츠는 두 번째 인자로 전달된 객체의 children의 값으로 전달됩니다.

우리는 이렇게 만들어진 요소를 `id`가 `root`인 `div` 태그에 렌더링하려고 합니다. 해당 태그를 `ReactDOM` 객체의 `createRoot` 메서드에 전달하여 이 태그를 루트로 만들어 줍니다.

```js
const rootElement = document.querySelector("#root");
const root = ReactDOM.createRoot(rootElement);
```

이렇게 만들어진 루트에 요소를 렌더링하기 위해 `render` 메서드를 사용하면 생성한 요소를 DOM에 성공적으로 추가할 수 있습니다.

```js
root.render(element);
```
