const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//get route for the tasks--don't need to say /todo because this file is required in and server.js identifies /todo as the route
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "tasks"`;
  pool
    .query(queryText)
    .then((responseDB) => {
      const dbRows = responseDB.rows;
      console.table(dbRows);
      res.send(dbRows);
    })
    .catch((err) => {
      console.log("error:", err);
      res.sendStatus(500);
    });
});

//PUT ROUTE FOR UPDATING

router.put("/:id", (req, res) => {
  const taskID = req.params.id;
  //this creates id as a new param, so when we test this PUT we need to add the id number to the URL

  const queryText = `UPDATE "tasks" SET "completed"= 'true' WHERE "id" = '${taskID}';
  `;
  pool
    .query(queryText, [req.body.task, req.body.completed, taskID])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      t;
      res.sendStatus(500);
    });
});

//POST ROUTE
router.post("/", (req, res) => {
  const queryText = `INSERT INTO "tasks" ("task_name") VALUES ($1);`;

  pool
    .query(queryText, [req.body.task])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      t;
      res.sendStatus(500);
    });
});

//delete route for deleting a task

router.delete("/:id", (req, res) => {
  const taskID = req.params.id;
  //this will log to the terminal since we are server side
  console.log("you are deleting: " + taskID);
  const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;

  pool
    .query(queryText, [taskID])
    .then((responseDb) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error deleting task:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
