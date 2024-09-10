import React from "react";
import LanguageDetector from "./components/LanguageDetector";
import Footer from "./components/Footer"; // Import Footer component

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        <LanguageDetector />
      </div>
      <Footer /> {/* Add Footer component at the bottom */}
    </div>
  );
}

export default App;
