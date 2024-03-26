import { useState, useEffect } from "react";
import { ThemeProvider } from "./Contexts/Theme";
import ThemeBtn from "./Components/ThemeBtn";
import Card from "./Components/Card";

function App() {
  const [themeMode, setthememode] = useState("light");

  const lighttheme = () => {
    setthememode("light");
  };
  const darktheme = () => {
    setthememode("dark");
  };

  // Actual change in theme
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lighttheme, darktheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;


// Add DarkMode property and class value in tailwind config  file to make it work properly
