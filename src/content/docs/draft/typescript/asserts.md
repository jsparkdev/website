---
title: a
---

# asserts

TypeScript에서 Assertion Function을 생성하기 위해 사용할 수 있는 키워드입니다.

## Assertion Function

이 함수의 역할은 다음과 같습니다.

- 예상치 못한 일이 일어나면 오류를 발생시키며, 그렇지 않은 경우 코드가 계속 실행되도록 보장합니다.
- 오류가 발생하지 않았다면, 특정 조건이 참임을 컴파일러에게 명시적으로 알립니다.

### 예시

`double` 함수는 `number` 타입이 아닌 값이 인자로 전달된 경우 오류를 발생시킵니다.

```ts
function double(value: unknown) {
  if (typeof value !== 'number') {
    throw new TypeError('value must be a number')
  }

  return value * 2
}

console.log(double(2)) // 4
console.log(double('a')) // TypeError: value must be a number
```

조건이 거짓인 경우 오류를 발생시키는 코드가 유용해보이네요. 이 로직을 재사용하기 위해 함수로 만들어봅시다.

```ts
function assert(condition: unknown, message?: string) {
  if (!condition) {
    throw new Error(message || 'Assertion failed')
  }
}
```

새로 만든 `assert` 함수를 이용해 타입이 `number`인지 체크해봅시다.

```ts
function double(value: unknown) {
  assert(typeof value === 'number', 'value must be a number')

  return value * 2 // 'value' is of type 'unknown'.
}
```

분명 `value`의 타입이 `number`인 것을 확인했지만, 컴파일러가 타입을 제대로 추론하지 못하네요.

이는 `assert` 함수에서 타입 좁히기를 한다는 사실을 컴파일러가 알지 못하기 때문에 발생하는 문제입니다.

컴파일러는 `typeof`, `instanceof` 연산자 또는 `Array.isArray` 함수를 사용해야만 타입을 좁힌다는 사실을 인식합니다.

그러면 우리가 해야할 일은 `assert` 함수 호출시 타입 좁히기가 발생했다고 컴파일러에게 알려주는 것입니다.

### asserts 키워드

`asserts` 키워드를 사용하면 특정 함수 호출로 인해 타입 좁히기가 발생했다는 사실을 컴파일러에게 알려줄 수 있습니다.

다음과 같이 `assert` 함수에 `asserts condition`을 추가했더니 오류가 사라진 것을 확인할 수 있습니다.

```ts
function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || 'Assertion failed')
  }
}

function double(value: unknown) {
  assert(typeof value === 'number', 'value must be a number')

  return value * 2
}
```

이는 `assert` 함수의 `condition` 값이 참인 경우, 이 사실을 컴파일러에게 알리게 됩니다.

즉, `double` 함수에 `number` 타입의 값을 전달하면 `assert` 함수에 전달되는 `condition`이 참이 되므로 `typeof value === 'number'`라는 사실을 컴파일러에게 알리게 됩니다.

이를 통해 컴파일러는 `value`가 `number` 타입의 값이라는 사실을 알게됩니다.