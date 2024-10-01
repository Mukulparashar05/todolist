<script>
    let tasks = [];

    // Load tasks from localStorage when the page is loaded
    window.onload = loadTasks;

    function addTask() {
      let taskInput = document.getElementById("taskInput").value.trim();
      let timeRequired = document.getElementById("timeInput").value;
      let priority = document.getElementById("priorityInput").value;
      let category = document.getElementById("categoryInput").value;

      // Validate inputs
      if (taskInput === "" || timeRequired === "") {
        alert("Please fill out the task and time required fields.");
        return;
      }

      let task = {
        task: taskInput,
        time: timeRequired,
        priority: priority,
        category: category,
        completed: false
      };

      tasks.push(task);
      saveTasks();
      renderTasks();
      updateProgress();

      // Clear inputs after adding the task
      document.getElementById("taskInput").value = "";
      document.getElementById("timeInput").value = "";
    }

    function renderTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    // Assign class based on priority
    if (task.priority === "High") {
      li.classList.add("high-priority");
    } else if (task.priority === "Low") {
      li.classList.add("low-priority");
    }

    li.innerHTML = `<div class="task-info">
                      <input type="checkbox" onclick="markCompleted(${index})" ${task.completed ? "checked" : ""}>
                      <span>${task.task}</span>
                      <span class="time-required">Time Required: ${task.time} hours</span>
                      <span class="priority">Priority: ${task.priority}</span>
                      <span>Category: ${task.category}</span>
                    </div>
                    <span class="delete" onclick="deleteTask(${index})">x</span>`;

    taskList.appendChild(li);
  });
}


    function markCompleted(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
      updateProgress();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      updateProgress();
    }

    function updateProgress() {
      let completedTasks = tasks.filter(task => task.completed).length;
      let progress = (completedTasks / tasks.length) * 100 || 0;
      document.getElementById("taskProgress").value = progress;
    }

    function clearTasks() {
      tasks = [];
      saveTasks();
      renderTasks();
      updateProgress();
    }

    function saveTasks() {
      // Save the tasks array as a string in localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      // Retrieve the tasks from localStorage, parse them, and populate the tasks array
      let savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
        updateProgress();
      }
    }
  </script>

</body>
</html>
