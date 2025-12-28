import { useState } from 'react';
import { ToDoForm } from './ToDoForm';
import { TaskLists } from './TaskLists';
import './App.css';



function App() {
  const [taskLists, setTaskLists] = useState([]);

  function statusMarked(id) {
    const newArray = taskLists.map((taskList) => {
      if (taskList.id === id) {
        return {
          ...taskList,
          status: "Complete"
        };
      }
      return taskList;
    });
    setTaskLists(newArray);
  }

  function statusDeleted(id) {
    const newArray = taskLists.filter((taskList) => (taskList.id !== id));
    setTaskLists(newArray);
  }

  function taskEdit(id,newInputText) {
    const newArray = taskLists.map((taskList) => {
      if (taskList.id === id) {
        return {
          ...taskList,
          tasks: newInputText
        };
      }
      return taskList;
    });
    setTaskLists(newArray);
  }

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-header">
          <h1 className="app-title">Task Manager</h1>
          <p className="app-subtitle">Organize your day with elegance</p>
        </div>

        <ToDoForm taskLists={taskLists} setTaskLists={setTaskLists} />
        <TaskLists
          taskLists={taskLists}
          statusMarked={statusMarked}
          statusDeleted={statusDeleted}
          taskEdit={taskEdit}
        />
      </div>
    </div>
  );
}

export default App;
