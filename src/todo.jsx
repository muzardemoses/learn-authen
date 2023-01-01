import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // for generating unique IDs for each todo item

const TodoPage = () => {
  const [todos, setTodos] = useState([]); // state to store the todo items
  const [newTodo, setNewTodo] = useState(''); // state to store the value of the new todo input field

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from reloading the page
    if (!newTodo) return; // return early if the new todo is an empty string
    setTodos([...todos, { id: uuidv4(), name: newTodo, isCompleted: false }]); // add the new todo to the list of todos
    setNewTodo(''); // reset the value of the new todo input field
  }

  const toggleTodo = (id) => {
    // update the isCompleted value of the todo with the specified id
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  }

  const deleteTodo = (id) => {
    // remove the todo with the specified id from the list of todos
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const deleteCompletedTodos = () => {
    // remove all the completed todos from the list of todos
    setTodos(todos.filter((todo) => !todo.isCompleted));
    }

    const remainingTodos = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <div className="container mx-auto max-w-sm">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={handleChange}
        />
      </form>
      <ul className="mt-6">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center my-2">
            <input
              type="checkbox"
              className="form-checkbox h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              className={`ml-4 ${todo.isCompleted ? 'line-through text-gray-600' : 'text-gray-700'}`}
            >
              {todo.name}
            </span>
            <button
              className="ml-auto text-sm font-bold text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
            </li>
        ))}
        </ul>
        <div className="flex justify-between items-center mt-6">
            <span className="text-gray-700">{remainingTodos} item(s) left</span>
            <button
                className="text-sm font-bold text-red-500 hover:text-red-700"
                onClick={deleteCompletedTodos}
            >
                Delete Completed
            </button>
         </div>   
       </div>
    );
}

export default TodoPage;
