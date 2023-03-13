import { createContext, useState, useEffect, useRef } from "react";
import authHeader from "../services/auth-header";
import axios from "axios";
import { API_URL } from "../Config";

export const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const theme = ["primary", "secondary", "third"];
  const [myTheme, setMyTheme] = useState(0);
  const localTheme = window.localStorage.getItem("theme") || theme[0];
  const [ThemeMode, setThemeMode] = useState(localTheme);

  useEffect(() => {
    getUser();
  },[]);

  useEffect(() => {
    setThemeMode(theme[myTheme]);
  },[myTheme])

  const getUser = () => {
    axios({
      method: 'GET',
      url: `${API_URL}/user`,
      headers: authHeader(),
    })
    .then( (response) => {
      if(response.status === 200) {
      const user = response.data;
      setMyTheme(user.theme);
      }
    }
    ).catch((e) => {console.log(e.response.data)})
  }
  
  return (
    <div>
      <ThemeContext.Provider value={[ThemeMode, setThemeMode]}>
          {children}
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeProvider };
