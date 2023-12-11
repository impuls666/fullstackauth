import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`px-4 py-2 rounded-full ${
        darkMode ? "bg-yellow-400" : "bg-gray-800"
      } ${
        darkMode ? "text-gray-900" : "text-white"
      } transition-colors duration-200`}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeSwitcher;
