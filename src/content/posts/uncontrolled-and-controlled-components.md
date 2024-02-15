---
title: 비제어 컴포넌트와 제어 컴포넌트
tags: [react]
date: 2024-02-14
description: 비제어 컴포넌트와 제어 컴포넌트에 대해 알아봅니다.
---

`React`에서 `input`을 다루는 두 가지 방법이 존재합니다. 바로 `비제어 컴포넌트`와 `제어 컴포넌트`입니다.

## 비제어 컴포넌트

- `input.value`를 상태로 관리하지 않고, `useRef`를 사용하여 직접 값에 액세스합니다. 이는 직접 DOM에 접근하는 방식입니다.
- `input.value`가 상태로 관리되지 않기 때문에 값이 업데이트되어도 컴포넌트가 다시 렌더링되지 않습니다. 이로 인해 상대적으로 성능이 더 좋다고 할 수 있지만, 이는 무시할 수준입니다.
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

- `React`가 `input.value`를 상태로 관리합니다. 이를 통해 값을 실시간으로 추적할 수 있으므로 다양한 상호작용을 구현할 수 있습니다.
- 아래 코드는 `name` 상태의 값을 항상 소문자로 유지하고, `input` 필드가 채워지지 않은 경우 제출 버튼을 비활성화합니다.

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
