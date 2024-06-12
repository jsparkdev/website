---
title: 다크 모드, 라이트 모드 토글 스위치 구현
---

## 목표

클릭 할 때마다 다른 테마로 전환되는 테마 토글 스위치를 구현하는 방법을 익힙니다.

## 원리

- 스위치는 현재 테마 (다크 또는 라이트)를 값으로 가지고 있으며, 클릭할 때마다 변합니다.
- 스위치를 클릭할 때마다 쿠키의 값을 현재 테마의 값으로 설정합니다.
- 모든 페이지의 테마는 쿠키에 설정된 현재 테마를 사용해야 합니다.

## 구현

### 쿠키에 현재 테마 저장하기

기본적으로 사용자의 기본 설정을 저장하기 위해 쿠키를 사용합니다. 쿠키에 이러한 값을 저장하면 클라이언트의 요청에 이 값들이 포함되고, 서버는 요청에 포함된 쿠키를 이용해 웹 페이지를 렌더링할 때 사용할 수 있습니다.

테마 토글 스위치는 페이지를 이동하지 않는 네트워크 요청이 필요하므로 `Form` 컴포넌트 대신 `useFetcher` 훅을 사용합니다.

```tsx
// root.tsx
function ThemeToggle({ theme }: { theme: 'light' | 'dark' }) {
	const fetcher = useFetcher()
  const nextTheme = theme === 'light' ? 'dark' : 'light'

	return (
		<fetcher.Form method='POST'>
			<input type='hidden' name='theme' value={nextTheme} />
			<button type='submit'>Change Theme</button>
		</fetcher.Form>
	)
}
```

버튼을 클릭하면 다음 테마의 값을 `theme` 쿠키의 값으로 설정하고, 이 값이 새로 설정되면 `html` 요소의 클래스에 전달하려고 합니다.

쿠키의 값을 새로 설정하거나 쿠키의 값을 가져오는 등 쿠키 작업은 보안을 위해 서버 측에서 실행되는 것이 일반적이므로 쿠키 유틸리티 함수를 서버 모듈로 작성해줍니다.

```ts
// utils/theme.server.ts
import cookie from 'cookie'

export type Theme = 'light' | 'dark'

export function getTheme(request: Request): Theme {
	const cookieHeader = request.headers.get('Cookie')
	const cookies = cookie.parse(cookieHeader || '')

	if (!cookies || !cookies.theme) {
		return 'light'
	}

	if (cookies.theme === 'light' || cookies.theme === 'dark') {
		return cookies.theme
	}

	return 'light'
}

export function setTheme(theme: Theme) {
	return cookie.serialize('theme', theme, {
		path: '/',
	})
}
```

이제 이 유틸리티를 사용하여 루트 `loader`에서는 쿠키의 값을 가져와 `html`요소의 클래스로 전달하고, 루트 `action`에서는 쿠키의 값을 설정하도록 합니다.

```tsx
// root.tsx
export async function loader({ request }: LoaderFunctionArgs) {
	const theme = getTheme(request)
	return json({ theme })
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const theme = (formData.get('theme') ?? 'light') as Theme
	const cookie = setTheme(theme)

	return json(
		{ status: 'success' },
		{
			headers: {
				'set-cookie': cookie,
			},
		},
	)
}

export function Layout({ children }: { children: React.ReactNode }) {
	const { theme } = useLoaderData<typeof loader>()

	return (
		<html lang='en' className={theme}>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				<main>{children}</main>
				<ThemeToggle theme={theme} />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
```

### Optimistic UI

버튼을 클릭하여 네트워크를 요청해서 테마를 변경하므로, 느린 네트워크 환경에서는 테마가 즉시 변경되지 않을 수 있습니다. 이는 사용자가 현재 진행 상태를 알지 못하기 때문에 사용자 경험의 악화로 이어집니다.

이 문제를 해결하려면 느린 네트워크 환경에서도 즉각적인 테마 변경이 발생해야 하며, 이는 Optimistic UI를 통해 구현할 수 있습니다.

#### 원리

전송된 네트워크 요청이 서버에 도달하기 전에 요청을 즉시 가로채 해당 요청이 가진 값을 UI로 전달하는 방법입니다.

#### 구현

루트 레이아웃 컴포넌트에서 `useLoaderData` 훅을 이용해 가져온 `theme` 대신, 더 복잡한 코드를 이용해 테마 값을 반환해야 하므로 `useTheme` 커스텀 훅을 사용합니다.

```tsx
// root.tsx
function useTheme() {
	const data = useLoaderData<typeof loader>()
	const fetcher = useFetcher({ key: 'update-theme' })
	const theme = fetcher.formData?.get('theme')

	if (theme === 'light' || theme === 'dark') {
		return theme
	}

	return data.theme
}

export function Layout({ children }: { children: React.ReactNode }) {
	const theme = useTheme()

	return (
		<html lang='en' className={theme}>
```

참고로, `ThemeToggle` 컴포넌트에서 사용하는 `useFetcher`의 `key` 속성도 위에서 사용한 `key` 값과 동일하게 설정하면 두 `fetcher`가 동일하다는 것을 의미합니다.

```tsx
// root.tsx
function ThemeToggle({ theme }: { theme: 'light' | 'dark' }) {
	const fetcher = useFetcher({ key: 'update-theme' })
```