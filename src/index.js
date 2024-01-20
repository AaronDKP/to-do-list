import { detailsModal, runModal, submitModal} from '../src/modal.js';
import { sampleFolder, clickOutsideModal} from './scripts.js';

const newBtn = document.getElementById('newBtn');
const dialog = document.querySelector('dialog');

sampleFolder();

detailsModal();

clickOutsideModal();

newBtn.addEventListener('click', () => {
    dialog.showModal();

    runModal();
    submitModal();
});



// fix bug - btnIndex not updating when detailsModal is submitted, stuck overwriting first selection

// add styling for 'checked' tasks (greyed out, crossed out, etc)

// clean up modules