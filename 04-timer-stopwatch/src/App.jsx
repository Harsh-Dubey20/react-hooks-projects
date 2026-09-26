import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format milliseconds into MM:SS:MS
  const formatTime = (timeInMs) => {
    const minutes = Math.floor((timeInMs / 60000) % 60);
    const seconds = Math.floor((timeInMs / 1000) % 60);
    const milliseconds = Math.floor((timeInMs / 10) % 100);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Stopwatch</h1>
        
        <div style={styles.timerDisplay}>{formatTime(time)}</div>

        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, backgroundColor: isRunning ? '#f59e0b' : '#10b981' }}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button
            style={{ ...styles.button, backgroundColor: '#ef4444' }}
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
          >
            Reset
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
    padding: '20px',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '2.5rem 3rem',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    border: '1px solid #334155',
    textAlign: 'center',
    minWidth: '340px',
  },
  title: {
    color: '#94a3b8',
    fontSize: '1.25rem',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  timerDisplay: {
    color: '#38bdf8',
    fontSize: '3.5rem',
    fontWeight: '800',
    fontFamily: 'monospace',
    margin: '1.5rem 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    minWidth: '100px',
  },
};

export default App;