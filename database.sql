CREATE TABLE "tasks"
(
    "id" serial PRIMARY KEY,
    "task-name" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN
);

INSERT INTO "tasks"
    ("task-name", "completed")
VALUES
    ( 'Weekend Code Challenge', 'false');
INSERT INTO "tasks"
    ("task-name", "completed")
VALUES
    ( 'Dishes', 'false');
INSERT INTO "tasks"
    ("task-name", "completed")
VALUES
    ( 'Make Dinner', 'false');
INSERT INTO "tasks"
    ("task-name", "completed")
VALUES
    ( 'Outdoor Run', 'false');


ALTER TABLE "tasks" ALTER COLUMN "completed"
SET
DEFAULT FALSE;