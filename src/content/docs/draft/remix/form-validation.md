---
title: a
---
formData.get으로 하나씩 가져오던거 그냥 formData.entries()로 한꺼번에 가져올수도있음.

즉, safeParse에 formData.entries() 전달하면댐 당연히 이건 제대로된 객체가 아니므로 Object.fromEntries 사용

이 방법은 간단한 경우 잘동작하는데 좀 제한적이고 중첩된객체에선 잘 안됨.

컨펌의 도움을 받기 ㄱㄱ

컨펌의 parse(formData, { schema: 스키마 }) 
이러면끝.
얘는 인풋들과 스키마를 비교한 결과를 반환함.

즉 얘가반환한 애로 각종로직 처리하면 됨

이건 intent 속성과 value 속성을 가짐
intent가 submit이 아니면 제출을 안했다는거임.
근데 제출을 안했는데 액션에서 검증이 일어나나?
온블러에서 검증을 수행하면 이렇게 될 수 있다고 함.

글고 value가 없으면 검증에 실패했다는거
검증에 성공했으면 value가 있음.
이때 그냥 submission에는 에러객체가 잇는듯
그래서 zod의 flatten 대신 submission 전달
이때 submisson은 status error와 errors객체를 가짐.
즉, 조드 에러와 형태가 같음.

이거 통과하면 submission.value 에서 데이터 얻는거지.

그리고 error 속성도있음.
value가 다있어도 폼에서 에러나면 얘를 씀.


다시한번정리

컨펌조드의 parse는 formData와 {schema } 객체를 인자로 바듬
이걸 서브미션 변수로 저장하자
서브미션 변수는 value 속성을 가짐. 즉 각 인풋에 대한 값들 객체겠지.
value가 없을수도있음. 이때 value는 에러 메시지를 담는듯?

아 속성이 error, intent, payload, value 다있음.
Value 없으면 error가 채워지는듯 액션데이터에서 그거 사용하면될듯
폼에러는 error[‘’] 로 접근해야함 . 지금은 유효한지 모르게승ㅁ

이게 서버사이드 폼 벨리데이션임 (컨펌)
그냥 parse 메서드 하나로 다 함.



액션은 데이터 뮤테이션하지
즉, 이 작업들이 끝나면 리디렉션함.
글면 return redirect되고
useACtionData는 undefined지
근데 반환하는 경우도 있음. 에러났을때
이땐 리디렉션하면안되지
에러 반환(던지기)해서 액션 종료해야지
뮤테이션 중 에러나면 그 메시지를 사용자에게 표시해줘야지 그래야 사용자가 뭐가 어떻게된건지 알지
그러려면 액션에서 오류 메시지를 받아와야지
그러면 즉, useActionData는 오류 메시지를 받아올 수 있어야지
오류는 동시다발적으로 여러 input에서 나올수도있지
그리고 한 인풋에 여러 오류가 날 수도 있지.
그러면 에러 메시지의 형태는 객체나 배열이지
일단 날 수 있는 오류들의 케이스를 보자

1. 폼 자체 에러
2. 인풋의 에러 (여러 에러)
즉, 폼 에러 및 여러 인풋의 여러 에러를 보관할 수 잇는 객체여야지


자스 불러오기 전 (하이드레이션 전)에는 클라측 검증하다가, 자스있으면 서버측검증해야함.
이땐 useState, useEffect를 사용.
첨엔 수화상태가 false였다가 컴포렌더링된 후 바로 유즈이펙트가 실행되므로 여기서 수화상태를 true로 바꾸면된다.
그리고 수화상태를 반환.
이게 하이드레이션 판별법.
이걸 noValidate에 전달하자. 그래서 수화전엔 펄스, 수화후엔 클라 검증 필요없으니까 활성화.


with 조드

스키마.parse는 데이터가 통과못하면 에러발생
스키마.safeParse는 오류발생시 success 속성이 있는 객체 반환. 유효하지 않은 경우 error 객체 포함.
만약 유효하면 data 속성을 포함함.

오류 객체의 flatten 메서드를 쓰면
우리가 만들었던 형태로 오류 객체가 변환

조드를 쓰면 다음 코드를 없앨수있음
- formData.get 코드들 그냥 formData 객체 하나만 있으면 됨.
- 타입이 일치하지 않으면 에러발생시키는 코드
- 오류 객체 정의
- 값이 제공되지 않았거나 다른 밸리데이션에 통과하지 않으면 오류 객체에 오류 메시지 추가하는 코드.
- hasErrors (오류가 잇는지 확이하는 bool)

위 모든 코드를 
  Const result = NoteEditorSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

이거 하나로 퉁침

에러가 있으면 어떻게 확인?
Result.success 값을 보고 판단

  if (!result.success) {
    return json({ status: 'error', errors: result.error.flatten() } as const, {
      status: 400,
    })
  }

오류가 업다면 이거 통과하겠지. 그럼 result.data에서 데이터 가져와 활용.
const { title, content } = result.data


# 어떻게 정리?

- 폼 - 액션 티키타카부터
- 조드 스키마 활용
- 컨펌까지 활용해서 코드 다 줄이고 버그 줄이기


https://zod.dev/?id=coercion-for-primitives

인풋은 스트링
type을 number로 줘도 스트링
근데 이걸 number로 인식하게 하려면 coerce 필요

1. 그냥 액션으로 폼 검증
2. 조드로 폼 검증
3. 컨펌으로 폼검증



# 클라, 2탄?

컨펌 클라이언트 측 검증

여기서 이제 conform/react 패키지 사용. 조드도 씀.
서버 검증 로직을 클라이언트에서도 동일하게 적용하기 위함.

1. 페이지 컴포에서 useForm 풀어서 form, fields 소환
    1. Id는 폼에 줄 아이디 제공
    2. Constraint: getFieldssetConstraint(스키마) 제공
    3. lastSubmission: actionData.submission 제공
    4. onValidate({ formData }) 는 parse(formData, { schema: 스키마}) .
2. 폼에 form.props 풀어서 제공 (메서드는 따로 줘야지)
3. 각 라벨이랑 인풋에 fields.email.속성 따로 제공
    1. 라벨엔 fields.email.id 주겠지
    2. 인풋엔 …conform.input(fields.email) 줌.
    3. (Conform, useForm은 컨펌/리액트에서 가져옴)
    4. 에러아이디는 fields.email.errorId
    5. 에러목록은 fields.email.errors임.
    6. 인풋에 추가적으로 줄 프롭 있으면 …conform.input(fields.password, {type: password}) 처럼 두번째 인자에 객체 전달
4. 그냥 여긴 필수속성, 접근성 다있음.
5. 인풋들에 기본값필요하면 useForm의 defaultValue 속성 제공

컨펌은 하이드레이트도 알아서 감지함.
오토포커스도 알아서 해줘서 유지팩트, 폼ref도 필요없음.
에러를 가지고있는지 여부도 필요없고, 각 id도 필요없음.

d진짜 인풋에서도 
Id, name, defaultValue, requrie, maxlen, a11y 다제거
{…conform.input(fields.title)} 이걸로대체

이런 라이브러리 쓰는이유?
코드양을 크게 줄임
인간의 실수로인한 버그를 줄임

# 이건
강의 내용인데 패치로 바뀐게 많은듯
중요한 흐름만 캐치하고 사용법위주로 정리하고, 어떻게 코드가 줄어드는지 설명하면 좋을듯.




