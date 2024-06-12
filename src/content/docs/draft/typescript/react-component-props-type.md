---
title: a
---

# React 요소의 속성을 컴포넌트의 props로 사용하기

## 요약

컴포넌트의 props를 `React.ComponentProps` 타입으로 설정하면 React 요소의 속성을 컴포넌트의 props로 전달할 수 있습니다.

## 문제

우리는 다음과 같이 React의 버튼 요소를 렌더링하는 컴포넌트를 가지고 있습니다.

```tsx
export default function Button({children}: {children: React.ReactNode}) {
  return <button>{children}</button>
}
```

이 컴포넌트는 다음과 같이 사용할 수 있습니다.

```tsx
import Button from './Butotn';

function App() {
  return <Button>My Custom Button</Button>;
}
```

스타일링을 위해 버튼에 클래스를 추가하려고 합니다.

```tsx
import Button from './Butotn';

function App() {
  return <Button className="primary">My Custom Button</Button>;
}
```

하지만, `Button` 컴포넌트는 `children` 외 다른 props를 받을 수 없기 때문에 오류가 발생합니다.

그래서 다음과 같이 `Button` 컴포넌트의 props에 `className`을 추가하여 이 문제를 해결하였습니다.

```tsx
export default function Button({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return <button className={className}>{children}</button>
}
```

하지만 이는 버튼에 적용할 속성이 많아질수록 컴포넌트에 전달할 props도 많아짐을 의미합니다. 차라리 `Button` 컴포넌트가 `button` 요소의 속성을 그대로 전달받을 수 있으면 좋을 것 같습니다.

## 해결

React의 `ComponentProps` 타입을 사용합니다.

```tsx
import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export default function Button(props: ButtonProps) {
	return <button {...props} />
}
```

## 리소스

https://www.totaltypescript.com/react-component-props-type-helper