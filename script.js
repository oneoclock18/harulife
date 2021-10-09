const toDoForm=document.querySelector('.js-toDoForm');
const toDoInput=toDoForm.querySelector('input');
const toDoList=document.querySelector('.js-toDoList');

const TODOS_LS='toDos';


let toDos=[]; //empty array to save todo


function deletToDo(event){
    //How to know which button is clicked? USE TARGET
    //use parentNode to know parent's target
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !==parseInt(li.id);
    });
    //filter 은 array 안의 요소들이 filterFn 을 실행해 true 인것을 반환하여
    //새로운 array를 만들어낸다(cleanToDos 라는 array)
    toDos=cleanToDos;
    //새로운 cleanToDos 를 원래의 toDos 에 저장 (let 이 되어야함)
    saveToDos();

}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}//localstorage can save with string
//change object->string JSON.stringify

function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement('text');
    const span=document.createElement('span');
    const newId=toDos.length+1;
    delBtn.innerText=" ❌";
    delBtn.addEventListener("click",deletToDo);
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId; //insert id from li
    toDoList.appendChild(li);
    const toDoObj={ //shape of localstorage
        text: text,
        id: newId //array's length
    };
    toDos.push(toDoObj);//push into Array
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";//init input
}
function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);//call toDos from localStorage
    if(loadedToDos!==null){ //nothing in ls
        //string->obj
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });//parse ToDo 에 있는 애들에게 한번씩 function 을 실행
         //parseToDo 엔 local 에있는 애들이 저장되어있음
         //forEach 는 array를 위한 함수이다
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener('submit',handleSubmit);
};

init();

function sample4_execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ''; // 참고 항목 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
              extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if(data.buildingName !== '' && data.apartment === 'Y'){
             extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if(extraRoadAddr !== ''){
              extraRoadAddr = ' (' + extraRoadAddr + ')';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample4_postcode').value = data.zonecode;
          document.getElementById("sample4_roadAddress").value = roadAddr;
          document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
          
          // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
          if(roadAddr !== ''){
              document.getElementById("sample4_extraAddress").value = extraRoadAddr;
          } else {
              document.getElementById("sample4_extraAddress").value = '';
          }

          var guideTextBox = document.getElementById("guide");
          // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
          if(data.autoRoadAddress) {
              var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
              guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
              guideTextBox.style.display = 'block';

          } else if(data.autoJibunAddress) {
              var expJibunAddr = data.autoJibunAddress;
              guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
              guideTextBox.style.display = 'block';
          } else {
              guideTextBox.innerHTML = '';
              guideTextBox.style.display = 'none';
          }
      }
  }).open();
}