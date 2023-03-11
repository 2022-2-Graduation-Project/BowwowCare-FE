import { createContext, useState } from "react";

export const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const localTheme = window.localStorage.getItem("theme") || "primary"
  const [ThemeMode, setThemeMode] = useState(localTheme);
  
  return (
    <div>
      <ThemeContext.Provider value={[ThemeMode, setThemeMode]}>
          {children}
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeProvider };
