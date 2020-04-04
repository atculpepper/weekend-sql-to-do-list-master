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

// POST ROUTE for saving a task
router.post("/", (req, res) => {
  const dataFromDom = req.body;
  const queryText = `INSERT INTO "tasks" ("task_name", "completed")
  VALUES ($1, $2);`;

  pool
    .query(queryText, [dataFromDom.task_name, dataFromDom.completed])
    .then((responseDb) => {
      console.log(responseDb);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error:", err);
      res.sendStatus(500);
    });
});

//delete route for deleting a task

router.delete("/:id", (req, res) => {
  const taskID = req.params.id;
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
