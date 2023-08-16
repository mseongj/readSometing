import speech_recognition as sr
import json

r = sr.Recognizer()
with sr.Microphone() as source:
    print("Say Something") # 음성 인식 시작을 알림 할 때 주석처리 필요
    speech = r.listen(source, timeout=5)

# sys.stdout = open('audio_output.txt', 'w', encoding='utf-8') #-- 텍스트 저장시 사용

try:
    audio = r.recognize_google(speech, language="ko-KR")
    # print("Your speech thinks like\n " + audio)
    print(json.dumps({'message': audio}, ensure_ascii=False))
except sr.UnknownValueError:
    print("Your speech can not understand")
except sr.RequestError as e:
    print(f"Request Error!; {e}")

# sys.stdout.close() #-- 텍스트 저장시 사용
# print("Loading model...")


# 8.2 샘플 코드
# import json

# data1 = {'message': 'Hello, world!'}
# data2 = {'message': 'Goodbye, world!'}

# print('result1: ' + json.dumps(data1))
# print('result2: ' + json.dumps(data2))




# copliot 참고 8/2
# google speech to text api
# google cloud sdk 설치