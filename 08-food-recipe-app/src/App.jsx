import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSelectedRecipe(null);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (!data.meals) {
        throw new Error('No recipes found. Try searching for something else!');
      }

      setRecipes(data.meals);
    } catch (err) {
      setError(err.message || 'Failed to fetch recipes.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🍳 Food Recipe Finder</h1>

        {/* Search Bar */}
        <form onSubmit={searchRecipes} style={styles.form}>
          <input
            type="text"
            placeholder="Search dish or ingredient (e.g., Chicken, Pasta, Cake)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Search
          </button>
        </form>

        {loading && <p style={styles.infoText}>Searching delicious recipes...</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        {/* Recipe Details Modal/View */}
        {selectedRecipe && (
          <div style={styles.detailCard}>
            <button style={styles.closeBtn} onClick={() => setSelectedRecipe(null)}>
              ✕ Close
            </button>
            <h2 style={styles.recipeTitle}>{selectedRecipe.strMeal}</h2>
            <p style={styles.badge}>Category: {selectedRecipe.strCategory} | Origin: {selectedRecipe.strArea}</p>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} style={styles.detailImage} />
            <h3 style={styles.subHeading}>Instructions:</h3>
            <p style={styles.instructions}>{selectedRecipe.strInstructions}</p>
          </div>
        )}

        {/* Recipe Grid */}
        {!selectedRecipe && (
          <div style={styles.grid}>
            {recipes.map((meal) => (
              <div
                key={meal.idMeal}
                style={styles.recipeCard}
                onClick={() => setSelectedRecipe(meal)}
              >
                <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.cardImage} />
                <div style={styles.cardContent}>
                  <h3 style={styles.mealTitle}>{meal.strMeal}</h3>
                  <span style={styles.categoryTag}>{meal.strCategory}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    fontFamily: 'Inter, system-ui, sans-serif',
    padding: '30px 20px',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '750px',
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
  button: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '1.5rem',
  },
  recipeCard: {
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    border: '1px solid #334155',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  cardImage: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '12px',
  },
  mealTitle: {
    color: '#f8fafc',
    fontSize: '1rem',
    margin: '0 0 6px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  categoryTag: {
    color: '#38bdf8',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  detailCard: {
    backgroundColor: '#0f172a',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #334155',
    marginTop: '1rem',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  recipeTitle: {
    color: '#f8fafc',
    fontSize: '1.5rem',
    margin: '0 0 4px 0',
  },
  badge: {
    color: '#94a3b8',
    fontSize: '0.85rem',
    marginBottom: '1rem',
  },
  detailImage: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  subHeading: {
    color: '#38bdf8',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
  instructions: {
    color: '#cbd5e1',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  infoText: {
    color: '#38bdf8',
    textAlign: 'center',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
  },
};

export default App;