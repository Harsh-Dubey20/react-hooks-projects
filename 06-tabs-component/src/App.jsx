import { useState } from 'react';

const tabsData = [
  {
    id: 'overview',
    label: 'Overview',
    content: 'React ek popular JavaScript library hai user interfaces (UI) build karne ke liye. Ye component-based architecture follow karta hai.',
  },
  {
    id: 'features',
    label: 'Features',
    content: 'React ke main features hain: Virtual DOM, Component-Based Structure, Declarative Syntax, aur Rich Ecosystem.',
  },
  {
    id: 'hooks',
    label: 'Hooks',
    content: 'Hooks (jaise useState, useEffect, useContext) functional components me state aur lifecycle methods use karne ki permission dete hain.',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const currentTabContent = tabsData.find((tab) => tab.id === activeTab);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>React Concepts Tabs</h1>

        {/* Tab Headers */}
        <div style={styles.tabHeaderContainer}>
          {tabsData.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tabButton,
                  backgroundColor: isActive ? '#3b82f6' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  borderColor: isActive ? '#3b82f6' : '#334155',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div style={styles.contentBox}>
          <p style={styles.contentText}>{currentTabContent?.content}</p>
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
  tabHeaderContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1.5rem',
  },
  tabButton: {
    flex: 1,
    padding: '0.75rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    borderRadius: '8px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  contentBox: {
    backgroundColor: '#0f172a',
    padding: '1.25rem',
    borderRadius: '10px',
    border: '1px solid #334155',
    minHeight: '100px',
  },
  contentText: {
    color: '#f8fafc',
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: 0,
  },
};

export default App;