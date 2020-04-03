# Full Stack To Do List

## Description

_Duration: 2 Week Sprint_

This project is intended to serve up a functional "To Do" list application to help keep track of tasks. The client requested these specs:

- Create a front end experience that allows a user to create a Task.
- When the Task is created, it should be stored inside of a database (SQL)
- Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
- Each Task should have an option to 'Complete' or 'Delete'.
- When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
- Whether or not a Task is complete should also be stored in the database.
- Deleting a Task should remove it both from the front end as well as the Database.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
  Node Dependencies: Express, jQuery, Body-parser

## Installation

1. Create a database named `weekend-to-do-app`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
