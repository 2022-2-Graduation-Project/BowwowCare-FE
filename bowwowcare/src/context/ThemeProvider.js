import { createContext, useState } from "react";
import { primaryTheme, secondaryTheme, thirdTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from 'styled-components';

export const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const localTheme = window.localStorage.getItem("theme") || "primary"
  const [ThemeMode, setThemeMode] = useState(localTheme);
  const themeObject = ThemeMode === "primary" ? primaryTheme : ThemeMode === "secondary" ? secondaryTheme : thirdTheme;

  return (
    <div>
      <ThemeContext.Provider value={[ThemeMode, setThemeMode]}>
        <StyledProvider theme={themeObject}>
          {children}
        </StyledProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeProvider };
