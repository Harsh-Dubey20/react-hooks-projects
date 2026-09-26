import { useState } from 'react';

const faqData = [
  {
    id: 1,
    question: 'React me useState Hook kya karta hai?',
    answer: 'useState ek React Hook hai jo functional components me state (data) ko declare aur manage karne ke kaam aata hai.',
  },
  {
    id: 2,
    question: 'Props aur State me kya difference hai?',
    answer: 'Props parent component se child component me read-only data pass karte hain, jabki State component ka apna internal mutable data hota hai.',
  },
  {
    id: 3,
    question: 'Vite fast kyu hai?',
    answer: 'Vite browser ke native ES Modules (ESM) ka use karta hai aur dev server start karne ke liye poora bundle pehle se build nahi karta, isliye ye super fast hota hai.',
  },
  {
    id: 4,
    question: 'useEffect Hook ka kab use karna chahiye?',
    answer: 'Data fetching, DOM manipulation, timers, aur event listeners jise side-effects kehte hain, unhe manage karne ke liye useEffect use hota hai.',
  },
];

function App() {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    // Agar click kiya hua item pehle se khula hai toh band kar do (null), nahi toh naya ID set karo
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>

        <div style={styles.accordionContainer}>
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} style={styles.accordionItem}>
                <button
                  style={styles.questionBtn}
                  onClick={() => toggleAccordion(item.id)}
                >
                  <span style={styles.questionText}>{item.question}</span>
                  <span style={styles.icon}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <div style={styles.answerBox}>{item.answer}</div>}
              </div>
            );
          })}
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
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '550px',
  },
  title: {
    color: '#f8fafc',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  accordionItem: {
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    border: '1px solid #334155',
    overflow: 'hidden',
  },
  questionBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#f8fafc',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
  },
  questionText: {
    flex: 1,
    paddingRight: '10px',
  },
  icon: {
    fontSize: '1.25rem',
    color: '#38bdf8',
    fontWeight: 'bold',
  },
  answerBox: {
    padding: '0 1.25rem 1.25rem 1.25rem',
    color: '#94a3b8',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    borderTop: '1px solid #1e293b',
    paddingTop: '0.75rem',
  },
};

export default App;