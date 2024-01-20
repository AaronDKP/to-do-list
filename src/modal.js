import { Task, Folder, folderList } from '../src/class.js';
import { newFolder, newTask, selectFolder, updateTask } from '../src/dom.js';
import { assignTask, changeUrgency, childCounter, getSelectedFolder, setUrgency} from '../src/scripts.js';

function runModal () {
    const newType = document.querySelectorAll(`input[name='newType']`);
    const folderReq = document.querySelectorAll('.folderReq');
    const modalHidden = document.querySelectorAll('.modalHidden');

    function flexDisplay (element) {
        element.style.display = 'flex';
    };

    function noneDisplay (element) {
        element.style.display = 'none';
    }

    function nameInput () {
        const newName = document.getElementById('newName');
        const titleInput = document.getElementById('title');
        
        titleInput.value = newName.value;
    }

    for (let element of modalHidden) {
        noneDisplay(element);
    }

    for (let type of newType) {
        type.addEventListener('click', () => {
            const folderLabel = document.querySelector('#folderLabel');
            const taskLabel = document.querySelector('#taskLabel');

            if (type.value == 'Folder') {
                taskLabel.classList.remove('newTypeActive');
                folderLabel.classList.add('newTypeActive');
                nameInput();

                for (let modal of modalHidden) {
                    noneDisplay(modal);
                }

                for (let folder of folderReq) {
                    flexDisplay(folder);
                }
            } else if (type.value == 'Task') {
                folderLabel.classList.remove('newTypeActive');
                taskLabel.classList.add('newTypeActive');
                nameInput();

                for (let modal of modalHidden) {
                    flexDisplay(modal);
                }
            }
        })
    }

    const urgencyInputs = document.querySelectorAll(`input[name='urgency']`);
    const urgencyLabelLow = document.querySelector('.urgencyLabelLow');
    const urgencyLabelMedium = document.querySelector('.urgencyLabelMedium');
    const urgencyLabelHigh = document.querySelector('.urgencyLabelHigh');

    changeUrgency(urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, urgencyInputs);

}


function submitModal () {

    document.getElementById('submit').addEventListener('click', () => {
        let title = document.getElementById('title').value;
        const details = document.getElementById('details').value;
        const date = document.getElementById('date').value;
        const dialog = document.querySelector('dialog');

        function folderModalReset () {
            document.getElementById('folderRadio').checked = false;
            document.querySelector('#folderLabel').classList.remove('newTypeActive');
            document.querySelector('#title').value = '';
            dialog.close();
        }

        function taskModalReset () {
            document.getElementById('taskRadio').checked = false;

            let inputs = document.querySelectorAll(`input[name="urgency"]`);
            for (let input of inputs) { input.checked = false };

            document.querySelector('.urgencyLabelLow').classList.remove('lowActive');
            document.querySelector('.urgencyLabelMedium').classList.remove('mediumActive');
            document.querySelector('.urgencyLabelHigh').classList.remove('highActive');

            taskLabel.classList.remove('newTypeActive');
            document.querySelector('#title').value = '';
            document.querySelector('#details').value = '';
            document.querySelector('#date').value = '';
            dialog.close();
        }

        if(document.getElementById('folderRadio').checked) {
            let folder = new Folder(title);
            folderList.push(folder);
            console.table(folderList);
            newFolder(folder);
            selectFolder();
            folderModalReset();
        } else if (document.getElementById('taskRadio').checked) {
            const urgency = document.querySelector('input[name="urgency"]:checked').value;
            let task = new Task(title, details, date, urgency);
            newTask(task);
            assignTask(task);
            childCounter();
            taskModalReset();
        }
    })
}



function detailsModal () {
    const detailsModalContainer = document.getElementById('detailsModalContainer');
    const detailsBtns = document.querySelectorAll('.detailsBtn');
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsDetails = document.getElementById('detailsDetails');
    const detailsDate = document.getElementById('detailsDate');

    for (let btn of detailsBtns) {
        btn.addEventListener('click', () => {
            detailsModalContainer.style.display = 'block';

            let folderObj = getSelectedFolder();
            let tasks = folderObj.getTasks();
            let btnsArray = Array.from(detailsBtns);
            let btnIndex = btnsArray.indexOf(btn);
            let taskObj = tasks[`${btnIndex}`];

            console.log(btnIndex)

            detailsTitle.value = taskObj.title;
            detailsDetails.value = taskObj.details;
            detailsDate.value = taskObj.date;
            let taskUrgency = taskObj.urgency;

            const urgencyInputs = document.querySelectorAll(`input[name='detailsUrgency']`);
            const urgencyLabelLow = document.querySelector('.detailsUrgencyLow');
            const urgencyLabelMedium = document.querySelector('.detailsUrgencyMedium');
            const urgencyLabelHigh = document.querySelector('.detailsUrgencyHigh');

            setUrgency(urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, taskUrgency);

            changeUrgency(urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, urgencyInputs);

                //currently submit button is overwriting the same taskObj rather than selecting a new 
                //taskObj when a new btn is clicked

            let taskElement = btn.parentElement;

            const submitBtn = document.getElementById('detailsSubmit');

            submitBtn.addEventListener('click', () => {
                submitDetailsModal(taskElement, btnIndex, taskUrgency)
            });

        })

    }

}

function submitDetailsModal (taskElement, btnIndex, taskUrgency) {
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsDetails = document.getElementById('detailsDetails');
    const detailsDate = document.getElementById('detailsDate');

    let title = detailsTitle.value;
    let details = detailsDetails.value;
    let date = detailsDate.value;
    let urgency = '';

    if(document.querySelector('input[name="detailsUrgency"]:checked')){
        urgency = document.querySelector('input[name="detailsUrgency"]:checked').value;
    } else {
        urgency = taskUrgency;
    }

    let folderObj = getSelectedFolder();
    let tasks = folderObj.getTasks();

    console.log(`taskObj selected = ${btnIndex}`)

    let updatedTask = new Task(title, details, date, urgency);

    tasks[`${btnIndex}`] = updatedTask;

    detailsModalContainer.style.display = "none";

    // console.log(event.bubbles);
    console.table(tasks)

    updateTask(taskElement, title, date, urgency);

    event.stopImmediatePropagation();
}
 
export {runModal, submitModal, detailsModal};