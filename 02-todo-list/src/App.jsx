import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Task add karne ke liye
  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  // Task complete / incomplete mark karne ke liye
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Task delete karne ke liye
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Master</h1>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.addBtn}>
            Add
          </button>
        </form>

        <ul style={styles.list}>
          {todos.length === 0 ? (
            <p style={styles.emptyText}>No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} style={styles.listItem}>
                <span
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#64748b' : '#f8fafc',
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={styles.deleteBtn}
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '20px',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '450px',
  },
  title: {
    color: '#f8fafc',
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
  },
  addBtn: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '8px',
    border: '1px solid #334155',
  },
  todoText: {
    cursor: 'pointer',
    fontSize: '1rem',
    flex: 1,
    userSelect: 'none',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: 'none',
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '0 5px',
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
};

export default App;