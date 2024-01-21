document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const dateInput = document.getElementById('date-input');
  const timeInput = document.getElementById('time-input');
  const taskDetails = document.getElementById('note-container');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    addTask();
  });

  taskDetails.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      deleteTask(e.target.parentNode);
    }
    if (e.target.classList.contains('done')) {
      doneTask(e.target.parentNode);
    }

  });

  loadTasks();

  function addTask() {
    const task = {
      description: taskInput.value,
      date: dateInput.value,
      time: timeInput.value,
      done: false,
    };

    saveTask(task);
    createNoteElement(task);
    resetForm();
  }

  function saveTask(task) {
    let tasks = getSavedTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function getSavedTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  function loadTasks() {
    let tasks = getSavedTasks();
    tasks.forEach(task => {
      createNoteElement(task);
    });
  }

  function createNoteElement(task) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <p class = "des">${task.description}</p>
        <p>Date: ${task.date}</p>
        <p>Time: ${task.time}</p>
        <span class="delete-btn">&times;</span>
        <span class="material-symbols-outlined done">
        done
        </span>

      `;
    if (task.done)
      note.style = 'text-decoration: line-through'
    
    taskDetails.appendChild(note);
  }


  function deleteTask(note) {
    let tasks = getSavedTasks();
    const taskDesc = note.querySelector('p').textContent;
    tasks = tasks.filter(task => task.description !== taskDesc);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    note.remove();
  }

  function doneTask(note) {
    let tasks = getSavedTasks();
    const taskDesc = note.querySelector('p').textContent;
    tasks.forEach(task => {
      if (task.description == taskDesc) {
        task.done = true;
        note.style = 'text-decoration: line-through'
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


  function resetForm() {
    form.reset();
  }
});

