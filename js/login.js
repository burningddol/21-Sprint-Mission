
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const button = document.querySelector('button');
const img_visible_state = document.querySelector('#visible_state');
const img_invisible_state = document.querySelector('#invisible_state');
const img_box = document.querySelector(".img_box");

// 이메일 칸이 공란일경우 red-border와 이메일을 입력하라는 문구 출력 해주는 함수
function email_empty_checker(e){
  const email_empty_message = document.querySelector('.email_empty_message');

  if(!e.target.value){                                     //email이 공란일 경우
    e.target.classList.add('email_empty');
    email_empty_message.classList.remove('display_none');
  } else if(e.target.value) {                                 //email이 입력됐을 경우
    e.target.classList.remove('email_empty');
    email_empty_message.classList.add('display_none');
    
  }
}

// 이메일 칸의 이메일 형식이 맞는지 검사해주는 함수  email_empty_checker와의 중복을 고려하여 if문 설계
function email_form_checker(e){
  const email_wrong_message = document.querySelector('.email_wrong_message');
  const email = e.target.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  if (!emailRegex.test(email) && email ) {                     //email이 입력됐지만 형식을 불만족 할 경우
    e.target.classList.add('email_wrong');
    email_wrong_message.classList.remove("display_none");
  } else if (emailRegex.test(email) || !email) {               //email이 입력되지 않았거나 형식을 만족 할 경우    
    e.target.classList.remove('email_wrong');
    e.target.classList.remove('init');                         // 로그인 button이 웹 진입 초기단계에서 이메일 or password 둘중하나만 만족해도 활성화 되는 issue 해결을 위한 class임
    email_wrong_message.classList.add("display_none");
  }
}

// 패스워드 칸이 비었는지 체크하는 함수
function password_empty_checker(e){
  const password_empty_message = document.querySelector('.password_empty_message');
  if(!e.target.value){                                         //password가 공란일 경우
    e.target.classList.add('password_empty');
    password_empty_message.classList.remove('display_none');
  } else if(e.target.value) {                                  //password가 입력됐을 경우
    e.target.classList.remove('password_empty');
    password_empty_message.classList.add('display_none');
  }
}

// 패스워드 길이가 8자 이상인지 체크하는 함수
function password_length_checker(e){
  const password = e.target.value.trim();
  const password_wrong_message = document.querySelector('.password_wrong_message');

  if(password.length < 8 && password){                          //password가 입력됐지만 길이를 불만족 할 경우
    e.target.classList.add('password_wrong');
    password_wrong_message.classList.remove("display_none");
  } else if (password.length >= 8 || !password) {                 //password가 입력되지 않았거나 길이를 만족 할 경우
    e.target.classList.remove('password_wrong');
    e.target.classList.remove('init');                            // 로그인 button이 웹 진입 초기단계에서 이메일 or password 둘중하나만 만족해도 활성화 되는 issue 해결을 위한 class임  
    password_wrong_message.classList.add("display_none");
  }
}

// 인풋의 조건에 따라 버튼 활성화 조건 체킹 및 활성화 함수
function button_active_checker(e){
  const inactive_index = ["email_empty", "email_wrong", "password_empty", "password_wrong", "init"];
  const inactive_result_email = inactive_index.some(index => email.classList.contains(index));         // 상위 배열 요소중 하나라도 갖으면 true가 되어 inactive유도
  const inactive_result_password = inactive_index.some(index => password.classList.contains(index));   // 상위 배열 요소중 하나라도 갖으면 true가 되어 inactive유도

  if(inactive_result_email || inactive_result_password){                       
    button.classList.add("inactive");
  } else if(!inactive_result_email && !inactive_result_password){
    button.classList.remove("inactive");
  }
}

// 버튼 활성화에 따라 작동여부를 결정하는 함수
function button_active_decider(e){

  if(button.classList.contains('inactive')){
    e.preventDefault();
  }
}

// 패스워드 인풋의 눈모양 버튼 클릭시 패스워드 감춤 및 보이기 작동 함수
function visibility_decider(e){

  if(img_invisible_state.classList.contains('display_none')){
    img_invisible_state.classList.toggle('display_none');
    password.type = "password";
  }

  if(img_visible_state.classList.contains('display_none')){
    img_visible_state.classList.toggle('display_none');
    password.type = "text";
  }
  e.target.classList.toggle('display_none');
}





email.addEventListener('focusout', email_empty_checker);
email.addEventListener('focusout', email_form_checker);
email.addEventListener('focusout', button_active_checker);

password.addEventListener('focusout', password_empty_checker);
password.addEventListener('focusout', password_length_checker);
password.addEventListener('focusout', button_active_checker);

button.addEventListener('click', button_active_decider);

img_box.addEventListener('click', visibility_decider);           // img_visible_state와 img_invisible_state의 이벤트 위임
