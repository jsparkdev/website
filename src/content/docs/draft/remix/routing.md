---
title: a
---

# 라우팅 컨벤션

## root

`root.tsx` 파일을 의미하며, `Layout` 컴포넌트와 `App` 컴포넌트가 공존합니다.

`Layout` 컴포넌트는 루트 경로에 있는 다음 요소들을 `children`으로 전달받아 렌더링합니다.

- `App` 컴포넌트
- `ErrorBoundary`
- `HydrateFallback`

`App` 컴포넌트는 `Outlet`을 렌더링하여 모든 하위 경로를 렌더링할 수 있습니다.

```tsx
// root.tsx
export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
```

## 중첩 라우팅

Remix 라우팅은 기본적으로 `.`을 `/`로 변환하여 URL을 생성합니다.

- `app/routes/players.tsx` 파일은 `/players`로 변환됩니다.
- `app/routes/players.items.tsx` 파일은 `/players/items`로 변환됩니다.
- `app/routes/players.skills.tsx` 파일은 `/players/skills`로 변환됩니다.
- `app/routes/players.skills.defense.tsx` 파일은 `/players/skills/defense`로 변환됩니다.
- `app/routes/players.skills.defense.shield.passive.tsx` 파일은 `/players/skills/defense/shield/passive`로 변환됩니다.

경로 파일의 이름에서 `.` 앞에 있는 이름이 다른 파일의 이름과 일치하는 경우 해당 파일은 그 파일의 자식 경로가 됩니다.

예를 들면 다음과 같습니다.

- `players.tsx` 파일의 `.` 앞에 있는 이름이 없으므로 이 파일은 `root.tsx` 파일의 자식 경로가 됩니다.
- `players.items.tsx` 파일의 `.` 앞에 있는 이름은 `players`이므로 이 파일은 `players.tsx` 파일의 자식 경로가 됩니다.
- `players.skills.tsx` 파일의 `.` 앞에 있는 이름은 `players`이므로 이 파일은 `players.tsx` 파일의 자식 경로가 됩니다.
- `players.skills.defense.tsx` 파일의 `.` 앞에 있는 이름은 `players`이므로 이 파일은 `players.tsx` 파일의 자식 경로가 됩니다.
- `players.skills.defense.shield.passive.tsx` 파일의 `.` 앞에 있는 이름은 `players.skills.defense.shield`이지만 해당 파일이 존재하지 않습니다.
- 해당 파일이 존재하지 않으므로 로직을 한번 더 반복하면 `players.skills.defense`이므로 `players.skills.defense.tsx` 파일의 자식 경로가 됩니다.

자식 경로는 부모 경로의 `<Outlet />` 컴포넌트 자리에 렌더링되며, 존재하지 않는 경우 렌더링되지 않습니다.

### 레이아웃 중첩 없는 URL 중첩

페이지를 이동하면서 URL은 계속 중첩되기를 원하지만, 레이아웃 중첩을 원하지 않는 경우를 의미합니다.

예를 들어 `/user` 페이지는 사용자의 프로필을 보여줍니다. 그리고 `/user/shop` 페이지는 사용자의 상점 페이지를 보여줍니다.

이 경우 사용자 프로필 페이지와 상점 페이지는 UI상 전혀 관련이 없지만, URL 중첩은 필요합니다.

이는 상위 세그먼트 이름 뒤에 `_` 를 추가하여 이 작업을 수행할 수 있습니다.

즉, `app/routes/user.shop.tsx` 파일의 경로를 `app/routes/user_.shop.tsx`로 변경하면 됩니다.

### URL 중첩 없는 레이아웃 중첩

반대로 URL 중첩 없이 레이아웃만 중첩시키고 싶을 수도 있습니다.

예를 들면, `/skills`, `/items`, `/shop` 페이지가 모두 같은 레이아웃을 가져야 할 수 있습니다.

이는 `_`로 시작하는 공통의 상위 경로를 추가하여 달성할 수 있습니다. URL 중첩이 일어나지 않기 때문에 오직 공유 레이아웃만을 추가합니다.

즉, 각 파일의 이름을 다음과 같이 변경합니다.

- `app/routes/_gridLayout/skills.tsx`
- `app/routes/_gridLayout/items.tsx`
- `app/routes/_gridLayout/shop.tsx`

## 선택적 세그먼트

선택적 세그먼트는 동적 세그먼트를 포함하는 소괄호의 자리에 값이 올수도, 오지 않을수도 있는 경로를 나타냅니다.

다음과 같은 파일 구조가 있다고 가정합니다.

- `($country)._index.tsx`
- `($country).$userId.tsx`
- `($country).userList.tsx`

다음은 특정 경로가 어떤 파일과 매핑되는지 나타냅니다.

- `/`는 `($country)._index.tsx`와 매핑됩니다.
- `/userList`는 `($country).userList.tsx`와 매핑됩니다.
- `/ko/userList`는 `($country).userList.tsx`와 매핑됩니다.
- `/speed-man`은 `($country)._index.tsx`와 매핑됩니다.
- `/ko/speed-man`은 `($country).$userId.tsx`와 매핑됩니다.