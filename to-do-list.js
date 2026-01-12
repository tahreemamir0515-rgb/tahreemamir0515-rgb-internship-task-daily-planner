document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const timeInput = document.getElementById("time-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");

  
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();


  addBtn.addEventListener("click", () => {
    addTask();
  });


  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const text = taskInput.value.trim();
    const time = timeInput.value;

    if (text === "") {
      alert("Please enter a task! 😊");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text,
      time: time,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();


    taskInput.value = "";
    timeInput.value = "";
    taskInput.focus();
  }


  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

     
      let timeDisplay = "";
      if (task.time) {

        const [hours, minutes] = task.time.split(":");
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        const formattedHour = h % 12 || 12;
        timeDisplay = `${formattedHour}:${minutes} ${ampm}`;
      }

      li.innerHTML = `
                <div class="task-content">
                    <span class="task-title">${task.text}</span>
                    ${
                      task.time
                        ? `<span class="task-time"><i class="far fa-clock"></i> ${timeDisplay}</span>`
                        : ""
                    }
                </div>
                <div class="task-actions">
                    <button class="check-btn" onclick="toggleTask(${task.id})">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;


      li.querySelector(".task-content").addEventListener("click", () =>
        toggleTask(task.id)
      );

      taskList.appendChild(li);
    });
  }


  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }


  window.deleteTask = function (id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  };

  window.toggleTask = function (id) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    saveTasks();
    renderTasks();
  };
});
