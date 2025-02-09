// src/components/LandingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Manage your Tasks 
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-xl">
      "Manage yourself and your team with  <span className=" font-bold text-blue-500">Done Hai</span> ."
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
