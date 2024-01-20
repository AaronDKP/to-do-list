import { newTask, newFolder } from '../src/dom.js';
import { Folder, folderList } from './class.js';

function newTaskList (array) {
    for (let arr of array) {
        newTask(arr);
    }
}

function assignTask (task) {
    let folderObj = getSelectedFolder();

    folderObj.addTask(task);
}


function getSelectedFolder () {
    let selected = document.querySelector('input[name="folder"]:checked');
    let folderObj;

    for (let i = 0; i < folderList.length; i++) {
        if (selected == null) {
            folderObj = folderList[0]
        } else if(folderList[i].title == selected.value) {
            folderObj = folderList[i];
        } 
    }

    return folderObj;
}

function sampleFolder () {
    let folder = new Folder('Development');
    let tasks = [
            {
                date: '2024-01-08',
                details: 'example task details',
                title: 'Learn to use CSS frameworks',
                urgency: 'Low'
            },
            {
                date: '2024-01-07',
                details: 'example task details',
                title: 'Study Angular or Next JS ',
                urgency: 'Medium'
            },
            {
                date: '2024-01-06',
                details: 'example task details',
                title: 'Master Javascript',
                urgency: 'High'
            }
        ]

    folder.tasks.push(...tasks);

    newFolder(folder);
    newTaskList(folder.tasks);
    folderList.push(folder);
    childCounter();
}

function childCounter () {
    let folderObj = getSelectedFolder();
    let tasks = folderObj.getTasks();
    let title = folderObj.title;
    const counter = document.getElementById(`${title}Counter`);

    counter.textContent = tasks.length;
}

function changeUrgency (urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, urgencyInputs) {
    for (let urgency of urgencyInputs) {
        urgency.addEventListener('click', () => {
            switch(urgency.value){
                case 'Low':
                    urgencyLabelHigh.classList.remove('highActive');
                    urgencyLabelMedium.classList.remove('mediumActive');
                    urgencyLabelLow.classList.add('lowActive');
                    break;
                case 'Medium':
                    urgencyLabelHigh.classList.remove('highActive');
                    urgencyLabelLow.classList.remove('lowActive');
                    urgencyLabelMedium.classList.add('mediumActive');
                    break;
                case 'High':
                    urgencyLabelLow.classList.remove('lowActive');
                    urgencyLabelMedium.classList.remove('mediumActive');
                    urgencyLabelHigh.classList.add('highActive');
            }
        })
    }
}

function setUrgency (urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, taskUrgency) {
    switch(taskUrgency){
        case 'Low':
            urgencyLabelHigh.classList.remove('highActive');
            urgencyLabelMedium.classList.remove('mediumActive');
            urgencyLabelLow.classList.add('lowActive');
            break;
        case 'Medium':
            urgencyLabelHigh.classList.remove('highActive');
            urgencyLabelLow.classList.remove('lowActive');
            urgencyLabelMedium.classList.add('mediumActive');
            break;
        case 'High':
            urgencyLabelLow.classList.remove('lowActive');
            urgencyLabelMedium.classList.remove('mediumActive');
            urgencyLabelHigh.classList.add('highActive');
    }
}

function clickOutsideModal () {
    const detailsModalContainer = document.querySelector('#detailsModalContainer');
    const dialog = document.querySelector('dialog');

    window.onclick = function(event) {
        if (event.target == detailsModalContainer) {
          detailsModalContainer.style.display = "none";
        } else if (event.target == dialog) {
            dialog.close();
        }
    }
}

function deleteTaskObj (taskObj) {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    let folderObj = getSelectedFolder();
    let tasks = folderObj.getTasks();
    let btnsArray = Array.from(deleteBtns);
    let btnIndex = btnsArray.indexOf(taskObj);
    
    tasks.splice(btnIndex, 1);
    childCounter();
    console.log(tasks)

}

export {newTaskList, assignTask, getSelectedFolder, 
    sampleFolder, childCounter, changeUrgency, setUrgency, clickOutsideModal,
deleteTaskObj};