import React, { useState } from "react";

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

  const getBarColor = (value) => {
    if (value <= 40) return "linear-gradient(to right, #10b981, #6ee7b7)"; // green gradient
    if (value <= 70) return "linear-gradient(to right, #facc15, #fde68a)"; // yellow gradient
    return "linear-gradient(to right, #ef4444, #fca5a5)"; // red gradient
  };
  
  const getLabel = (value) => {
    if (value <= 40) return "Ham";
    if (value <= 70) return "Uncertain";
    return "Spam";
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#001f3f] p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Email Classifier</h1>

       

        <textarea
          className="w-full mb-4 p-2 rounded-md bg-gray-700 text-white"
          rows="5"
          placeholder="Enter email text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
 <select
          className="w-full mb-4 p-2 rounded-md bg-gray-700 text-white"
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
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md mb-4 transition"
        >
          {loading ? "Classifying..." : "Classify"}
        </button>

        {probability > 0 && (
  <div className="space-y-3 mt-6">
    <div className="text-center font-semibold text-white text-lg">
      {getLabel(probability)}
    </div>
    <div className="w-full bg-gray-500 rounded-full h-4 overflow-hidden">
      <div
        className="h-4 transition-all duration-500"
        style={{
          width: `${probability}%`,
          background: getBarColor(probability),
        }}
      ></div>
    </div>
    <div className="text-center font-bold text-white">{probability}%</div>
  </div>
)}

    </div>
  </div>
  );
}
  


export default App;
