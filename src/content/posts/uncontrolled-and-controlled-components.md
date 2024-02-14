---
title: 비제어 컴포넌트와 제어 컴포넌트
tags: [react]
date: 2024-02-14
description: 비제어 컴포넌트와 제어 컴포넌트에 대해 알아봅니다.
---

`React`에서는 `input`을 다루는 두 가지 방법이 존재합니다. 바로 `비제어 컴포넌트`와 `제어 컴포넌트`입니다. 이 두 방법은 각각의 장단점이 존재하며, 상황에 따라 적절한 방법을 선택해야 합니다.

## 비제어 컴포넌트

- `input.value`를 상태로 관리하지 않고, `useRef` 훅을 사용하여 값에 직접 액세스합니다. 이는 DOM에 직접 접근하는 방식입니다.
- `input.value`의 값이 상태로 관리되지 않기 때문에 값이 업데이트되어도 컴포넌트가 다시 렌더링되지 않습니다. 이로 인해 상대적으로 성능이 더 좋습니다.
- 사용자가 입력하는 값을 실시간으로 추적해야 하는 경우 (예: 실시간 유효성 검사 등)가 아닌 상황에서 사용하기에 적합합니다.
- 상태 최소화를 통한 코드의 간결성 및 성능 향상을 기대할 수 있지만, 그 차이는 무시할 수준입니다.

```js
import React from "react";

export default function App() {
  const inputRef = React.useRef(null);

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(`Your name is ${inputRef.current.value}`);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input id="name" type="text" ref={inputRef} />
        <button>제출</button>
      </form>
    </div>
  );
}
```

## 제어 컴포넌트

- `React`가 `input.value`의 값을 상태로 관리합니다. 이를 통해 값을 실시간으로 추적할 수 있으므로 다양한 상호작용을 구현할 수 있습니다.
- 아래 코드는 `name` 상태의 값을 항상 소문자로 유지하고, `input` 필드가 채워지지 않은 경우 버튼을 비활성화합니다.

```js
import React from "react";

export default function App() {
  const [name, setName] = React.useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(`Your name is ${name}`);
  }

  function handleNameChange(event) {
    setName(event.target.value.toLowerCase());
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input id="name" type="text" value={name} onChange={handleNameChange} />
        <button disabled={!name.length}>제출</button>
      </form>
    </div>
  );
}
```

TODO: FIX

JSX란 HTML과 유사한 구문으로 원시 React API를 작성할 수 있게 해주는 구문 설탕입니다. 즉, 다음 두 코드는 같은 UI를 출력합니다.

```js
const jsxElement = <h1 id="greeting">Hello World</h1>;

const reactElement = React.createElement(
  "h1",
  { id: "greeting" },
  "Hello World",
);
```

하지만 브라우저는 JSX를 해석하지 못하기 때문에 이를 JavaScript 코드로 변환해야 합니다. 이 작업을 수행할 수 있는 다양한 도구가 존재하지만, 다음 코드 샘플에서는 가장 쉽게 사용할 수 있는 `Babel`을 사용합니다.

## Babel 사용하기

앱을 브라우저로 내보내기 전에 최적화를 위해 빌드 타임에 JSX를 JavaScript 코드로 컴파일하는 경우가 일반적이지만, `Babel`은 JavaScript로 작성된 도구이므로 브라우저에서 동작시킬 수 있다는 장점이 존재합니다.

먼저 Babel을 사용하기 위해 해당 모듈을 가져옵니다.

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

`Babel`이 컴파일할 대상을 지정하기 위해 해당 `<script>` 태그의 `type`을 `text/babel`로 설정합니다.

```html
<script type="text/babel">
```

이제 브라우저의 개발자 도구에서 DOM을 확인해보면 `<head>` 태그에 아래와 같은 `Babel`이 컴파일한 스크립트가 추가된 것을 확인할 수 있습니다. 즉, `Babel`이 JSX를 컴파일하여 JavaScript 코드로 변환하였으므로 JSX를 브라우저에서 사용할 수 있게 됩니다.

```js
"use strict";

var jsxElement = /*#__PURE__*/ React.createElement(
  "h1",
  {
    id: "greeting",
  },
  "Hello World",
);

var reactElement = React.createElement(
  "h1",
  {
    id: "greeting",
  },
  "Hello World",
);
```

## JSX에 속성 전달하기

일반 HTML 요소처럼 JSX에도 속성을 전달할 수 있습니다. 이렇게 전달한 속성들은 위 컴파일된 코드에서 확인할 수 있는 것처럼 `createElement` 함수의 두 번째 인자 객체로 전달됩니다. 즉, 각종 표현식을 전달할 수 있으며, `if`, `for`와 같은 문은 전달할 수 없습니다. 변수를 전달하기 위해서는 `{}`를 사용합니다.

```js
const className = "container";
const children = "Hello World";

const element = <div className={className}>{children}</div>;
```

속성이 `createElement` 함수의 두 번째 인자 객체로 전달된다는 점을 이용하면 다음과 같이 작성할 수도 있습니다.

```js
const className = "container";
const children = "Hello World!";
const props = { className, children };

const element = <div {...props} />;
```
