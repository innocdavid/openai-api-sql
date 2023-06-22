import styles from './index.module.css';
import sqlLogo from './assets/sql-logo.png';
import { useState } from 'react';

function App() {
  const [queryDescription, setQueryDescription] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generatedQuery = await generateQuery();
    setSqlQuery(generatedQuery);
  }

  const generateQuery = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queryDescription })
      });
      
      if (response.status === 200) {
        const data = await response.json();
        return data.response.trim();
      } else {
        // process error response
        response.json()
          .then(data => {
            const errorMessage = data.error;
            setErrorMessage(errorMessage)
          })
          .catch(error => {
            console.error('Error parsing JSON:', error);
          });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className={styles.main}>
      <img src={sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL with AI</h3>

      <form onSubmit={handleSubmit}>
        <input 
          required
          type="text" 
          name="query-description"
          placeholder="Describe your query"
          onChange={(e) => setQueryDescription(e.target.value)}
        />

        <input 
          type="submit"
          value="Generate query" 
        />
        { sqlQuery && <p>{sqlQuery}</p> }
        { errorMessage && <p style={styleError}>{errorMessage}</p> }
      </form>
    </main>
  )
}
const styleError = {
  color: 'red',
}
export default App
