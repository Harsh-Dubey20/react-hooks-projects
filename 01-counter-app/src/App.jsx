import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Counter App</h1>
        <div style={styles.counterValue}>{count}</div>

        <div style={styles.buttonGroup}>
          <button style={{ ...styles.button, ...styles.decrementBtn }} onClick={decrement}>
            - Decrement
          </button>
          <button style={{ ...styles.button, ...styles.resetBtn }} onClick={reset}>
            Reset
          </button>
          <button style={{ ...styles.button, ...styles.incrementBtn }} onClick={increment}>
            + Increment
          </button>
        </div>
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
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '2.5rem 3rem',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    border: '1px solid #334155',
    minWidth: '320px',
  },
  title: {
    color: '#94a3b8',
    fontSize: '1.25rem',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  counterValue: {
    color: '#f8fafc',
    fontSize: '4.5rem',
    fontWeight: '800',
    margin: '1rem 0 2rem 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  button: {
    padding: '0.75rem 1.25rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, opacity 0.2s ease',
  },
  decrementBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
  },
  resetBtn: {
    backgroundColor: '#64748b',
    color: '#ffffff',
  },
  incrementBtn: {
    backgroundColor: '#10b981',
    color: '#ffffff',
  },
};

export default App;