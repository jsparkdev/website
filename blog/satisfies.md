---
title: satisfies 연산자
description: TypeScript의 satisfies 연산자에 대해 알아봅니다.
titleTemplate: ':title | TypeScript'
---

# satisfies 연산자

색상에 대한 정보를 가진 객체를 사용하려고 합니다.

각 색상의 정보는 RGB를 나타내기 위한 튜플 또는 HEX를 나타내기 위한 문자열로 표현됩니다.

```ts twoslash
const palette = {
  red: [255, 0, 0],
  green: '#00FF00',
  bule: [0, 0, 255]
}
```

위 코드에서 파란색을 나타내기 위한 `blue` 프로퍼티에 오타가 있습니다. 앞으로 이런 실수를 방지하기 위해 타입을 추가해줍시다.

```ts twoslash
// @errors: 2353
type ColorName = 'red' | 'green' | 'blue'; // [!code ++]
type RGB = [red: number, green: number, blue: number]; // [!code ++]
type ColorValue = RGB | string; // [!code ++]

const palette: Record<ColorName, ColorValue> = { // [!code ++]
  red: [255, 0, 0],
  green: '#00FF00',
  bule: [0, 0, 255]
}
```

오타를 수정하고, `green` 프로퍼티의 HEX 값을 소문자로 변환하여 가져오려고 합니다.

```ts{8} twoslash
// @errors: 2339
type ColorName = 'red' | 'green' | 'blue';
type RGB = [red: number, green: number, blue: number];
type ColorValue = RGB | string;

const palette: Record<ColorName, ColorValue> = {
  red: [255, 0, 0],
  green: '#00FF00',
  blue: [0, 0, 255]
}

const result = palette.green.toLowerCase() // [!code focus]
```

하지만 오류가 발생했습니다. 이는 `palette.green`이 유니언 타입이기 때문에 발생하는 문제입니다.

TypeScript는 이 값의 타입이 `RGB`인지 `string`인지 정확하게 알지 못하기 때문에 `toLowerCase` 메서드를 사용할 수 없습니다.

이렇게 TypeScript가 유니언 타입으로 정의된 값의 타입을 제대로 추론하지 못하는 경우 `satisfies` 연산자를 사용하여 이 문제를 해결할 수 있습니다.

```ts{5} twoslash
type ColorName = 'red' | 'green' | 'blue';
type RGB = number[];
type ColorValue = RGB | string;

const palette = {
  red: [255, 0, 0],
  green: '#00FF00',
  blue: [0, 0, 255]
} satisfies Record<ColorName, ColorValue> // [!code ++] // [!code focus]

const result = palette.red.at(1);
```


