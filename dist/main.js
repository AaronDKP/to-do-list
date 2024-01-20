/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class.js":
/*!**********************!*\
  !*** ./src/class.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Folder: () => (/* binding */ Folder),
/* harmony export */   Task: () => (/* binding */ Task),
/* harmony export */   folderList: () => (/* binding */ folderList)
/* harmony export */ });
class Task {
    constructor(title, details, date, urgency) {
        this.title = title;
        this.details = details;
        this.date = date;
        this.urgency = urgency;
    }
};

class Folder {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
    }
};

const folderList = [];



/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newFolder: () => (/* binding */ newFolder),
/* harmony export */   newTask: () => (/* binding */ newTask),
/* harmony export */   selectFolder: () => (/* binding */ selectFolder),
/* harmony export */   updateTask: () => (/* binding */ updateTask)
/* harmony export */ });
/* harmony import */ var _src_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/class.js */ "./src/class.js");
/* harmony import */ var _scripts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts.js */ "./src/scripts.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");




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

    (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.detailsModal)();
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

    (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.detailsModal)();

    deleteBtn.addEventListener('click', () => {
        (0,_scripts_js__WEBPACK_IMPORTED_MODULE_1__.deleteTaskObj)(taskObj);
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

            let folderObj = _src_class_js__WEBPACK_IMPORTED_MODULE_0__.folderList[0];

            for (let folder of allFolders) {
                folder.classList.remove('folderActive');
            }

            let selected = label.textContent;
            
            for (let i = 0; i < _src_class_js__WEBPACK_IMPORTED_MODULE_0__.folderList.length; i++) {
                if (_src_class_js__WEBPACK_IMPORTED_MODULE_0__.folderList[i].title == selected) {
                    folderObj = _src_class_js__WEBPACK_IMPORTED_MODULE_0__.folderList[i];
                }
            }

            label.parentElement.classList.add('folderActive');

            const taskList = document.getElementById('taskList');
            const tasks = folderObj.getTasks();

            taskList.replaceChildren();

            (0,_scripts_js__WEBPACK_IMPORTED_MODULE_1__.newTaskList)(tasks);

            (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.detailsModal)();
            
        })
    }

}



/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   detailsModal: () => (/* binding */ detailsModal),
/* harmony export */   runModal: () => (/* binding */ runModal),
/* harmony export */   submitModal: () => (/* binding */ submitModal)
/* harmony export */ });
/* harmony import */ var _src_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/class.js */ "./src/class.js");
/* harmony import */ var _src_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/dom.js */ "./src/dom.js");
/* harmony import */ var _src_scripts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/scripts.js */ "./src/scripts.js");




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

    (0,_src_scripts_js__WEBPACK_IMPORTED_MODULE_2__.changeUrgency)(urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, urgencyInputs);

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
            let folder = new _src_class_js__WEBPACK_IMPORTED_MODULE_0__.Folder(title);
            _src_class_js__WEBPACK_IMPORTED_MODULE_0__.folderList.push(folder);
            console.table(_src_class_js__WEBPACK_IMPORTED_MODULE_0__.folderList);
            (0,_src_dom_js__WEBPACK_IMPORTED_MODULE_1__.newFolder)(folder);
            (0,_src_dom_js__WEBPACK_IMPORTED_MODULE_1__.selectFolder)();
            folderModalReset();
        } else if (document.getElementById('taskRadio').checked) {
            const urgency = document.querySelector('input[name="urgency"]:checked').value;
            let task = new _src_class_js__WEBPACK_IMPORTED_MODULE_0__.Task(title, details, date, urgency);
            (0,_src_dom_js__WEBPACK_IMPORTED_MODULE_1__.newTask)(task);
            (0,_src_scripts_js__WEBPACK_IMPORTED_MODULE_2__.assignTask)(task);
            (0,_src_scripts_js__WEBPACK_IMPORTED_MODULE_2__.childCounter)();
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

            let folderObj = (0,_src_scripts_js__WEBPACK_IMPORTED_MODULE_2__.getSelectedFolder)();
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

            (0,_src_scripts_js__WEBPACK_IMPORTED_MODULE_2__.setUrgency)(urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, taskUrgency);

            (0,_src_scripts_js__WEBPACK_IMPORTED_MODULE_2__.changeUrgency)(urgencyLabelLow, urgencyLabelMedium, urgencyLabelHigh, urgencyInputs);

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

    let folderObj = (0,_src_scripts_js__WEBPACK_IMPORTED_MODULE_2__.getSelectedFolder)();
    let tasks = folderObj.getTasks();

    console.log(`taskObj selected = ${btnIndex}`)

    let updatedTask = new _src_class_js__WEBPACK_IMPORTED_MODULE_0__.Task(title, details, date, urgency);

    tasks[`${btnIndex}`] = updatedTask;

    detailsModalContainer.style.display = "none";

    // console.log(event.bubbles);
    console.table(tasks)

    ;(0,_src_dom_js__WEBPACK_IMPORTED_MODULE_1__.updateTask)(taskElement, title, date, urgency);

    event.stopImmediatePropagation();
}
 


/***/ }),

/***/ "./src/scripts.js":
/*!************************!*\
  !*** ./src/scripts.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assignTask: () => (/* binding */ assignTask),
