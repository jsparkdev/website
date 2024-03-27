---
title: 객체 타입을 정의하는 세 가지 방법
---

# 객체 타입을 정의하는 세 가지 방법

TypeScript에서 객체를 정의하는 세 가지 방법이 존재합니다.

- [`type`](#type)
- [`interface`](#interface)
- [`Record`](#record)

## Type

- 명시적으로 객체의 키와 값의 타입을 정의하기 위해 사용됩니다.
```ts twoslash
type Person = {
  name: string;
  age: number;
}

const person: Person = {
  name: "May",
  age: 23
}
```
- 런타임에 새로운 프로퍼티를 추가하는 것을 허용하지 않습니다.
```ts twoslash
type Person = {
  name: string;
  age: number;
}

const person: Person = {
  name: "May",
  age: 23
}

// 아래 코드는 에러를 발생시킵니다.
// person.email = "may@gmail.com"
```

## Interface

- [`type`](#type)과 마찬가지로 명시적으로 객체의 키와 값의 타입을 정의하기 위해 사용됩니다.
```ts twoslash
interface Person  {
  name: string;
  age: number;
}

const person: Person = {
  name: "May",
  age: 23
}
```
- 인덱스 시그니처를 통해 런타임에 새로운 프로퍼티를 추가하는 것을 허용합니다.
```ts twoslash
interface Person  {
  name: string;
  age: number;
  [otherProps: string]: any; // [!code focus]
}

const person: Person = {
  name: "May",
  age: 23
}

person.email = "may@gmail.com"
```

## Record

- 객체의 키와 값의 타입을 제네릭으로 전달받아 타입을 정의합니다.
- 키 집합에 대한 값의 타입이 모두 동일하거나 유사한 경우에 유용하게 사용할 수 있습니다.
```ts twoslash
const ages: Record<string, number> = {
  May: 23,
  Jun: 32,
  Alice: 24
}
```
- 런타임에 새로운 프로퍼티를 추가하는 것을 허용하지 않습니다.

## 결론

객체의 타입을 정의하기 위해 사용할 수 있는 세 가지 방법의 특징은 다음과 같습니다.

| 키워드        |      타입 정의 방식      |  런타임 프로퍼티 확장 | 사용 사례 |
| :-------------: | :-----------: | :----: | :---: |
| type      | 명시적 프로퍼티 정의 | 불가능 | 일반적인 객체 타입 정의|
| interface      |   명시적 프로퍼티 정의    |   가능 |일반적인 객체 타입 정의|
| Record |   제네릭    |    불가능 |특정 키 집합에 대해 동일한 타입의 값을 가지는 객체 타입 정의|
