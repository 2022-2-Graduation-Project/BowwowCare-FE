import { createContext, useState, useContext, useCallback } from "react";
import { primaryTheme, secondaryTheme, thirdTheme } from "../theme/theme";
import { ThemeProvider as StyledProvider } from 'styled-components';

export const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const [ThemeMode, setThemeMode] = useState("primary");
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
