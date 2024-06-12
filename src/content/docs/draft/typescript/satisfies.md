---
title: a
---

# satisfies

객체 리터럴이 특정 타입을 만족하는 확인할 수 있는 연산자입니다.

## 타입 캐스팅 vs satisfies

### 타입 캐스팅

타입 캐스팅은 변수가 특정 타입이 되도록 강제합니다.

다음 코드를 보면 `Chovy`의 KDA가 뭔가 이상함을 느낄 수 있습니다.

```ts
const players = {
	Faker: [20, 5, 17],
	Kiin: '10/3/2',
	Cuzz: [3, 2, 5],
	Chovy: [17, 0],
}
```

이러한 실수를 방지하기 위해 타입을 추가해줍시다.

```ts
type KDA = [number, number, number] | string

const players: Record<string, KDA> = {
	Faker: [20, 5, 17],
	Kiin: '10/3/2',
	Cuzz: [3, 2, 5],
	Chovy: [17, 0], // 오류 발생
}
```

타입을 추가해서 오류를 잡아냈습니다. 이제 실수한 부분을 수정해줍니다.

```ts
const players: Record<string, KDA> = {
	Faker: [20, 5, 17],
	Kiin: '10/3/2',
	Cuzz: [3, 2, 5],
	Chovy: [17, 0, 10],
}
```

뜬금없이 `Kiin` 선수의 KDA를 튜플 타입으로 보고싶네요. 그래서 다음 코드를 작성했습니다.

```ts
const KiinKDAtoTuple = players.Kiin.split('/') // Property 'split' does not exist on type 'KDA'.
```

그런데 오류가 발생했습니다. 분명 `string` 타입이 맞는데 `split` 메서드를 사용할 수 없다고 하네요.

그 이유는 타입 캐스팅을 통해 해당 값의 타입이 `string`이 아닌 `KDA`로 강제되었기 때문입니다. 

`KDA` 타입은 `[number, number, number] | string` 타입입니다.

이는 `[number, number, number]` 타입이 될 수도 있다는 의미이며, 이 타입은 `split` 메서드를 가지고 있지 않습니다.

### satisfies

타입 캐스팅을 사용하며 발생하는 이러한 문제는 `satisfies` 연산자를 사용하여 해결할 수 있습니다.

타입 캐스팅 대신 `satisfies` 연산자를 사용해봅시다.

```ts
type KDA = [number, number, number] | string

const players = {
	Faker: [20, 5, 17],
	Kiin: '10/3/2',
	Cuzz: [3, 2, 5],
	Chovy: [17, 0, 10],
} satisfies Record<string, KDA>

const KiinKDAtoTuple = players.Kiin.split('/')
```

타입 캐스팅을 사용할 때 발생한 오류가 모두 제거된 것을 확인할 수 있습니다.

`satisfies` 연산자는 변수의 타입을 강제하지 않습니다. 단지 특정 타입이 맞는지 확인만 할 뿐입니다.

타입을 강제하지 않으므로, `players.Kiin`의 타입은 `KDA`가 아니라 타입을 사용하지 않았던 때처럼 `string`으로 자동 추론됩니다.