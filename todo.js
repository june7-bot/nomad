const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    todoList = document.querySelector(".js-toDoList")

const TODOS_LS = 'toDos'
let idNumber = 1; 

let toDos = [];

    function loadToDos(){
        const loadedToDos = localStorage.getItem(TODOS_LS)
        if(loadedToDos !== null) {
           const parsedToDos = JSON.parse(loadedToDos)
           parsedToDos.forEach(function(toDo){
                    paintToDo(toDo.text);
          })
        }
  
    }

    function deleteToDo(e){
        const btn = e.target;
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

    function paintToDo(currentValue){
     
        const li = document.createElement('li');
        const delBtn = document.createElement('button')
        delBtn.innerText="❌";
        delBtn.addEventListener('click' , deleteToDo)
        const span = document.createElement('span')
        const newId = idNumber++;

        span.innerText = currentValue
        li.appendChild(span)
        li.appendChild(delBtn)
        li.id = newId
        todoList.appendChild(li)
        const toDoObj = {
            text: currentValue,
            id: newId
        };

        toDos.push(toDoObj)
        saveToDo();
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        const currentValue = toDoInput.value
        paintToDo(currentValue)
        toDoInput.value = ""
    }


    function init(){
     loadToDos();
     toDoForm.addEventListener('submit' , handleSubmit )   
    }

    init();