import { useState,useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ToDoForm } from './ToDoForm';
import { TaskLists } from './TaskLists';
import './App.css';



function App() {
   // Stores all tasks fetched from backend
  const [taskLists, setTaskLists] = useState([]);
  
  /*
    Fetch tasks once when the app loads
  */
useEffect(() => {
  
    fetch('http://localhost:5000/tasks')
      
        .then((response) => response.json())

        .then((data) => {
            setTaskLists(data); // Update state with tasks 
        })
        .catch((error) => console.error("Error loading tasks:", error));

}, []); // Runs only once when the site opens"

 // Theme state stored in localStorage
const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'theme-blue');
const [darkTheme, setDarktheme] = useState(localStorage.getItem('dark-mode') === 'true');

  // Save selected theme
useEffect(() => {
    localStorage.setItem('app-theme', theme);
}, [theme]);


// Save dark/light mode preference
useEffect(() => {
    localStorage.setItem('dark-mode', darkTheme);
}, [darkTheme]);

 /*
    Marks a task as completed
  */
 async function statusMarked(id) {
      try{
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Complete' })
        });
        if(response.ok){
            const newArray = taskLists.map((taskList) => {
              if (taskList.id === id) {
                return {
                  ...taskList,
                  status: "Complete"
                };
              }
              return taskList
            });
            setTaskLists(newArray);
       }
    }
  catch(error){
    alert("Could not update from database.");
  }
  }

 /*
    Marks a task as incomplete
  */
 async function statusUnmarked(id){
    try{
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Incomplete' })
        });
        if(response.ok){
               const newArray = taskLists.map((taskList) => {
      if (taskList.id === id) {
        return {
          ...taskList,
          status: "Incomplete"
        };
      }
        return taskList
  });
    setTaskLists(newArray);
       }
    }
  catch(error){
    alert("Could not update from database.");
  }
    
  }

  /*
    Deletes a task
  */
 async function statusDeleted(id) {
    try{
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        });
        if(response.ok){
         const newArray = taskLists.filter((taskList) => (taskList.id !== id));
            setTaskLists(newArray);
        }
    }
  catch(error){
    alert("Could not delete from database.");
  }
}


  /*
    Edits task text
  */
 async function taskEdit(id,newInputText) {
        try{
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasks: newInputText })
        });
        if(response.ok){
    const newArray = taskLists.map((taskList) => {
      if (taskList.id === id) {
        return {
          ...taskList,
          tasks: newInputText
        };
      }
         return taskList
      });
    setTaskLists(newArray);
       }
    }
  catch(error){
    alert("Could not update from database.");
  }
}

  return (
    <div 
      className={`app-container ${theme}`}
      data-theme={darkTheme ? 'dark' : 'light'}
    >
      <div className="app-content">
        <div className="app-header">
          <h1 className="app-title">Task Manager</h1>
          <p className="app-subtitle">Organize your day with elegance</p>
          {/* Theme & Dark mode controls */}
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--glass-bg)',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              <option value="theme-blue">Blue Theme</option>
              <option value="theme-green">Green Theme</option>
              <option value="theme-slate">Slate Theme</option>
            </select>

            <button
              onClick={() => setDarktheme(!darkTheme)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--glass-bg)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {darkTheme ? <Sun size={20} /> : <Moon size={20} />}
              {darkTheme ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
         
         
        {/* Task input form */}
        <ToDoForm taskLists={taskLists} setTaskLists={setTaskLists} />
        {/* Task list display */}
        <TaskLists
          taskLists={taskLists}
          statusMarked={statusMarked}
          statusUnmarked={statusUnmarked}
          statusDeleted={statusDeleted}
          taskEdit={taskEdit}
        />
      </div>
    </div>
  );
}

export default App;
