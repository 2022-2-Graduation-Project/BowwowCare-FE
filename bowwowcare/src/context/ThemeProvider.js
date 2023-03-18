import { createContext, useState, useEffect } from "react";
import userService from "../services/user.service";
import { isLogin } from "../utils/Status";

export const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const theme = ["primary", "secondary", "third"];
  const [myTheme, setMyTheme] = useState(0);
  const [ThemeMode, setThemeMode] = useState(theme[0]);

  
  useEffect(() => {
    if(isLogin()){
      userService.getUserBoard().then((response) => {
        if(response.status === 200) {
          const user = response.data;
          setMyTheme(user.theme);
        }
      }
      ).catch((e) => {console.log(e.response.data)})
    }
  },[]);

  useEffect(() => {
    setThemeMode(theme[myTheme]);
  },[myTheme])
  
  return (
    <div>
      <ThemeContext.Provider value={[ThemeMode, setThemeMode]}>
          {children}
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeProvider };
