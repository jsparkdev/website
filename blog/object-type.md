---
title: 객체 타입 정의
description: TypeScript를 사용하여 객체의 타입을 정의하는 세 가지 방법에 대해 알아봅니다.
titleTemplate: ':title | TypeScript'
---

# 객체 타입 정의

TypeScript를 사용하여 객체의 타입을 정의하는 세 가지 방법이 존재합니다.

- [`type`](#type)
- [`interface`](#interface)
- [`Record`](#record)

## Type

객체 프로퍼티의 타입을 명시적으로 정의하기 위해 사용됩니다.
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
런타임에 새로운 프로퍼티를 추가하는 것을 허용하지 않습니다.
```ts twoslash
type Person = {
  name: string;
  age: number;
}

const person: Person = {
  name: "May",
  age: 23
}

person.email = "may@gmail.com"  // [!code error] // 에러 발생
```

## Interface

[`type`](#type)과 마찬가지로 객체 프로퍼티의 타입을 명시적으로 정의하기 위해 사용됩니다.
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
[인덱스 시그니처](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)를 통해 런타임에 새로운 프로퍼티를 추가하는 것을 허용합니다.
```ts{12} twoslash
interface Person  {
  name: string;
  age: number;
  [otherProps: string]: any; // [!code ++]
}

const person: Person = {
  name: "May",
  age: 23
}

person.email = "may@gmail.com"
```

## Record

프로퍼티 타입 쌍을 [제네릭](https://www.typescriptlang.org/docs/handbook/2/generics.html)으로 전달받아 객체의 타입을 정의합니다.

주로 여러 객체 프로퍼티의 타입이 동일한 경우 사용됩니다. 
```ts twoslash
type UserId = string | number;

interface UserInfo {
  name: string;
  age: number;
  country: string;
}

const users: Record<UserId, UserInfo> = {
  'gameking1234': { name: 'Kevin', age: 23, country: 'USA' },
  1234123455: { name: 'Jun', age: 33, country: 'South Korea' },
  'good_1234': { name: 'Yul', age: 23, country: 'India' }
}
```
[`type`](#type)과 마찬가지로 런타임에 새로운 프로퍼티를 추가하는 것을 허용하지 않습니다.

## 정리

객체의 타입을 정의하기 위해 사용할 수 있는 세 가지 방법의 특징은 다음과 같습니다.

| 키워드        |      타입 정의 방식      |  런타임 프로퍼티 확장 | 사용 사례 |
| :-------------: | :-----------: | :----: | :---: |
| type      | 명시적 프로퍼티 정의 | 불가능 | 일반적인 객체 타입 정의|
| interface      |   명시적 프로퍼티 정의    |   가능 |일반적인 객체 타입 정의|
| Record |   제네릭    |    불가능 |프로퍼티의 타입이 동일한 객체 타입 정의 |
