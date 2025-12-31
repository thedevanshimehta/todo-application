import { useState} from 'react';
import { Plus } from 'lucide-react';

/*
  Handles adding a new task
*/
export function ToDoForm({ taskLists, setTaskLists }) {
  const [inputText, setInputText] = useState('');
  const [error,setError]=useState(false);


// Updates input value and clears error if valid
  function setNewInput(event) {
    setInputText(event.target.value);
     if (error && event.target.value.trim() !== '') {
      setError(false);
    }
  }

  /*
    Validates input and sends task to backend
  */
 async function clickInput() {
    if(inputText.trim()==="" || inputText.length>100){
    setError(true);

    }
  else{
 const newTask =
    {
        id: crypto.randomUUID(),
      tasks: inputText,
      status: "Incomplete"
    };
  try {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });

        if (response.ok) {
            // Success! Now update the screen
            setTaskLists(prev => [...prev, newTask]);
            setInputText('');
        }
    } catch (error) {
        console.error("Failed to save:", error);
        alert("Could not save to database.");
    }

  }
}

  return (
    <div className="glass-container">
      <div className="glass-content">
        <form className="form-container" onSubmit={(e) => { e.preventDefault(); clickInput(); }}>
        <input
          className={`form-input ${error ? 'invalid-input' : ''}`}
          type="text"
          value={inputText}
         placeholder="Add a new task..."
          onChange={setNewInput}
        
        />
          <button type="button" className="btn-primary" onClick={clickInput}>
            <Plus className="icon-sm" />
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
