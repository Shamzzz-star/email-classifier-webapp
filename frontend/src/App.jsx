import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";
import './index.css';


function App() {
  const [model, setModel] = useState("");
  const [inputText, setInputText] = useState("");
  const [probability, setProbability] = useState(0);
  const [loading, setLoading] = useState(false);

  const models = ["Logistic Regression", "Naive Bayes", "Decision Tree", "SVC"];

  const handleClassify = async () => {
    if (!model || !inputText) {
      alert("Please select a model and enter text.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, text: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setProbability(data.spam_probability.toFixed(2));
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const getCircleColor = (value) => {
    // if (value <= 40) return "#10b981"; // Green for Ham
    // if (value <= 70) return "#facc15"; // Yellow for Uncertain
    return "#ef4444"; // Red for Spam
  };

  const getLabel = (value) => {
    if (value <= 40) return "Ham";
    if (value <= 70) return "Uncertain";
    return "SPAM";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 ">Email Spam Detector</h1>

        <textarea
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          rows="10"
          placeholder="Enter email text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <select
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="">Select a model</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button
          onClick={handleClassify}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Classifying..." : "Classify"}
        </button>

        {probability > 0 && (
          <div className="flex flex-col items-center mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Prediction</h2>
            <p className="text-lg text-gray-600 font-bold text-center">This email is likely:</p>
            <div className="progress-circle-container">
  <div className="progress-circle font-bold">
    <CircularProgressbar
      value={probability}
      text={`${getLabel(probability)}`}
      styles={buildStyles({
        textSize: "15px",
        color: "#000000",
        pathColor: getCircleColor(probability),
        textColor: "#000000",
        
      })}
    />
  </div>
</div>
            <p className="text-lg text-gray-800 font-bold text-center">Spam Probability</p>
            <p className="mt-4 text-lg font-bold text-gray-800 text-center">{probability}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;