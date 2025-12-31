import { useState } from 'react';
import { Check, Trash2, Edit2, Save } from 'lucide-react';

/*
  Represents a single task item
*/
export function ToDoList({ tasks, status, id, statusMarked, statusUnmarked,statusDeleted, taskEdit }) {
  const [edit, setEdit] = useState(false);
  const [string, setString] = useState(tasks);

  function markTask() {
    statusMarked(id);
  }

  function unmarkTask(){
    statusUnmarked(id);
  }

  function deleteTask() {
    statusDeleted(id);
  }

  function editTask() {
    setEdit(true);
  }

  function saveTask() {
    taskEdit(id, string);
    setEdit(false);
  }

  return (
    <div className={`task-item ${status === "Complete" ? "completed" : ""}`}>
      <div className="task-content">
        {status === "Incomplete" ? (
          edit === true ? (
            <input
              type="text"
              value={string}
              onChange={(e) => setString(e.target.value)}
              className="task-edit-input"
            />
          ) : (
            <span className="task-text">{tasks}</span>
          )
        ) : (
          <span className="task-text completed">{tasks}</span>
        )}
      </div>

      <div className="task-actions">
        {status === "Incomplete" && (
          <button
            className="btn-icon btn-check"
            onClick={markTask}
            title="Mark as Completed"
          >
            <Check className="icon-sm" />
          </button>
        )}
         {status === "Complete" && (
          <button
            className="btn-icon btn-check"
            onClick={unmarkTask}
            title="Unmark a task"
          >
            <Check className="icon-sm" />
          </button>
        )}

        {status === "Incomplete" && (
          edit === false ? (
            <button
              className="btn-icon btn-edit"
              onClick={editTask}
              title="Edit"
            >
              <Edit2 className="icon-sm" />
            </button>
          ) : (
            <button
              className="btn-icon btn-edit"
              onClick={saveTask}
              title="Save"
            >
              <Save className="icon-sm" />
            </button>
          )
        )}

        <button
          className="btn-icon btn-delete"
          onClick={deleteTask}
          title="Delete"
        >
          <Trash2 className="icon-sm" />
        </button>
      </div>
    </div>
  );
}
