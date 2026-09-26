import { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  // Stats Calculations
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const spaceCount = (text.match(/ /g) || []).length;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Character & Word Counter</h1>
        
        {/* Stats Grid */}
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <span style={styles.statNumber}>{charCount}</span>
            <span style={styles.statLabel}>Characters</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNumber}>{wordCount}</span>
            <span style={styles.statLabel}>Words</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNumber}>{sentenceCount}</span>
            <span style={styles.statLabel}>Sentences</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNumber}>{spaceCount}</span>
            <span style={styles.statLabel}>Spaces</span>
          </div>
        </div>

        {/* Text Input Area */}
        <textarea
          style={styles.textarea}
          rows="8"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button style={styles.clearBtn} onClick={() => setText('')}>
          Clear Text
        </button>
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
    maxWidth: '600px',
  },
  title: {
    color: '#f8fafc',
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '1.5rem',
  },
  statBox: {
    backgroundColor: '#0f172a',
    padding: '1rem 0.5rem',
    borderRadius: '10px',
    textAlign: 'center',
    border: '1px solid #334155',
  },
  statNumber: {
    display: 'block',
    color: '#3b82f6',
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '4px',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  clearBtn: {
    marginTop: '1rem',
    width: '100%',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default App;