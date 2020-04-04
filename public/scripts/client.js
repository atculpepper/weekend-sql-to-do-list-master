$(document).ready(init);

function init() {
  console.log("The DOM is ready to roll");
  getTasks();

  //connecting event listeners to the DOM
  //   $("#add_task").on("click", clickAddTask);
  //   $("#complete_task").on("click", clickCompleteTask);
  //   $("#delete_task").on("click", clickDeleteTask);
}

//click event listeners
// function clickAddTask(event) {
//   console.log("You clicked to add a task");
// }

// function clickCompleteTask(event) {
//   console.log("You clicked to complete a task");
// }

// function clickDeleteTask(event) {
//   console.log("You clicked to complete a task");
// }

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
