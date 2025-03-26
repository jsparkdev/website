---
title: Kotlin 입문
description: Kotlin 입문을 위한 간단한 예제입니다.
---

- 2025년 3월 23일
- [이 리소스](https://developer.android.com/courses/pathways/android-basics-compose-unit-1-pathway-1?hl=ko)를 학습하였습니다.
- 모든 코드 작성은 [Kotlin Playground](https://play.kotlinlang.org/)에서 진행하였습니다.
- 주요 학습 범위는 Kotlin에서 함수와 변수를 사용하는 방법에 대한 것입니다.
- TypeScript와 비슷한 점이 많아 비교적 쉽게 이해할 수 있었습니다.

## 컴파일

- Kotlin 코드는 사람이 이해하기 위해 만들어진 것이며, 컴퓨터는 이해하지 못합니다.
- 코드를 한 줄씩 확인하고 컴퓨터가 이해할 수 있는 형식으로 변환하는 작업을 `컴파일`이라고 합니다.
- 이는 Kotlin의 컴파일러가 수행하는 작업입니다.
- 코드가 컴파일되면 프로그램이 실행됩니다. 프로그램이 실행되면 각 줄의 명령이 실행됩니다.
- Kotlin 프로그램에는 `main` 함수가 반드시 존재해야 하며, 이는 Kotlin 컴파일러의 진입점입니다.

## 변수

변수를 선언하려면 변수의 이름, 타입, 초깃값을 지정합니다.

```kotlin
val count: Int = 10
```

초깃값으로부터 타입을 추론하기 때문에 타입을 생략할 수 있습니다.

```kotlin
val count = 10
```

`val`은 상수를 선언하며, `var`는 변수를 선언합니다. 최대한 `val`을 사용하는 것을 권장합니다.

```kotlin
var count = 10
count = 100
```

`++`, `--`로 숫자값을 1씩 증감할 수 있습니다.

```kotlin
var count = 1.5
println(count++) // 1.5
println(count++) // 2.5
```

문자열에서 `$`로 문자열 템플릿을 사용할 수 있습니다.

```kotlin "$name"
val name = "Kotlin"
println("Hello, $name!") // Hello, Kotlin!
```

중괄호 `{}`와 함께 사용하면 복잡한 표현식을 문자열 템플릿에 삽입할 수 있습니다.

```kotlin "${name.uppercase()}"
val name = "Kotlin"
println("Hello, ${name.uppercase()}!") // Hello, KOTLIN!
```

## 함수

- `main` 함수는 직접 호출하지 않아도 Kotlin 컴파일러가 시작점으로 사용합니다.
- 함수가 한 가지 특정 작업만 수행하도록 만들면 코드가 하는 일을 정확히 파악할 수 있고, 코드 가독성이 향상됩니다.
- 함수의 반환 타입을 지정하지 않으면 `Unit` 타입으로 추론됩니다. 이는 다른 언어의 `void`와 같습니다.
- 함수의 본문에서 매개변수의 값을 재할당할 수 없습니다. (`val`과 같은 상수로 처리됩니다.)

함수에 인수를 전달할 때 이름을 사용하여 전달할 수 있습니다. 이를 통해 원하는 순서대로 인수를 전달할 수 있습니다.

```kotlin
fun printInfo(name: String, age: Int) {
  println("Hello, $name! I am $age years old.")
}

fun main() {
  val userName = "Jun"
  val userAge = 30
  printInfo(age = userAge, name = userName) // Hello, Jun! I am 30 years old.
}
```

함수 매개변수의 기본값을 설정할 때도 타입을 명시해야 합니다.

```kotlin ": String" "= "Smith""
fun printInfo(name: String = "Smith", age: Int) {
  println("Hello, $name! I am $age years old.")
}

fun main() {
  val userAge = 30
  printInfo(age = userAge) // Hello, Smith! I am 30 years old.
}
```

값을 반환하는 함수를 사용할 때는 반드시 반환 타입을 명시해야 합니다. 그렇지 않으면 `Unit` 타입으로 추론됩니다.

```kotlin /: Int(?= {)/ "return"
fun main() {
  val firstValue = 3
  val secondValue = 12
  val result = add(firstValue, secondValue)
  
  println(result)
}

fun add(first: Int, second: Int): Int {
  return first + second
}
```

## 스타일 가이드

- Google의 스타일가이드를 참고합니다.
- 함수의 이름은 카멜 표기법 + 동사로 구성합니다.
- 각 문은 한 줄에 하나씩 작성합니다.
- 여는 중괄호는 함수 선언 시작 줄에, 닫는 중괄호는 마지막 줄에 위치시키며 `fun` 키워드와 같은 열에 위치합니다.
- 여는 중괄호 앞에 공백을 추가합니다.
- 들여쓰기는 스페이스 4칸입니다. (탭 X)
