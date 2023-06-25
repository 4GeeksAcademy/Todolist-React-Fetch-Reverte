import React, { useState } from 'react';

const TodoList = () => {
	const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [hoveredTask, setHoveredTask] = useState(null);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmedTodo = newTodo.trim();
      if (trimmedTodo.length > 0) {
        const newTodoItem = { id: Date.now(), text: trimmedTodo };
        const updatedTodos = todos.concat(newTodoItem);
        setTodos(updatedTodos);
        setNewTodo('');
      }
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className='text-center'>
      <h1 className='header1'>DEBS' TO DO LIST</h1>
      <div className='container fluid border border-subtle'>
        <input type="text" value={newTodo} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="What needs to be done?"/>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`container border border-subtle ${
                  hoveredTask === todo.id ? 'hovered' : ''
                }`}
                onMouseEnter={() => setHoveredTask(todo.id)}
                onMouseLeave={() => setHoveredTask(null)}
              >
                {todo.text}
                {hoveredTask === todo.id && (
                  <button
                    className='deleteTask' onClick={() => handleDelete(todo.id)}>x
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks, add a task</p>
        )}
        <div className='container fluid border border-subtle d-flex' id='integer'>
          <footer>{todos.length > 0 ? todos.length + " items left" : ""}</footer>
        </div>
      </div>
    </div>
  );
};

export default TodoList;