/* harmony export */   changeUrgency: () => (/* binding */ changeUrgency),
/* harmony export */   childCounter: () => (/* binding */ childCounter),
/* harmony export */   clickOutsideModal: () => (/* binding */ clickOutsideModal),
/* harmony export */   deleteTaskObj: () => (/* binding */ deleteTaskObj),
/* harmony export */   getSelectedFolder: () => (/* binding */ getSelectedFolder),
/* harmony export */   newTaskList: () => (/* binding */ newTaskList),
/* harmony export */   sampleFolder: () => (/* binding */ sampleFolder),
/* harmony export */   setUrgency: () => (/* binding */ setUrgency)
/* harmony export */ });
/* harmony import */ var _src_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/dom.js */ "./src/dom.js");
/* harmony import */ var _class_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class.js */ "./src/class.js");



function newTaskList (array) {
    for (let arr of array) {
        (0,_src_dom_js__WEBPACK_IMPORTED_MODULE_0__.newTask)(arr);
    }
}

function assignTask (task) {
    let folderObj = getSelectedFolder();

    folderObj.addTask(task);
}


function getSelectedFolder () {
    let selected = document.querySelector('input[name="folder"]:checked');
    let folderObj;

    for (let i = 0; i < _class_js__WEBPACK_IMPORTED_MODULE_1__.folderList.length; i++) {
        if (selected == null) {
            folderObj = _class_js__WEBPACK_IMPORTED_MODULE_1__.folderList[0]
        } else if(_class_js__WEBPACK_IMPORTED_MODULE_1__.folderList[i].title == selected.value) {
            folderObj = _class_js__WEBPACK_IMPORTED_MODULE_1__.folderList[i];
        } 
    }

    return folderObj;
}

function sampleFolder () {
    let folder = new _class_js__WEBPACK_IMPORTED_MODULE_1__.Folder('Development');
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

    (0,_src_dom_js__WEBPACK_IMPORTED_MODULE_0__.newFolder)(folder);
    newTaskList(folder.tasks);
    _class_js__WEBPACK_IMPORTED_MODULE_1__.folderList.push(folder);
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/modal.js */ "./src/modal.js");
/* harmony import */ var _scripts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts.js */ "./src/scripts.js");



const newBtn = document.getElementById('newBtn');
const dialog = document.querySelector('dialog');

(0,_scripts_js__WEBPACK_IMPORTED_MODULE_1__.sampleFolder)();

(0,_src_modal_js__WEBPACK_IMPORTED_MODULE_0__.detailsModal)();

(0,_scripts_js__WEBPACK_IMPORTED_MODULE_1__.clickOutsideModal)();

newBtn.addEventListener('click', () => {
    dialog.showModal();

    (0,_src_modal_js__WEBPACK_IMPORTED_MODULE_0__.runModal)();
    (0,_src_modal_js__WEBPACK_IMPORTED_MODULE_0__.submitModal)();
});



// fix bug - btnIndex not updating when detailsModal is submitted, stuck overwriting first selection

// add styling for 'checked' tasks (greyed out, crossed out, etc)

