import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState({ text: '', priority: 'normal', dueDate: '' });

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false, priority: 'normal', dueDate: '' }]);
      setNewTask('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const startEdit = (index, taskText, priority, dueDate) => {
    setEditingIndex(index);
    setEditedTask({ text: taskText, priority, dueDate });
  };

  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, ...editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask({ text: '', priority: 'normal', dueDate: '' });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      default:
        return 'priority-normal';
    }
  };

  const calculateProgress = () => {
    if (!tasks.length) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  return (
    <div id="app">
      <h1>Todo Application</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <div className="progress-bar">
        <div style={{ width: `${calculateProgress()}%` }}>{Math.round(calculateProgress())}%</div>
      </div>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={`todo-item ${getPriorityClass(task.priority)}`}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask.text}
                  onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                />
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                >
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text} {task.dueDate && ` - Due: ${task.dueDate}`}
                </span>
                <div>
                  <button onClick={() => startEdit(index, task.text, task.priority, task.dueDate)}>Edit</button>
                  <button onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
