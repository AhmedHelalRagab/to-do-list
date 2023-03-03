let input=document.querySelector('.input');
let add=document.querySelector(".add");
let tasks=document.querySelector('.tasks');
let clearTasks=document.querySelector('.clear');
let array=[];



getDataFromLocalStorage();


tasks.addEventListener('click',function(e){
    if(e.target.classList.contains('delete')){
        // Delete from the page
        DeleteFromLocalStorge(e.target.parentElement.getAttribute('data-id'));
        console.log(e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
        // Delete from local storge
    }
    if(e.target.classList.contains('task')){
        e.target.classList.toggle('done');
        changeStatus(e.target.getAttribute('data-id'));
    }
})
clearTasks.addEventListener('click',function(){
    // clear the tasks in the page
    tasks.innerHTML='';
    // clear the local storage
    window.localStorage.removeItem('tasks');
    window.location.reload();
    
})
add.onclick=function(){
    if(input.value!==''){
        addToArray(input);
        input.value='';
    }
}

function addToArray(Tvalue){
    const task={
        id:Date.now(),
        title:Tvalue.value,
        completed:false,
    }
    array.push(task);
    addToPage(array);
    addToLocalStorage(array);
}

function addToPage(values){
    // save the data that comes from getDataFromLocalStorage function in the main array
    array=values;
    tasks.innerHTML='';
    array.forEach(element => {
        // the task dive
        let Div=document.createElement('div');
        Div.className='task';
        Div.appendChild(document.createTextNode(element.title));
        Div.setAttribute('data-id',element.id);
        // the delete span
        let span= document.createElement('span');
        span.className='delete';
        span.appendChild(document.createTextNode('Delete'));
        // append teh Delete botton into the div task
        Div.appendChild(span);
        // append the task into the main page
        tasks.appendChild(Div);
    });
    console.log
}

function addToLocalStorage(array){
    window.localStorage.setItem('tasks',JSON.stringify(array));
}

function getDataFromLocalStorage(){
    
    let data=JSON.parse(window.localStorage.getItem('tasks'));
    if(data){
        addToPage(data);
    }
}
function DeleteFromLocalStorge(val){
    let data=JSON.parse(window.localStorage.getItem('tasks'));
    console.log(data);
    newData= data.filter((ele)=> ele.id!=val);
    addToLocalStorage(newData);
}

function changeStatus(eleId){
    for (let index = 0; index < array.length; index++) {
        if(array[index].id==eleId){
            array[index].completed==false?array[index].completed=true:array[index].completed=false;
        }
    }
    addToLocalStorage(array);
}