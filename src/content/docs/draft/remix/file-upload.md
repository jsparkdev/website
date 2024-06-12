---
title: a
---

Image upload

사실상 파일 업로드 과정

이미지를 업로드받는 (input type file) 인풋과 함께 hidden input도 포함시키기
얘는 이미지가 업로드되면 해당 이미지의 id를 값으로 가지게됨. 

파일input은 name=image, accept=image/* 로 만들어서 이미지만 받게하자

텍스트에어리어에 alt받게하자. 즉, 이미지선택 컴포넌트는 3개의 인풋을 가짐
1. 파일
2. 히든
3. 텍에어리어

근데 이러면 파일 제출시 파일 이름만 제출됨. 이때 form type을 멀티파트로 바꺼야함. 그러면 텍스트 대신 바이너리를 제출함.

여기까지가 폼, 이미지 업로드 컴포넌트 제작법임.

액션에서도 뭐 따로 처리해야함.
parseMultipartFormData(req, handler)로 기존 request.formData를 대체함.
근데 핸들러는 머임?
createMemoryHandler가 반환하는 객체임. 얘한테 객체로 { maxPartSize: 사이즈 } 이거만 주면 됨.
3MB로 제한할거면 1024 * 1024 * 3

그리고 업데이트나 추가할때 formData.get으로 id, file, altText 가져다쓰면됨.

이렇게 업로드가능.

근데 타입 세이프티도 체크해야지
근데 이건 그냥 조드 스키마 + 컨펌 도움 받으셈.
스키마에서 파일 타입 정의할때 instanceof 사용하고, 최대크기 지정할때 refine 사용.



