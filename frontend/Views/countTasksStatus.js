
export const countTasksStatus = (tasks, taskNumber) => {
    taskNumber = {
        newRequest: 0,
        inProgress: 0,
        toBeTested: 0,
        completed: 0
    }
    tasks && tasks.map((task) => {
        if (task.attributes.status === "new request") {
            taskNumber.newRequest++
        } else if (task.attributes.status === "in progress") {
            taskNumber.inProgress++
        } else if (task.attributes.status === "to be tested") {
            taskNumber.toBeTested++
        } else if (task.attributes.status === "completed") {
            taskNumber.completed++
        }
    })
    return taskNumber
}
