//사용자가 폼에 입력한것을 갖고온거다.

const fm = document.getElementById('task_form')
const list = document.querySelector('.userList')
const template = document.querySelector('[data-item]')
const search_fm = document.querySelector('.search_form')

let users = [];

getDB();

function addUser(e) {
    e.preventDefault()
    const newUser = {
        id : Date.now(),
        name: fm.name.value,
        email: fm.email.value,
        subject: fm.subject.value
    }

    users.push(newUser)
    saveDB();
    createLi(newUser);
    fm.reset();
    fm.name.focus();
    
}

function searchUser(e){
    e.preventDefault() 
    const value = e.target.search.value 
    let regExp = new RegExp(`(${value})`, 'gi')

    const lis = list.querySelectorAll('li')
    
    lis.forEach(li => { 
        const msg = li.innerText
        const isVisible = regExp.test(msg)
        console.log('msg :', msg)
        console.log(isVisible)
        if(isVisible === false){
            li.classList.add('hide')
        }else{
            li.classList.remove('hide')
        }
    })

    e.target.reset();
   
}   

fm.addEventListener('submit', addUser)
search_fm.addEventListener('submit', searchUser)
//

// 로컬스토리지에 Users 데이터 저장하기
function saveDB() {
    localStorage.setItem('users', JSON.stringify(users))
}

function getDB(){
    users = JSON.parse(localStorage.getItem('users'));
    if (users) {
        users.map(data => createLi(data))
    }else{
        users = []
    }
}

function createLi(user) {
   const Li = template.content.cloneNode(true).children[0]
   const name = Li.querySelector('[data-name]')
   const email = Li.querySelector('[data-email]')
   const subject = Li.querySelector('[data-subject]')

   Li.id = user.id;
   name.textContent = user.name;
   email.textContent = user.email;
   subject.textContent = user.subject;

   list.appendChild(Li)
}