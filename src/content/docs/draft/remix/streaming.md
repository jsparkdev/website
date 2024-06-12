---
title: a
---

# 스트리밍

## 사용하는 이유

기본적으로 `loader` 함수의 작업이 모두 끝나면 페이지 컴포넌트를 렌더링합니다.

그래야 `loader` 함수에서 반환하는 데이터를 이용해 UI를 렌더링할 수 있기 때문입니다.

하지만, 데이터 페칭이 오래 걸리는 경우 페이지 UI 렌더링도 그만큼 늦어집니다.

이 문제를 해결하기 위해 스트리밍이라는 기술을 사용할 수 있습니다.

## 동작

스트리밍은 `loader` 함수의 데이터 페칭과 페이지 컴포넌트 렌더링을 동시에 수행합니다.

데이터를 조금씩 받아오며 UI에 지속적으로 전달하는 기술이라고 생각하면 됩니다.

데이터 조금씩 전달하면서 완전히 받아올 때까지 `Suspense`를 사용하여 로딩 UI를 표시합니다.

## 구현

우리가 사용하는 기존 코드는 다음과 같습니다.

```tsx
export async function loader({ context }) {
  const users = await context.db.query(...)
  
  return json({ users })
}

export default function Page() {
  const { users } = useLoaderData<typeof loader>()

  return (
    <ul>
      {
        users.map(u => <li key={u.id}>{users.name}</li>)
      }
    </ul>
  )
}
```

스트리밍을 구현하기 위해서는 `loader` 함수에서 데이터를 다 받아올 때까지 기다리지 않고, Promise를 UI로 전송하는 `defer` 메서드를 사용합니다.

```tsx
export async function loader({ context }) {
  const usersPromise = context.db.query(...)
  
  return defer({ usersPromise })
}
```

Promise의 상태를 추적하기 위한 `Await` 컴포넌트와 로딩 UI 렌더링을 위한 `Suspense` 컴포넌트를 사용합니다.

`Await` 컴포넌트는 `resolve` 속성의 값으로 `useLoaderData` 함수에서 반환된 Promise를 전달받습니다.

그리고 `children`으로 React 요소를 반환하는 콜백 함수나 React 요소 자체를 전달받습니다. 특히, 콜백 함수의 인자는 resolved Promise 객체이므로, Promise 객체가 반환하는 결과를 활용할 때 사용합니다.

```tsx
export default function Page() {
  const { usersPromise } = useLoaderData<typeof loader>()

  return (
    <Await resolve={usersPromise}>
      <ul>
        {
          users => users.map(u => <li key={u.id}>{users.name}</li>)
        }
      </ul>
    </Await>
  )
}
```

Promise 객체가 resolve 될 때까지 로딩 UI를 제공하기 위해 `Suspense` 컴포넌트를 사용합니다.

```tsx
export default function Page() {
  const { usersPromise } = useLoaderData<typeof loader>()

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={usersPromise}>
        <ul>
          {
            users => users.map(u => <li key={u.id}>{users.name}</li>)
          }
        </ul>
      </Await>
    </Suspense>
  )
}
```

