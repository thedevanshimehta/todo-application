import express from 'express';
import cors from 'cors';
import db from './db.js'; // Database connection file

const app = express();

/*
  - cors(): allows requests from the frontend (React app)
  - express.json(): allows reading JSON data sent in request bodies
*/
app.use(cors());
app.use(express.json());



/*
  GET /tasks
  Fetches all tasks from the database
*/
app.get('/tasks', async (req, res) => {
    try {
        // Fetch tasks ordered by most recently created
        const [rows] = await db.query(
            'SELECT id, task_text AS tasks,status FROM tasks ORDER BY created_at DESC'
        );

        res.json(rows);  // Send tasks to frontend
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send('The server had trouble reaching the database.');
    }
});


/*
  POST /tasks
  Adds a new task to the database
*/
app.post('/tasks', async (req, res) => {
    const { id, tasks, status } = req.body; // Extract data from frontend
    try {
        // Prepared statement used to prevent SQL injection
        await db.query(
            'INSERT INTO tasks (id, task_text, status) VALUES (?, ?, ?)',
            [id, tasks, status]
        );
        res.status(201).json({ message: "Task successfully saved to MySQL!" });
    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).send(error.message);
    }
});


/*
  DELETE /tasks/:id
  Deletes a task using its unique ID
*/
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    try {
        await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting task');
    }
});


/*
  PUT /tasks/:id
  Updates task text and/or status
  IFNULL ensures existing values remain unchanged if not provided
*/
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { tasks, status } = req.body;

    // Update the row where ID matches.
    // If tasks is empty, keep the old one. If status is empty, keep the old one.
    await db.query(
        'UPDATE tasks SET task_text = IFNULL(?, task_text), status = IFNULL(?, status) WHERE id = ?',
        [tasks, status, id]
    );
    res.json({ message: "Update successful!" });
});

// Start the backend server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is awake at http://localhost:${PORT}`);
});