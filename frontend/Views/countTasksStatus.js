export const countTasksStatus = (tasks) => {

    let taskNumber = {
        newRequest: 0,
        inProgress: 0,
        toBeTested: 0,
        completed: 0,
    };
    // console.log(tasks,"tasks");
    tasks &&
        tasks.forEach((task) => {
            // console.log(task.attributes.status);

            switch (task.attributes.status) {
                case "new request":
                    taskNumber.newRequest++;
                    break;
                case "in progress":
                    taskNumber.inProgress++;
                    break;
                case "to be tested":
                    taskNumber.toBeTested++;
                    break;
                case "completed":
                    taskNumber.completed++;
                    break;
                default:
                    break;
            }
        });
    // console.log(taskNumber, "taskNumber2");
    return taskNumber;
};
