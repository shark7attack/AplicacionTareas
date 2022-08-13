import { uniqueDate } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

export const addTask=(evento) => {
    evento.preventDefault();  
    const list = document.querySelector('[data-list]');  
    const input = document.querySelector('[data-form-input]');
    const calendar= document.querySelector('[data-form-date]');  

    const value = input.value;
    const date= calendar.value;    
    const dateFormat= moment(date).format('DD/MM/YYYY');  
    
    if(value == '' || date == ''){
      return;
    }

    input.value = '';
    calendar.value='';

    const complete= false;



    //session storage
    const taskObj= {
      value,
      dateFormat,
      complete,         //estyado
      id: uuid.v4()     //identificador
    };

    list.innerHTML= '';


    //recibe 2 parametros, llave (clave) y valor
    //sessionStorage.setItem("tasks", JSON.stringify(taskObj));
    //fin session storage
    
    //si tasks es null o indefinido, se le da un valor x defecto: array vacio
    const taskList= JSON.parse(localStorage.getItem('tasks')) || [];
    
    //agrega tareas al arreglo taskList
    taskList.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    //fin local storage

    displayTasks();
}; 
  
export const createTask = ({value,dateFormat, complete, id}) => {       
    const task = document.createElement('li');
          task.classList.add('card');    
    const taskContent = document.createElement('div');

    const check= checkComplete(id);

    if(complete){
          check.classList.toggle('fas');
          check.classList.toggle('completeIcon');
          check.classList.toggle('far');

    }
      
    const titleTask = document.createElement('span');
          titleTask.classList.add('task');
          titleTask.innerText = value;
          taskContent.appendChild(check);
          taskContent.appendChild(titleTask);

    const dateElement= document.createElement('span');
          dateElement.innerHTML= dateFormat;   
          task.appendChild(taskContent);
          task.appendChild(dateElement);
          task.appendChild(deleteIcon(id));
    return task;
  };