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

export {Task, Folder, folderList};