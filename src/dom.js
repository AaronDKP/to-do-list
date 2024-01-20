import { folderList } from "../src/class.js";
import { newTaskList, deleteTaskObj } from "./scripts.js";
import { detailsModal } from "./modal.js";

function newFolder (folderObj) {
    const folderList = document.querySelector('#folderList');
    const folder = document.createElement('div');
    const folderTitle = document.createElement('label');
    const folderRadio = document.createElement('input');
    const childCounter = document.createElement('div');

    let radioId = folderObj.title.replace(/\s/g, '');

    folderRadio.setAttribute('id', `${radioId}`);
    folderRadio.type = 'radio';
    folderRadio.value = folderObj.title;
    folderRadio.name = 'folder';

    folderTitle.textContent = folderObj.title;
    folderTitle.htmlFor = `${radioId}`;
    folderTitle.classList.add('folderLabel');

    childCounter.classList.add('childCounter');
    childCounter.setAttribute('id', `${radioId}Counter`);
    folder.classList.add('folder');
    
    folder.appendChild(folderRadio);
    folder.appendChild(folderTitle);
    folder.appendChild(childCounter);
    folderList.appendChild(folder);

    detailsModal();
}

function newTask (taskObj) {
    const taskList = document.querySelector('#taskList');
    const task = document.createElement('div');
    const checkbox = document.createElement('input');
    const p = document.createElement('p');
    const urgencyBar = document.createElement('div');
    const detailsBtn = document.createElement('button');
    const date = document.createElement('p');
    const deleteBtn = document.createElement('deleteBtn');
    const deleteImg = new Image();

    checkbox.type = 'checkbox';
    checkbox.className = 'taskCheckbox';
    checkbox.name = 'taskCheckbox';
    task.appendChild(checkbox);

    p.className = 'taskTitle';
    p.textContent = taskObj.title;
    task.appendChild(p);

    urgencyBar.className = 'urgencyBar';
        switch(taskObj.urgency){
            case 'Low':
                urgencyBar.style.borderBottom = '2px solid #95E1D3';
                break;
            case 'Medium':
                urgencyBar.style.borderBottom = '2px solid #FCE38A';
                break;
            case 'High':
                urgencyBar.style.borderBottom = '2px solid #F38181';
        }
    task.appendChild(urgencyBar);


    detailsBtn.className = 'detailsBtn';
    detailsBtn.textContent = 'DETAILS';
    task.appendChild(detailsBtn);

    date.className = 'date';
    date.textContent = taskObj.date;
    task.appendChild(date);

    deleteImg.className = 'deleteImg';
    deleteImg.src = '../src/img/delete.svg';
    deleteBtn.appendChild(deleteImg);

        deleteBtn.className = 'deleteBtn';
        task.appendChild(deleteBtn);

    task.className = 'task';
    taskList.appendChild(task);

    detailsModal();

    deleteBtn.addEventListener('click', () => {
        deleteTaskObj(taskObj);
        task.remove();
    })
    
}

function updateTask (taskElement, title, date, urgency) {
    const taskTitle = taskElement.querySelector('p');
    const taskDate = taskElement.querySelector('.date');
    const taskUrgency = taskElement.querySelector('.urgencyBar');

    taskTitle.textContent = title;
    taskDate.value = date;
    switch(urgency){
        case 'Low':
            taskUrgency.style.borderBottom = '2px solid #95E1D3';
            break;
        case 'Medium':
            taskUrgency.style.borderBottom = '2px solid #FCE38A';
            break;
        case 'High':
            taskUrgency.style.borderBottom = '2px solid #F38181';
    }
    
}

function selectFolder () {
    const allLabels = document.querySelectorAll('.folderLabel');
    const allFolders = document.querySelectorAll('.folder');

    for (let label of allLabels) {

        label.addEventListener('click', () => {

            let folderObj = folderList[0];

            for (let folder of allFolders) {
                folder.classList.remove('folderActive');
            }

            let selected = label.textContent;
            
            for (let i = 0; i < folderList.length; i++) {
                if (folderList[i].title == selected) {
                    folderObj = folderList[i];
                }
            }

            label.parentElement.classList.add('folderActive');

            const taskList = document.getElementById('taskList');
            const tasks = folderObj.getTasks();

            taskList.replaceChildren();

            newTaskList(tasks);

            detailsModal();
            
        })
    }

}

export {newFolder, newTask, selectFolder, updateTask};