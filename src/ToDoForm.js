import { useState } from 'react';
import { Plus } from 'lucide-react';




export function ToDoForm({ taskLists, setTaskLists }) {
  const [inputText, setInputText] = useState('');

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      clickInput();
    }
  }

  function setNewInput(event) {
    setInputText(event.target.value);
  }

  function clickInput() {
    const newTask = [
      ...taskLists,
      {
        tasks: inputText,
        status: "Incomplete",
        id: crypto.randomUUID()
      }
    ];
    if (inputText !== "" && inputText !== " ") {
      setTaskLists(newTask);
    }
    setInputText('');
  }

  return (
    <div className="glass-container">
      <div className="glass-content">
        <form className="form-container" onSubmit={(e) => { e.preventDefault(); clickInput(); }}>
          <input
            className="form-input"
            type="text"
            value={inputText}
            placeholder="Add a new task..."
            onChange={setNewInput}
            onKeyDown={handleKeyDown}
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
