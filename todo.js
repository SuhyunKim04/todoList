//변수 선언
const fm = document.getElementById('task_form');
const input= fm.task
const todoList = document.querySelector('.todoList');

const taskList = [];

fm.addEventListener('submit',(e) => {
    e.preventDefault()
    console.log(input.value)

    // change  { id: 13094304, task :'hello world}
    const task = input.value
    const id = Date.now();


    const Li = document.createElement('li') 
    const Div = document.createElement('div')
    const DivContents = `<input type="checkbox" id= ${id}>
    <label for=${id}>${task}</label>`
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
Li.appendChild(Btn)
todoList.appendChild(Li)
})

