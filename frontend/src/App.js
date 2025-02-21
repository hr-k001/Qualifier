import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const API_URL = "http://localhost:5000/bfhl";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput.trim());

      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format: 'data' should be an array");
      }

      const res = await axios.post(API_URL, parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON format! Please check the syntax.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{`22BCS10753`}</h1> {/* Change this to your roll number */}
      <textarea
        rows="4"
        cols="50"
        placeholder='Enter JSON e.g. { "data": ["A", "1", "B", "3"] }'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <>
          <h3>Select Data to View:</h3>
          <Select isMulti options={options} onChange={setSelectedOptions} />
          <div>
            {selectedOptions.map((option) => (
              <p key={option.value}>
                <b>{option.label}:</b> {JSON.stringify(response[option.value])}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
