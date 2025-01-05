import React, {useState} from "react";
function progressBar({tasks}) {
    const tasksLen = tasks.length;
    const completedTasks = tasks.filter(task => task.status === "DONE").length;
    const progress = tasksLen > 0 ? (completedTasks / tasksLen) * 100 : 0;
    return (
        <progress className="progress-bar" value={progress} max="100">
            {progress}%
        </progress>
    )
}

export default progressBar;