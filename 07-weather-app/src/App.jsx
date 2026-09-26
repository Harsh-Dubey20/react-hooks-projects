import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      // 1. Geocoding API: City name se latitude aur longitude nikalne ke liye
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please try another name.');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Weather API: Lat/Long ka use karke actual temperature fetch karne ke liye
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        cityName: name,
        country: country,
        temp: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Weather App</h1>

        <form onSubmit={fetchWeather} style={styles.form}>
          <input
            type="text"
            placeholder="Enter city name (e.g. Patna, Delhi)..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Search
          </button>
        </form>

        {loading && <p style={styles.infoText}>Fetching weather data...</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        {weather && (
          <div style={styles.weatherBox}>
            <h2 style={styles.cityName}>
              {weather.cityName}, <span style={styles.country}>{weather.country}</span>
            </h2>
            <div style={styles.tempDisplay}>{weather.temp}°C</div>
            <div style={styles.details}>
              <div>💨 Wind Speed: {weather.windspeed} km/h</div>
            </div>
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
    maxWidth: '450px',
    textAlign: 'center',
  },
  title: {
    color: '#f8fafc',
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
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
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  weatherBox: {
    backgroundColor: '#0f172a',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid #334155',
    marginTop: '1rem',
  },
  cityName: {
    color: '#f8fafc',
    fontSize: '1.25rem',
    margin: '0 0 0.5rem 0',
  },
  country: {
    color: '#94a3b8',
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  tempDisplay: {
    color: '#38bdf8',
    fontSize: '3.5rem',
    fontWeight: '800',
    margin: '0.5rem 0',
  },
  details: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    marginTop: '0.5rem',
  },
  infoText: {
    color: '#38bdf8',
    marginTop: '1rem',
  },
  errorText: {
    color: '#ef4444',
    marginTop: '1rem',
  },
};

export default App;