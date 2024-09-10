import React, { useState } from "react";
import axios from "axios";

const LanguageDetector = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectLanguage = async () => {
    if (!text) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/detect", {
        text,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error detecting language:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-4">Language Detector</h2>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to detect language..."
      />
      <button
        onClick={detectLanguage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Detecting..." : "Detect Language"}
      </button>

      {result && (
        <div className="mt-4">
          <p>
            <strong>Language:</strong> {result.language}
          </p>
          <p>
            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default LanguageDetector;
