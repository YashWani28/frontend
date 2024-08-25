import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post('https://bajajchallengebackend.onrender.com/bfhl', parsedData);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON format or error in API call');
    }
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const getFormattedResponse = () => {
    if (!response) return '';

    let formattedResponse = '';

    if (selectedOptions.includes('alphabets') && response.alphabets) {
      formattedResponse += `Alphabets: ${response.alphabets.join(', ')}`;
    }

    if (selectedOptions.includes('numbers') && response.numbers) {
      if (formattedResponse) formattedResponse += '\n';
      formattedResponse += `Numbers: ${response.numbers.join(', ')}`;
    }

    if (
      selectedOptions.includes('highest_lowercase_alphabet') &&
      response.highest_lowercase_alphabet
    ) {
      if (formattedResponse) formattedResponse += '\n';
      formattedResponse += `Highest Lowercase Alphabet: ${response.highest_lowercase_alphabet.join(
        ', '
      )}`;
    }

    return formattedResponse;
  };

  return (
    <div className="App">
      <h1>BFHL Backend Challenge</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jsonInput">API Input</label>
        <textarea
          id="jsonInput"
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder='Enter JSON here'
          className="json-input"
        ></textarea>
        <button type='submit' className="submit-button">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <label htmlFor="multiFilter">Multi Filter</label>
          <div className="checkbox-group">
            <label>
              <input
                type='checkbox'
                value='alphabets'
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type='checkbox'
                value='numbers'
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type='checkbox'
                value='highest_lowercase_alphabet'
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>
          <div className="response">
            <h2>Filtered Response</h2>
            <pre>{getFormattedResponse()}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
