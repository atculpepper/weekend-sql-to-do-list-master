$(document).ready(init);

let tasks = [];

function init() {
  console.log("The DOM is ready to roll");

  //connecting event listeners to the DOM
  $(".js-TODO-input-form").on("submit", submitTask); //connecting to the input form class
  $(".appendedTasks").on("click", ".js-completeTask-btn", updateComplete);
  $(".appendedTasks").on("click", ".js-deleteTask-btn", deleteTask);

  //load tasks to DOM
  getTasks();
}

//EVENT HANDLERS

//below function captures DOM input on click and logs it to the console, then calls to function that clears the input field
function submitTask(event) {
  event.preventDefault();
  const taskInput = $(".js-TODO-input").val();
  postTask(taskInput); //passes the DOM input to postTask function
  console.log("You clicked to add " + taskInput);

  clearInput();
}

//function to clear input field
function clearInput() {
  $(".js-TODO-input").val("");
}

//SERVER API CALLS//
function updateComplete() {
  console.log("you clicked to update");
  //define a constant for the task ID
  const taskID = $(this).parent().data("id"); //"this" is the button on the parent div that is on the DOM from page load
  console.log(taskID + this); //should log out the ID on "this" parent element of the button child you click

  //need to transfer over to server
  $.ajax({
    method: "PUT",
    //updating this URL with the taskID using a template literal
    url: `/todo/${taskID}`,
  })
    .then((response) => {
      //reload the tasks now that one is deleted
      getTasks();
      render(response);
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

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

//sending captured value from client side to the server
function postTask(task) {
  //postTask function takes a task as its argument, which will generally be the taskInput generated on the DOM
  const dataForServer = {
    //creating an object to pass to the server in ajax call through POST route
    task: task,
  };
  $.ajax({
    type: "POST",
    url: "/todo",
    data: dataForServer,
  })
    .then((response) => {
      getTasks();
      console.log(response);
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

function deleteTask() {
  console.log("You clicked to delete this task.");
  //define a constant for the task ID
  const taskID = $(this).parent().data("id"); //"this" is the button on the parent div that is on the DOM from page load
  console.log(taskID); //should log out the ID on "this" parent element of the button child you click

  //need to transfer over to server
  $.ajax({
    method: "DELETE",
    //updating this URL with the taskID using a template literal
    url: `/todo/${taskID}`,
  })
    .then((response) => {
      //reload the tasks now that one is deleted
      getTasks();
      render(response);
    })
    .catch((err) => {
      console.log("error:", err);
    });
}

//UPDATES TO THE DOM
function render(taskList) {
  console.log(taskList);
  $(".appendedTasks").empty();

  for (let taskItem of taskList) {
    $(".appendedTasks").append(`

    <li data-id = ${taskItem.id} class="task_item">
    ${taskItem.task_name} 
    <button class="js-completeTask-btn btn btn_fullWidth" data-id=${taskItem.id}>Complete Task</button>
<button class="js-deleteTask-btn btn btn_fullWidth" data-id=${taskItem.id}">Delete Task</button>
    </li>
    
    
    `);
    if (taskItem.completed === "true") {
      const funVariable = $(".appendedTasks").children().last();
      funVariable.addClass("completed");
    }
  }
}
