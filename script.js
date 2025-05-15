let tasks = ["Vacuum Floor", "Stock Restrooms", "Empty Trash", "Sweep Sidewalk"];
let taskIndex = 0;
let mainTimer, auxTimer, auxActive = false;
let mainSeconds = 0, auxSeconds = 0;

// Update task display
function updateTask() {
    document.getElementById("current-task").textContent = tasks[taskIndex];
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
    document.getElementById("current-task").style.color = "#888"; // Grey out
    if (taskIndex < tasks.length - 1) taskIndex++;
    updateTask();
});

// Auxiliary task handling
document.getElementById("auxTask").addEventListener("click", () => {
    stopMainTimer();
    document.querySelector(".aux-container").classList.remove("hidden");
    auxActive = true;
    auxTimer = setInterval(() => {
        auxSeconds++;
        document.getElementById("auxTimer").textContent = new Date(auxSeconds * 1000).toISOString().substr(11, 8);
    }, 1000);
});

// Complete auxiliary task
document.getElementById("completeAuxTask").addEventListener("click", () => {
    clearInterval(auxTimer);
    document.querySelector(".aux-container").classList.add("hidden");
    document.getElementById("auxTimer").textContent = "00:00:00";
    auxSeconds = 0;
    startMainTimer();
});

// Initialize task display
updateTask();