// clean up modules
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztVQ3pJQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xRTtBQUNQOztBQUU5RDtBQUNBOztBQUVBLHlEQUFZOztBQUVaLDJEQUFZOztBQUVaLDhEQUFpQjs7QUFFakI7QUFDQTs7QUFFQSxJQUFJLHVEQUFRO0FBQ1osSUFBSSwwREFBVztBQUNmLENBQUM7Ozs7QUFJRDs7QUFFQTs7QUFFQSxtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRldGFpbHMsIGRhdGUsIHVyZ2VuY3kpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLnVyZ2VuY3kgPSB1cmdlbmN5O1xuICAgIH1cbn07XG5cbmNsYXNzIEZvbGRlciB7XG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3M7XG4gICAgfVxufTtcblxuY29uc3QgZm9sZGVyTGlzdCA9IFtdO1xuXG5leHBvcnQge1Rhc2ssIEZvbGRlciwgZm9sZGVyTGlzdH07IiwiaW1wb3J0IHsgZm9sZGVyTGlzdCB9IGZyb20gXCIuLi9zcmMvY2xhc3MuanNcIjtcbmltcG9ydCB7IG5ld1Rhc2tMaXN0LCBkZWxldGVUYXNrT2JqIH0gZnJvbSBcIi4vc2NyaXB0cy5qc1wiO1xuaW1wb3J0IHsgZGV0YWlsc01vZGFsIH0gZnJvbSBcIi4vbW9kYWwuanNcIjtcblxuZnVuY3Rpb24gbmV3Rm9sZGVyIChmb2xkZXJPYmopIHtcbiAgICBjb25zdCBmb2xkZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvbGRlckxpc3QnKTtcbiAgICBjb25zdCBmb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBmb2xkZXJUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgY29uc3QgZm9sZGVyUmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNvbnN0IGNoaWxkQ291bnRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgbGV0IHJhZGlvSWQgPSBmb2xkZXJPYmoudGl0bGUucmVwbGFjZSgvXFxzL2csICcnKTtcblxuICAgIGZvbGRlclJhZGlvLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtyYWRpb0lkfWApO1xuICAgIGZvbGRlclJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICAgIGZvbGRlclJhZGlvLnZhbHVlID0gZm9sZGVyT2JqLnRpdGxlO1xuICAgIGZvbGRlclJhZGlvLm5hbWUgPSAnZm9sZGVyJztcblxuICAgIGZvbGRlclRpdGxlLnRleHRDb250ZW50ID0gZm9sZGVyT2JqLnRpdGxlO1xuICAgIGZvbGRlclRpdGxlLmh0bWxGb3IgPSBgJHtyYWRpb0lkfWA7XG4gICAgZm9sZGVyVGl0bGUuY2xhc3NMaXN0LmFkZCgnZm9sZGVyTGFiZWwnKTtcblxuICAgIGNoaWxkQ291bnRlci5jbGFzc0xpc3QuYWRkKCdjaGlsZENvdW50ZXInKTtcbiAgICBjaGlsZENvdW50ZXIuc2V0QXR0cmlidXRlKCdpZCcsIGAke3JhZGlvSWR9Q291bnRlcmApO1xuICAgIGZvbGRlci5jbGFzc0xpc3QuYWRkKCdmb2xkZXInKTtcbiAgICBcbiAgICBmb2xkZXIuYXBwZW5kQ2hpbGQoZm9sZGVyUmFkaW8pO1xuICAgIGZvbGRlci5hcHBlbmRDaGlsZChmb2xkZXJUaXRsZSk7XG4gICAgZm9sZGVyLmFwcGVuZENoaWxkKGNoaWxkQ291bnRlcik7XG4gICAgZm9sZGVyTGlzdC5hcHBlbmRDaGlsZChmb2xkZXIpO1xuXG4gICAgZGV0YWlsc01vZGFsKCk7XG59XG5cbmZ1bmN0aW9uIG5ld1Rhc2sgKHRhc2tPYmopIHtcbiAgICBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrTGlzdCcpO1xuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCB1cmdlbmN5QmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZGV0YWlsc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGVsZXRlQnRuJyk7XG4gICAgY29uc3QgZGVsZXRlSW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICBjaGVja2JveC5jbGFzc05hbWUgPSAndGFza0NoZWNrYm94JztcbiAgICBjaGVja2JveC5uYW1lID0gJ3Rhc2tDaGVja2JveCc7XG4gICAgdGFzay5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cbiAgICBwLmNsYXNzTmFtZSA9ICd0YXNrVGl0bGUnO1xuICAgIHAudGV4dENvbnRlbnQgPSB0YXNrT2JqLnRpdGxlO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQocCk7XG5cbiAgICB1cmdlbmN5QmFyLmNsYXNzTmFtZSA9ICd1cmdlbmN5QmFyJztcbiAgICAgICAgc3dpdGNoKHRhc2tPYmoudXJnZW5jeSl7XG4gICAgICAgICAgICBjYXNlICdMb3cnOlxuICAgICAgICAgICAgICAgIHVyZ2VuY3lCYXIuc3R5bGUuYm9yZGVyQm90dG9tID0gJzJweCBzb2xpZCAjOTVFMUQzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ01lZGl1bSc6XG4gICAgICAgICAgICAgICAgdXJnZW5jeUJhci5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMnB4IHNvbGlkICNGQ0UzOEEnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSGlnaCc6XG4gICAgICAgICAgICAgICAgdXJnZW5jeUJhci5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMnB4IHNvbGlkICNGMzgxODEnO1xuICAgICAgICB9XG4gICAgdGFzay5hcHBlbmRDaGlsZCh1cmdlbmN5QmFyKTtcblxuXG4gICAgZGV0YWlsc0J0bi5jbGFzc05hbWUgPSAnZGV0YWlsc0J0bic7XG4gICAgZGV0YWlsc0J0bi50ZXh0Q29udGVudCA9ICdERVRBSUxTJztcbiAgICB0YXNrLmFwcGVuZENoaWxkKGRldGFpbHNCdG4pO1xuXG4gICAgZGF0ZS5jbGFzc05hbWUgPSAnZGF0ZSc7XG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IHRhc2tPYmouZGF0ZTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKGRhdGUpO1xuXG4gICAgZGVsZXRlSW1nLmNsYXNzTmFtZSA9ICdkZWxldGVJbWcnO1xuICAgIGRlbGV0ZUltZy5zcmMgPSAnLi4vc3JjL2ltZy9kZWxldGUuc3ZnJztcbiAgICBkZWxldGVCdG4uYXBwZW5kQ2hpbGQoZGVsZXRlSW1nKTtcblxuICAgICAgICBkZWxldGVCdG4uY2xhc3NOYW1lID0gJ2RlbGV0ZUJ0bic7XG4gICAgICAgIHRhc2suYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgIHRhc2suY2xhc3NOYW1lID0gJ3Rhc2snO1xuICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2spO1xuXG4gICAgZGV0YWlsc01vZGFsKCk7XG5cbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZVRhc2tPYmoodGFza09iaik7XG4gICAgICAgIHRhc2sucmVtb3ZlKCk7XG4gICAgfSlcbiAgICBcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGFzayAodGFza0VsZW1lbnQsIHRpdGxlLCBkYXRlLCB1cmdlbmN5KSB7XG4gICAgY29uc3QgdGFza1RpdGxlID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpO1xuICAgIGNvbnN0IHRhc2tEYXRlID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUnKTtcbiAgICBjb25zdCB0YXNrVXJnZW5jeSA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cmdlbmN5QmFyJyk7XG5cbiAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICB0YXNrRGF0ZS52YWx1ZSA9IGRhdGU7XG4gICAgc3dpdGNoKHVyZ2VuY3kpe1xuICAgICAgICBjYXNlICdMb3cnOlxuICAgICAgICAgICAgdGFza1VyZ2VuY3kuc3R5bGUuYm9yZGVyQm90dG9tID0gJzJweCBzb2xpZCAjOTVFMUQzJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNZWRpdW0nOlxuICAgICAgICAgICAgdGFza1VyZ2VuY3kuc3R5bGUuYm9yZGVyQm90dG9tID0gJzJweCBzb2xpZCAjRkNFMzhBJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdIaWdoJzpcbiAgICAgICAgICAgIHRhc2tVcmdlbmN5LnN0eWxlLmJvcmRlckJvdHRvbSA9ICcycHggc29saWQgI0YzODE4MSc7XG4gICAgfVxuICAgIFxufVxuXG5mdW5jdGlvbiBzZWxlY3RGb2xkZXIgKCkge1xuICAgIGNvbnN0IGFsbExhYmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb2xkZXJMYWJlbCcpO1xuICAgIGNvbnN0IGFsbEZvbGRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9sZGVyJyk7XG5cbiAgICBmb3IgKGxldCBsYWJlbCBvZiBhbGxMYWJlbHMpIHtcblxuICAgICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGZvbGRlck9iaiA9IGZvbGRlckxpc3RbMF07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGZvbGRlciBvZiBhbGxGb2xkZXJzKSB7XG4gICAgICAgICAgICAgICAgZm9sZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZvbGRlckFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSBsYWJlbC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb2xkZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvbGRlckxpc3RbaV0udGl0bGUgPT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9sZGVyT2JqID0gZm9sZGVyTGlzdFtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxhYmVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9sZGVyQWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tMaXN0Jyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrcyA9IGZvbGRlck9iai5nZXRUYXNrcygpO1xuXG4gICAgICAgICAgICB0YXNrTGlzdC5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuICAgICAgICAgICAgbmV3VGFza0xpc3QodGFza3MpO1xuXG4gICAgICAgICAgICBkZXRhaWxzTW9kYWwoKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgIH1cblxufVxuXG5leHBvcnQge25ld0ZvbGRlciwgbmV3VGFzaywgc2VsZWN0Rm9sZGVyLCB1cGRhdGVUYXNrfTsiLCJpbXBvcnQgeyBUYXNrLCBGb2xkZXIsIGZvbGRlckxpc3QgfSBmcm9tICcuLi9zcmMvY2xhc3MuanMnO1xuaW1wb3J0IHsgbmV3Rm9sZGVyLCBuZXdUYXNrLCBzZWxlY3RGb2xkZXIsIHVwZGF0ZVRhc2sgfSBmcm9tICcuLi9zcmMvZG9tLmpzJztcbmltcG9ydCB7IGFzc2lnblRhc2ssIGNoYW5nZVVyZ2VuY3ksIGNoaWxkQ291bnRlciwgZ2V0U2VsZWN0ZWRGb2xkZXIsIHNldFVyZ2VuY3l9IGZyb20gJy4uL3NyYy9zY3JpcHRzLmpzJztcblxuZnVuY3Rpb24gcnVuTW9kYWwgKCkge1xuICAgIGNvbnN0IG5ld1R5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dFtuYW1lPSduZXdUeXBlJ11gKTtcbiAgICBjb25zdCBmb2xkZXJSZXEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9sZGVyUmVxJyk7XG4gICAgY29uc3QgbW9kYWxIaWRkZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWxIaWRkZW4nKTtcblxuICAgIGZ1bmN0aW9uIGZsZXhEaXNwbGF5IChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbm9uZURpc3BsYXkgKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5hbWVJbnB1dCAoKSB7XG4gICAgICAgIGNvbnN0IG5ld05hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3TmFtZScpO1xuICAgICAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJyk7XG4gICAgICAgIFxuICAgICAgICB0aXRsZUlucHV0LnZhbHVlID0gbmV3TmFtZS52YWx1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIG1vZGFsSGlkZGVuKSB7XG4gICAgICAgIG5vbmVEaXNwbGF5KGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHR5cGUgb2YgbmV3VHlwZSkge1xuICAgICAgICB0eXBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm9sZGVyTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9sZGVyTGFiZWwnKTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrTGFiZWwnKTtcblxuICAgICAgICAgICAgaWYgKHR5cGUudmFsdWUgPT0gJ0ZvbGRlcicpIHtcbiAgICAgICAgICAgICAgICB0YXNrTGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnbmV3VHlwZUFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGZvbGRlckxhYmVsLmNsYXNzTGlzdC5hZGQoJ25ld1R5cGVBY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBuYW1lSW5wdXQoKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IG1vZGFsIG9mIG1vZGFsSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vbmVEaXNwbGF5KG1vZGFsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmb2xkZXIgb2YgZm9sZGVyUmVxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsZXhEaXNwbGF5KGZvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlLnZhbHVlID09ICdUYXNrJykge1xuICAgICAgICAgICAgICAgIGZvbGRlckxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ25ld1R5cGVBY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0YXNrTGFiZWwuY2xhc3NMaXN0LmFkZCgnbmV3VHlwZUFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIG5hbWVJbnB1dCgpO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbW9kYWwgb2YgbW9kYWxIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZmxleERpc3BsYXkobW9kYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCB1cmdlbmN5SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgaW5wdXRbbmFtZT0ndXJnZW5jeSddYCk7XG4gICAgY29uc3QgdXJnZW5jeUxhYmVsTG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVyZ2VuY3lMYWJlbExvdycpO1xuICAgIGNvbnN0IHVyZ2VuY3lMYWJlbE1lZGl1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cmdlbmN5TGFiZWxNZWRpdW0nKTtcbiAgICBjb25zdCB1cmdlbmN5TGFiZWxIaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVyZ2VuY3lMYWJlbEhpZ2gnKTtcblxuICAgIGNoYW5nZVVyZ2VuY3kodXJnZW5jeUxhYmVsTG93LCB1cmdlbmN5TGFiZWxNZWRpdW0sIHVyZ2VuY3lMYWJlbEhpZ2gsIHVyZ2VuY3lJbnB1dHMpO1xuXG59XG5cblxuZnVuY3Rpb24gc3VibWl0TW9kYWwgKCkge1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXRhaWxzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaWFsb2cnKTtcblxuICAgICAgICBmdW5jdGlvbiBmb2xkZXJNb2RhbFJlc2V0ICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb2xkZXJSYWRpbycpLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb2xkZXJMYWJlbCcpLmNsYXNzTGlzdC5yZW1vdmUoJ25ld1R5cGVBY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlID0gJyc7XG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRhc2tNb2RhbFJlc2V0ICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrUmFkaW8nKS5jaGVja2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGxldCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dFtuYW1lPVwidXJnZW5jeVwiXWApO1xuICAgICAgICAgICAgZm9yIChsZXQgaW5wdXQgb2YgaW5wdXRzKSB7IGlucHV0LmNoZWNrZWQgPSBmYWxzZSB9O1xuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXJnZW5jeUxhYmVsTG93JykuY2xhc3NMaXN0LnJlbW92ZSgnbG93QWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXJnZW5jeUxhYmVsTWVkaXVtJykuY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtQWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXJnZW5jeUxhYmVsSGlnaCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hBY3RpdmUnKTtcblxuICAgICAgICAgICAgdGFza0xhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ25ld1R5cGVBY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlID0gJyc7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0YWlscycpLnZhbHVlID0gJyc7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpLnZhbHVlID0gJyc7XG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb2xkZXJSYWRpbycpLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGxldCBmb2xkZXIgPSBuZXcgRm9sZGVyKHRpdGxlKTtcbiAgICAgICAgICAgIGZvbGRlckxpc3QucHVzaChmb2xkZXIpO1xuICAgICAgICAgICAgY29uc29sZS50YWJsZShmb2xkZXJMaXN0KTtcbiAgICAgICAgICAgIG5ld0ZvbGRlcihmb2xkZXIpO1xuICAgICAgICAgICAgc2VsZWN0Rm9sZGVyKCk7XG4gICAgICAgICAgICBmb2xkZXJNb2RhbFJlc2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tSYWRpbycpLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHVyZ2VuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidXJnZW5jeVwiXTpjaGVja2VkJykudmFsdWU7XG4gICAgICAgICAgICBsZXQgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXRhaWxzLCBkYXRlLCB1cmdlbmN5KTtcbiAgICAgICAgICAgIG5ld1Rhc2sodGFzayk7XG4gICAgICAgICAgICBhc3NpZ25UYXNrKHRhc2spO1xuICAgICAgICAgICAgY2hpbGRDb3VudGVyKCk7XG4gICAgICAgICAgICB0YXNrTW9kYWxSZXNldCgpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuXG5cbmZ1bmN0aW9uIGRldGFpbHNNb2RhbCAoKSB7XG4gICAgY29uc3QgZGV0YWlsc01vZGFsQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldGFpbHNNb2RhbENvbnRhaW5lcicpO1xuICAgIGNvbnN0IGRldGFpbHNCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRldGFpbHNCdG4nKTtcbiAgICBjb25zdCBkZXRhaWxzVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGV0YWlsc1RpdGxlJyk7XG4gICAgY29uc3QgZGV0YWlsc0RldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGV0YWlsc0RldGFpbHMnKTtcbiAgICBjb25zdCBkZXRhaWxzRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXRhaWxzRGF0ZScpO1xuXG4gICAgZm9yIChsZXQgYnRuIG9mIGRldGFpbHNCdG5zKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRldGFpbHNNb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgbGV0IGZvbGRlck9iaiA9IGdldFNlbGVjdGVkRm9sZGVyKCk7XG4gICAgICAgICAgICBsZXQgdGFza3MgPSBmb2xkZXJPYmouZ2V0VGFza3MoKTtcbiAgICAgICAgICAgIGxldCBidG5zQXJyYXkgPSBBcnJheS5mcm9tKGRldGFpbHNCdG5zKTtcbiAgICAgICAgICAgIGxldCBidG5JbmRleCA9IGJ0bnNBcnJheS5pbmRleE9mKGJ0bik7XG4gICAgICAgICAgICBsZXQgdGFza09iaiA9IHRhc2tzW2Ake2J0bkluZGV4fWBdO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhidG5JbmRleClcblxuICAgICAgICAgICAgZGV0YWlsc1RpdGxlLnZhbHVlID0gdGFza09iai50aXRsZTtcbiAgICAgICAgICAgIGRldGFpbHNEZXRhaWxzLnZhbHVlID0gdGFza09iai5kZXRhaWxzO1xuICAgICAgICAgICAgZGV0YWlsc0RhdGUudmFsdWUgPSB0YXNrT2JqLmRhdGU7XG4gICAgICAgICAgICBsZXQgdGFza1VyZ2VuY3kgPSB0YXNrT2JqLnVyZ2VuY3k7XG5cbiAgICAgICAgICAgIGNvbnN0IHVyZ2VuY3lJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dFtuYW1lPSdkZXRhaWxzVXJnZW5jeSddYCk7XG4gICAgICAgICAgICBjb25zdCB1cmdlbmN5TGFiZWxMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlsc1VyZ2VuY3lMb3cnKTtcbiAgICAgICAgICAgIGNvbnN0IHVyZ2VuY3lMYWJlbE1lZGl1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzVXJnZW5jeU1lZGl1bScpO1xuICAgICAgICAgICAgY29uc3QgdXJnZW5jeUxhYmVsSGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzVXJnZW5jeUhpZ2gnKTtcblxuICAgICAgICAgICAgc2V0VXJnZW5jeSh1cmdlbmN5TGFiZWxMb3csIHVyZ2VuY3lMYWJlbE1lZGl1bSwgdXJnZW5jeUxhYmVsSGlnaCwgdGFza1VyZ2VuY3kpO1xuXG4gICAgICAgICAgICBjaGFuZ2VVcmdlbmN5KHVyZ2VuY3lMYWJlbExvdywgdXJnZW5jeUxhYmVsTWVkaXVtLCB1cmdlbmN5TGFiZWxIaWdoLCB1cmdlbmN5SW5wdXRzKTtcblxuICAgICAgICAgICAgICAgIC8vY3VycmVudGx5IHN1Ym1pdCBidXR0b24gaXMgb3ZlcndyaXRpbmcgdGhlIHNhbWUgdGFza09iaiByYXRoZXIgdGhhbiBzZWxlY3RpbmcgYSBuZXcgXG4gICAgICAgICAgICAgICAgLy90YXNrT2JqIHdoZW4gYSBuZXcgYnRuIGlzIGNsaWNrZWRcblxuICAgICAgICAgICAgbGV0IHRhc2tFbGVtZW50ID0gYnRuLnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXRhaWxzU3VibWl0Jyk7XG5cbiAgICAgICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzdWJtaXREZXRhaWxzTW9kYWwodGFza0VsZW1lbnQsIGJ0bkluZGV4LCB0YXNrVXJnZW5jeSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gc3VibWl0RGV0YWlsc01vZGFsICh0YXNrRWxlbWVudCwgYnRuSW5kZXgsIHRhc2tVcmdlbmN5KSB7XG4gICAgY29uc3QgZGV0YWlsc1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldGFpbHNUaXRsZScpO1xuICAgIGNvbnN0IGRldGFpbHNEZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RldGFpbHNEZXRhaWxzJyk7XG4gICAgY29uc3QgZGV0YWlsc0RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGV0YWlsc0RhdGUnKTtcblxuICAgIGxldCB0aXRsZSA9IGRldGFpbHNUaXRsZS52YWx1ZTtcbiAgICBsZXQgZGV0YWlscyA9IGRldGFpbHNEZXRhaWxzLnZhbHVlO1xuICAgIGxldCBkYXRlID0gZGV0YWlsc0RhdGUudmFsdWU7XG4gICAgbGV0IHVyZ2VuY3kgPSAnJztcblxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJkZXRhaWxzVXJnZW5jeVwiXTpjaGVja2VkJykpe1xuICAgICAgICB1cmdlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImRldGFpbHNVcmdlbmN5XCJdOmNoZWNrZWQnKS52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cmdlbmN5ID0gdGFza1VyZ2VuY3k7XG4gICAgfVxuXG4gICAgbGV0IGZvbGRlck9iaiA9IGdldFNlbGVjdGVkRm9sZGVyKCk7XG4gICAgbGV0IHRhc2tzID0gZm9sZGVyT2JqLmdldFRhc2tzKCk7XG5cbiAgICBjb25zb2xlLmxvZyhgdGFza09iaiBzZWxlY3RlZCA9ICR7YnRuSW5kZXh9YClcblxuICAgIGxldCB1cGRhdGVkVGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXRhaWxzLCBkYXRlLCB1cmdlbmN5KTtcblxuICAgIHRhc2tzW2Ake2J0bkluZGV4fWBdID0gdXBkYXRlZFRhc2s7XG5cbiAgICBkZXRhaWxzTW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQuYnViYmxlcyk7XG4gICAgY29uc29sZS50YWJsZSh0YXNrcylcblxuICAgIHVwZGF0ZVRhc2sodGFza0VsZW1lbnQsIHRpdGxlLCBkYXRlLCB1cmdlbmN5KTtcblxuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xufVxuIFxuZXhwb3J0IHtydW5Nb2RhbCwgc3VibWl0TW9kYWwsIGRldGFpbHNNb2RhbH07IiwiaW1wb3J0IHsgbmV3VGFzaywgbmV3Rm9sZGVyIH0gZnJvbSAnLi4vc3JjL2RvbS5qcyc7XG5pbXBvcnQgeyBGb2xkZXIsIGZvbGRlckxpc3QgfSBmcm9tICcuL2NsYXNzLmpzJztcblxuZnVuY3Rpb24gbmV3VGFza0xpc3QgKGFycmF5KSB7XG4gICAgZm9yIChsZXQgYXJyIG9mIGFycmF5KSB7XG4gICAgICAgIG5ld1Rhc2soYXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFzc2lnblRhc2sgKHRhc2spIHtcbiAgICBsZXQgZm9sZGVyT2JqID0gZ2V0U2VsZWN0ZWRGb2xkZXIoKTtcblxuICAgIGZvbGRlck9iai5hZGRUYXNrKHRhc2spO1xufVxuXG5cbmZ1bmN0aW9uIGdldFNlbGVjdGVkRm9sZGVyICgpIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiZm9sZGVyXCJdOmNoZWNrZWQnKTtcbiAgICBsZXQgZm9sZGVyT2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb2xkZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxlY3RlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmb2xkZXJPYmogPSBmb2xkZXJMaXN0WzBdXG4gICAgICAgIH0gZWxzZSBpZihmb2xkZXJMaXN0W2ldLnRpdGxlID09IHNlbGVjdGVkLnZhbHVlKSB7XG4gICAgICAgICAgICBmb2xkZXJPYmogPSBmb2xkZXJMaXN0W2ldO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIHJldHVybiBmb2xkZXJPYmo7XG59XG5cbmZ1bmN0aW9uIHNhbXBsZUZvbGRlciAoKSB7XG4gICAgbGV0IGZvbGRlciA9IG5ldyBGb2xkZXIoJ0RldmVsb3BtZW50Jyk7XG4gICAgbGV0IHRhc2tzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDI0LTAxLTA4JyxcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiAnZXhhbXBsZSB0YXNrIGRldGFpbHMnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnTGVhcm4gdG8gdXNlIENTUyBmcmFtZXdvcmtzJyxcbiAgICAgICAgICAgICAgICB1cmdlbmN5OiAnTG93J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAyNC0wMS0wNycsXG4gICAgICAgICAgICAgICAgZGV0YWlsczogJ2V4YW1wbGUgdGFzayBkZXRhaWxzJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1N0dWR5IEFuZ3VsYXIgb3IgTmV4dCBKUyAnLFxuICAgICAgICAgICAgICAgIHVyZ2VuY3k6ICdNZWRpdW0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDI0LTAxLTA2JyxcbiAgICAgICAgICAgICAgICBkZXRhaWxzOiAnZXhhbXBsZSB0YXNrIGRldGFpbHMnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnTWFzdGVyIEphdmFzY3JpcHQnLFxuICAgICAgICAgICAgICAgIHVyZ2VuY3k6ICdIaWdoJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG5cbiAgICBmb2xkZXIudGFza3MucHVzaCguLi50YXNrcyk7XG5cbiAgICBuZXdGb2xkZXIoZm9sZGVyKTtcbiAgICBuZXdUYXNrTGlzdChmb2xkZXIudGFza3MpO1xuICAgIGZvbGRlckxpc3QucHVzaChmb2xkZXIpO1xuICAgIGNoaWxkQ291bnRlcigpO1xufVxuXG5mdW5jdGlvbiBjaGlsZENvdW50ZXIgKCkge1xuICAgIGxldCBmb2xkZXJPYmogPSBnZXRTZWxlY3RlZEZvbGRlcigpO1xuICAgIGxldCB0YXNrcyA9IGZvbGRlck9iai5nZXRUYXNrcygpO1xuICAgIGxldCB0aXRsZSA9IGZvbGRlck9iai50aXRsZTtcbiAgICBjb25zdCBjb3VudGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGl0bGV9Q291bnRlcmApO1xuXG4gICAgY291bnRlci50ZXh0Q29udGVudCA9IHRhc2tzLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gY2hhbmdlVXJnZW5jeSAodXJnZW5jeUxhYmVsTG93LCB1cmdlbmN5TGFiZWxNZWRpdW0sIHVyZ2VuY3lMYWJlbEhpZ2gsIHVyZ2VuY3lJbnB1dHMpIHtcbiAgICBmb3IgKGxldCB1cmdlbmN5IG9mIHVyZ2VuY3lJbnB1dHMpIHtcbiAgICAgICAgdXJnZW5jeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCh1cmdlbmN5LnZhbHVlKXtcbiAgICAgICAgICAgICAgICBjYXNlICdMb3cnOlxuICAgICAgICAgICAgICAgICAgICB1cmdlbmN5TGFiZWxIaWdoLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hBY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgdXJnZW5jeUxhYmVsTWVkaXVtLmNsYXNzTGlzdC5yZW1vdmUoJ21lZGl1bUFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB1cmdlbmN5TGFiZWxMb3cuY2xhc3NMaXN0LmFkZCgnbG93QWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ01lZGl1bSc6XG4gICAgICAgICAgICAgICAgICAgIHVyZ2VuY3lMYWJlbEhpZ2guY2xhc3NMaXN0LnJlbW92ZSgnaGlnaEFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB1cmdlbmN5TGFiZWxMb3cuY2xhc3NMaXN0LnJlbW92ZSgnbG93QWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIHVyZ2VuY3lMYWJlbE1lZGl1bS5jbGFzc0xpc3QuYWRkKCdtZWRpdW1BY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSGlnaCc6XG4gICAgICAgICAgICAgICAgICAgIHVyZ2VuY3lMYWJlbExvdy5jbGFzc0xpc3QucmVtb3ZlKCdsb3dBY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgdXJnZW5jeUxhYmVsTWVkaXVtLmNsYXNzTGlzdC5yZW1vdmUoJ21lZGl1bUFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB1cmdlbmN5TGFiZWxIaWdoLmNsYXNzTGlzdC5hZGQoJ2hpZ2hBY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFVyZ2VuY3kgKHVyZ2VuY3lMYWJlbExvdywgdXJnZW5jeUxhYmVsTWVkaXVtLCB1cmdlbmN5TGFiZWxIaWdoLCB0YXNrVXJnZW5jeSkge1xuICAgIHN3aXRjaCh0YXNrVXJnZW5jeSl7XG4gICAgICAgIGNhc2UgJ0xvdyc6XG4gICAgICAgICAgICB1cmdlbmN5TGFiZWxIaWdoLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2hBY3RpdmUnKTtcbiAgICAgICAgICAgIHVyZ2VuY3lMYWJlbE1lZGl1bS5jbGFzc0xpc3QucmVtb3ZlKCdtZWRpdW1BY3RpdmUnKTtcbiAgICAgICAgICAgIHVyZ2VuY3lMYWJlbExvdy5jbGFzc0xpc3QuYWRkKCdsb3dBY3RpdmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNZWRpdW0nOlxuICAgICAgICAgICAgdXJnZW5jeUxhYmVsSGlnaC5jbGFzc0xpc3QucmVtb3ZlKCdoaWdoQWN0aXZlJyk7XG4gICAgICAgICAgICB1cmdlbmN5TGFiZWxMb3cuY2xhc3NMaXN0LnJlbW92ZSgnbG93QWN0aXZlJyk7XG4gICAgICAgICAgICB1cmdlbmN5TGFiZWxNZWRpdW0uY2xhc3NMaXN0LmFkZCgnbWVkaXVtQWN0aXZlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSGlnaCc6XG4gICAgICAgICAgICB1cmdlbmN5TGFiZWxMb3cuY2xhc3NMaXN0LnJlbW92ZSgnbG93QWN0aXZlJyk7XG4gICAgICAgICAgICB1cmdlbmN5TGFiZWxNZWRpdW0uY2xhc3NMaXN0LnJlbW92ZSgnbWVkaXVtQWN0aXZlJyk7XG4gICAgICAgICAgICB1cmdlbmN5TGFiZWxIaWdoLmNsYXNzTGlzdC5hZGQoJ2hpZ2hBY3RpdmUnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsaWNrT3V0c2lkZU1vZGFsICgpIHtcbiAgICBjb25zdCBkZXRhaWxzTW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGV0YWlsc01vZGFsQ29udGFpbmVyJyk7XG4gICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGlhbG9nJyk7XG5cbiAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gZGV0YWlsc01vZGFsQ29udGFpbmVyKSB7XG4gICAgICAgICAgZGV0YWlsc01vZGFsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gZGlhbG9nKSB7XG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFza09iaiAodGFza09iaikge1xuICAgIGNvbnN0IGRlbGV0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlQnRuJyk7XG4gICAgbGV0IGZvbGRlck9iaiA9IGdldFNlbGVjdGVkRm9sZGVyKCk7XG4gICAgbGV0IHRhc2tzID0gZm9sZGVyT2JqLmdldFRhc2tzKCk7XG4gICAgbGV0IGJ0bnNBcnJheSA9IEFycmF5LmZyb20oZGVsZXRlQnRucyk7XG4gICAgbGV0IGJ0bkluZGV4ID0gYnRuc0FycmF5LmluZGV4T2YodGFza09iaik7XG4gICAgXG4gICAgdGFza3Muc3BsaWNlKGJ0bkluZGV4LCAxKTtcbiAgICBjaGlsZENvdW50ZXIoKTtcbiAgICBjb25zb2xlLmxvZyh0YXNrcylcblxufVxuXG5leHBvcnQge25ld1Rhc2tMaXN0LCBhc3NpZ25UYXNrLCBnZXRTZWxlY3RlZEZvbGRlciwgXG4gICAgc2FtcGxlRm9sZGVyLCBjaGlsZENvdW50ZXIsIGNoYW5nZVVyZ2VuY3ksIHNldFVyZ2VuY3ksIGNsaWNrT3V0c2lkZU1vZGFsLFxuZGVsZXRlVGFza09ian07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkZXRhaWxzTW9kYWwsIHJ1bk1vZGFsLCBzdWJtaXRNb2RhbH0gZnJvbSAnLi4vc3JjL21vZGFsLmpzJztcbmltcG9ydCB7IHNhbXBsZUZvbGRlciwgY2xpY2tPdXRzaWRlTW9kYWx9IGZyb20gJy4vc2NyaXB0cy5qcyc7XG5cbmNvbnN0IG5ld0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdCdG4nKTtcbmNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpO1xuXG5zYW1wbGVGb2xkZXIoKTtcblxuZGV0YWlsc01vZGFsKCk7XG5cbmNsaWNrT3V0c2lkZU1vZGFsKCk7XG5cbm5ld0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG5cbiAgICBydW5Nb2RhbCgpO1xuICAgIHN1Ym1pdE1vZGFsKCk7XG59KTtcblxuXG5cbi8vIGZpeCBidWcgLSBidG5JbmRleCBub3QgdXBkYXRpbmcgd2hlbiBkZXRhaWxzTW9kYWwgaXMgc3VibWl0dGVkLCBzdHVjayBvdmVyd3JpdGluZyBmaXJzdCBzZWxlY3Rpb25cblxuLy8gYWRkIHN0eWxpbmcgZm9yICdjaGVja2VkJyB0YXNrcyAoZ3JleWVkIG91dCwgY3Jvc3NlZCBvdXQsIGV0YylcblxuLy8gY2xlYW4gdXAgbW9kdWxlcyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==