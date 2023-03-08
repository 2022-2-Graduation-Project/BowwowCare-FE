import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider.js';

function ThemeSwitcher() {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const switchPrimary = () => {
    setThemeMode("primary");
    window.localStorage.setItem('theme', 'primary');
  }

  const switchSecondary = () => {
    setThemeMode("secondary");
    window.localStorage.setItem('theme', 'secondary');
  }

  const switchThird = () => {
    setThemeMode("third");
    window.localStorage.setItem('theme', 'third');
  }

  return (
    <div className='flex justify-between'>
      <button onClick={switchPrimary} className="bg-primary-theme">
        기본
      </button>
      <button onClick={switchSecondary} className="bg-secondary-theme">
      두번째 테마
      </button>
      <button onClick={switchThird} className="bg-third-theme">
      세번째 테마
      </button>
  </div>
  );
}

export default ThemeSwitcher;
