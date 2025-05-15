let tasks = ["Vacuum Floors", "Stock Restrooms", "Empty Trash", "Sweep Sidewalk"];
let taskIndex = 1;
let mainTimer, auxTimer;
let mainSeconds = 0, auxSeconds = 0;

// Update task display
function updateTask() {
    let taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach((item, index) => {
        item.textContent = tasks[index];
        if (index === taskIndex) {
            item.classList.add("highlighted-task");
        } else {
            item.classList.remove("highlighted-task");
            item.style.color = "#888"; // Grey out previous tasks
        }
    });
}

// Scroll through tasks
document.getElementById("prevTask").addEventListener("click", () => {
    if (taskIndex > 0) taskIndex--;
    updateTask();
});

document.getElementById("nextTask").addEventListener("click", () => {
    if (taskIndex < tasks.length - 1) taskIndex++;
    updateTask();
});

// Timer functions
function startMainTimer() {
    mainTimer = setInterval(() => {
        mainSeconds++;
        document.getElementById("mainTimer").textContent = new Date(mainSeconds * 1000).toISOString().substr(11, 8);
    }, 1000);
}

function stopMainTimer() {
    clearInterval(mainTimer);
}

// Start task
document.getElementById("startTask").addEventListener("click", () => {
    startMainTimer();
});

// Complete task
document.getElementById("completeTask").addEventListener("click", () => {
    stopMainTimer();
    if (taskIndex < tasks.length - 1) {
        taskIndex++;
        updateTask();
    }
});

// Auxiliary task handling
document.getElementById("auxTask").addEventListener("click", () => {
    stopMainTimer();
    document.querySelector(".aux-container").classList.remove("hidden");
    auxTimer = setInterval(() => {
        auxSeconds++;
        document.getElementById("auxTimer").textContent = new Date(auxSeconds * 1000).toISOString().substr(11, 8);
    }, 1000);
});

// Complete auxiliary task
document.getElementById("completeAuxTask").addEventListener("click", () => {
    clearInterval(auxTimer);
    document.querySelector(".aux-container").classList.add("hidden");
    auxSeconds = 0;
    document.getElementById("auxTimer").textContent = "00:00:00";
    startMainTimer();
});

// Initialize task display
updateTask();
