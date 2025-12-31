import { ToDoList } from "./ToDoList";

/*
  Displays the list of tasks or an empty state message
*/
export function TaskLists({ taskLists, statusMarked, statusUnmarked, statusDeleted, taskEdit }) {
  return (
    <div className="glass-container">
      <div className="glass-content">
        <h2 className="list-title">My To-Do List</h2>
        {taskLists.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state-text">No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="tasks-list">
            {taskLists.map((taskList) => {
              return (
                <ToDoList
                  tasks={taskList.tasks}
                  status={taskList.status}
                  id={taskList.id}
                  key={taskList.id}
                  statusMarked={statusMarked}
                  statusUnmarked={statusUnmarked}
                  statusDeleted={statusDeleted}
                  taskEdit={taskEdit}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
