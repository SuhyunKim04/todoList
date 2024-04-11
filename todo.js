//변수 선언
const fm = document.getElementById('task_form');
const input= fm.task
const todoList = document.querySelector('.todoList');

let todos = [];
const Key_todo = 'todoList'
getDB();

function createLi(newTodo) {
    const Li = document.createElement('li') 
    Li.id = newTodo.id;
    const Div = document.createElement('div')
    const DivContents = `
    <input type="checkbox" ${newTodo.id} ${newTodo.isDone ? 'checked' : ''}>
    <label for=${newTodo.id} ${ !newTodo.isDone ? 'contenteditable' :'' }>${newTodo.task}</label>`
    const Btn = document.createElement('button')
    const Btncontent = `<svg viewBox="0 0 24 24" fill="none">
    <path d="M17.25 17.25L6.75 6.75" 
    stroke="#2e2f50" stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round" />
    <path d="M17.25 6.75L6.75 17.25"
    stroke="#2e2f50" stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round" />
</svg>`

Div.innerHTML = DivContents; 
Li.appendChild(Div)
Btn.innerHTML = Btncontent
Btn.addEventListener('click', removeTask)
Li.appendChild(Btn)
todoList.appendChild(Li)
}


function saveDB(list) {
    localStorage.setItem(Key_todo, JSON.stringify(list))
}

function getDB(){
    todos = JSON.parse(localStorage.getItem(Key_todo));
    if(todos){
        todos.map(data => createLi(data))
    }else {
        todos = []
    }
}

function removeTask(item){
    const btn = item.currentTarget; 
    const curId = btn.closest('li').id; 
    todos = todos.filter((todo) => todo.id !== parseInt(curId));
    document.getElementById(curId).remove();
    saveDB(todos)
    
}

todoList.addEventListener('input', (e) => { 
    const taskId = e.target.closest('li').id;  
    console.log('li id : ', taskId) 
    updateTask(taskId, e.target)
})

todoList.addEventListener('keydown',(e) => {
    if(e.keyCode == 13){
        e.preventDefault();
        e.target.blur();
    }
})


function updateTask(taskId, el) {
    const curTodo = todos.find(todo => todo.id === parseInt(taskId));  

    if(el.hasAttribute('contenteditable')) {
        curTodo.task = el.textContent; 
    } else {
        const label = el.nextElementSibling;
        const li = el.closest('li');
        curTodo.isDone = !curTodo.isDone;

        if(curTodo.isDone) {
            label.removeAttribute('contenteditable');
            li.classList.add('done')
        } else {
            label.setAttribute('contenteditable', 'true');
            li.classList.remove('done')
        }
    }
    
    saveDB(todos);
    
}
function addTask(e) {
    e.preventDefault()
    // change  { id: 13094304, task :'hello world}
    const newTodo = {
        id: Date.now(),
        task: input.value,
        isDone: false
    }
    
    createLi(newTodo);

    todos.push(newTodo)

    saveDB(todos);
}

fm.addEventListener('submit',addTask);


