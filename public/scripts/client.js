$(document).ready(init);

let tasks = [];

function init() {
  console.log("The DOM is ready to roll");

  //connecting event listeners to the DOM
  $(".js-TODO-input-form").on("submit", submitTask); //connecting to the input form class
  // $("#complete_task").on("click", clickCompleteTask);
  // $("#delete_task").on("click", clickDeleteTask);

  //load tasks to DOM
  getTasks();
}

//EVENT HANDLERS

//below function captures DOM input on click and logs it to the console, then calls to function that clears the input field
function submitTask(event) {
  event.preventDefault();
  console.log("You clicked to add a task");
  const taskInput = $(".js-TODO-input").val();
  postTask(taskInput); //passes the DOM input to postTask function
  clearInput();
}

//function to clear input field
function clearInput() {
  $(".js-TODO-input").val("");
}

function clickCompleteTask(event) {
  console.log("You clicked to complete a task");
}

function clickDeleteTask(event) {
  console.log("You clicked to complete a task");
}

//SERVER API CALLS//
function getTasks() {
  $.ajax({
    method: "GET",
    url: "/todo",
  })
    .then((response) => {
      render(response);
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

// function postTask(task) {
//   //postTask function takes a task as its argument, which will generally be the taskInput generated on the DOM
//   const dataForServer = {
//     //creating an object to pass to the server in ajax call through POST route
//     task_name: task,
//   };
//   $.ajax({
//     type: "POST",
//     url: "/todo",
//     data: dataForServer,
//   })
//     .then((response) => {
//       getTasks();
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log("error:", err);
//     });
// }

function postTask(task) {
  const dataForServer = {
    task: task,
  };

  $.ajax({
    type: "POST",
    url: "/todo",
    data: dataForServer,
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.warn(err);
    });
}

//updates to the DOM
function render(taskList) {
  console.log(taskList);
  $(".appendedTasks").empty();

  for (let taskItem of taskList) {
    $(".appendedTasks").append(`

    <li class="task_item">
    ${taskItem.task_name}
    <button class="js-completeTask-btn btn btn_fullWidth" id="complete_task">Complete Task</button>
<button class="js-deleteTask-btn btn btn_fullWidth" id="delete_task">Delete Task</button>
    </li>
    
    
    `);
  }
}
