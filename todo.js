const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector(".js-todoInput"),
    todoList = document.querySelector(".js-toDoList"),
    easy = document.querySelector("#easy"),
    normal = document.querySelector("#normal"),
    hard = document.querySelector("#hard")

const TODOS_LS = 'toDos'
let idNumber = 1; 

let toDos = [];

    function loadToDos(){
        const loadedToDos = localStorage.getItem(TODOS_LS)
        if(loadedToDos !== null) {
           const parsedToDos = JSON.parse(loadedToDos)
           parsedToDos.forEach(function(toDo){
                    paintToDo(toDo.text , toDo.diff)
          })
        }
  
    }

    function editToDo(e){
        const btn = e.target
        const li = btn.parentNode
        const content = li.getElementsByClassName('oneToDo')
        const editInput =  li.getElementsByClassName('eInput')
        const okBtn = li.getElementsByClassName('okBtn')
        const cancelBtn = li.getElementsByClassName('cancelBtn')

        editInput[0].style.display = 'block'
        okBtn[0].style.display = 'block'
        cancelBtn[0].style.display = 'block'


        content[0].style.display = "none"

        editInput[0].value = content[0].innerText
       
        const eBtn = li.getElementsByClassName('editBtn')
        eBtn[0].style.display = "none"
       
        const dBtn = li.getElementsByClassName('delBtn')
        dBtn[0].style.display = "none"
      
        okBtn[0].addEventListener('click' , editComplete)
        cancelBtn[0].addEventListener('click', editCancel)

    }

    function editCancel(event){
        event.preventDefault()

        const btn = event.target
        const li = btn.parentNode

        const oBtn = li.getElementsByClassName('okBtn')
        const cBtn = li.getElementsByClassName('cancelBtn')
        const eBtn = li.getElementsByClassName('editBtn')
        const dBtn = li.getElementsByClassName('delBtn')
        const eInput = li.getElementsByClassName('eInput')
        const origin = li.getElementsByClassName('oneToDo')

        oBtn[0].style.display = "none"
        cBtn[0].style.display = "none"
        eBtn[0].style.display = "block"
        dBtn[0].style.display = "block"
        eInput[0].style.display = "none"
        origin[0].style.display = "block"
    }

    function editComplete(event){
        event.preventDefault()

        const btn = event.target
        const li = btn.parentNode
        
        const editInput = li.getElementsByClassName('eInput')
        const showToDo = li.getElementsByClassName('oneToDo')

        const currentValue = editInput[0].value
        showToDo[0].innerText = currentValue
        
        editInput[0].style.display = "none"

        const oBtn = li.getElementsByClassName('okBtn')
        const cBtn = li.getElementsByClassName('cancelBtn')
        const eBtn = li.getElementsByClassName('editBtn')
        const dBtn = li.getElementsByClassName('delBtn')
        const origin = li.getElementsByClassName('oneToDo')

        oBtn[0].style.display = "none"
        cBtn[0].style.display = "none"
        eBtn[0].style.display = "block"
        dBtn[0].style.display = "block"

        const toDoObj = {
            text: currentValue,
            id: li.id
        }

        toDos.forEach(function(toDo){
            if( toDo.id === parseInt(toDoObj.id)){
                    toDo.text = toDoObj.text      
            }
        })
        saveToDo()
        origin[0].style.display = "block"

    }


    function deleteToDo(event){
        const btn = event.target;
        const li = btn.parentNode;
        todoList.removeChild(li)
  
        toDos = toDos.filter(function(toDo){
             return toDo.id !== parseInt(li.id)
         })
        saveToDo()
    }

    function saveToDo(){
        localStorage.setItem(TODOS_LS , JSON.stringify(toDos) )
    }


    function paintToDo(currentValue, difficulty){

        const li = document.createElement('li');
        const editInput = document.createElement('input')
        editInput.style.display = 'none';
        editInput.className = "eInput"
      
        const okBtn = document.createElement('button')
        okBtn.className = "okBtn"
        okBtn.innerText="수정완료"
        okBtn.style.display = 'none';

        const cancelBtn = document.createElement('button')
        cancelBtn.className = "cancelBtn"
        cancelBtn.innerText="수정취소"
        cancelBtn.style.display = 'none';

        const editBtn = document.createElement('button')
        editBtn.className = "editBtn"
        editBtn.innerText="수정"
        editBtn.addEventListener('click' , editToDo)

        const delBtn = document.createElement('button')
        delBtn.className = "delBtn"
        delBtn.innerText="삭제";
        delBtn.addEventListener('click' , deleteToDo)

        const span = document.createElement('span')
        span.className ="oneToDo"
        const newId = idNumber++;

        const diff = document.createElement('span')
        if(difficulty ===  "easy" ){ diff.innerText = '🟢' }
        if( difficulty ===  "normal"){ diff.innerText = '🟡'}
        if(difficulty ===  "hard"){ diff.innerText = '🔴' }
        diff.className = "diff"


        span.innerText = currentValue

        li.appendChild(diff)
        li.appendChild(span)
        li.appendChild(editInput)
        li.appendChild(okBtn)
        li.appendChild(cancelBtn)
        li.appendChild(editBtn)
        li.appendChild(delBtn)
        li.id = newId

        todoList.appendChild(li)
        const toDoObj = {
            text: currentValue,
            id: newId,
            diff: difficulty
        };

        toDos.push(toDoObj)
        saveToDo();
    }

    function handleSubmit(event)
    {
        event.preventDefault()
        let difficulty = ''

        if(easy.checked){ difficulty = 'easy' }
        if(normal.checked){ difficulty = 'normal' }
        if(hard.checked){ difficulty = 'hard' }

        const currentValue = toDoInput.value
        paintToDo(currentValue , difficulty)
        toDoInput.value = ""
    }

    function init(){
     loadToDos();
     toDoForm.addEventListener('submit' , handleSubmit )   
    }

    init();