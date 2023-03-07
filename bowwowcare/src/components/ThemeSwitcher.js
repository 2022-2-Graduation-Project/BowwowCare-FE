import React, { useContext } from 'react';
import styled from 'styled-components';

import { ThemeContext } from '../context/ThemeProvider.js';

function ThemeSwitcher() {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  return (
    <div className='flex justify-between'>
      <button onClick={() => setThemeMode("primary")} className="bg-primary-theme">
        기본
      </button>
      <button onClick={() => setThemeMode("secondary")} className="bg-secondary-theme">
      두번째 테마
      </button>
      <button onClick={() => setThemeMode("third")} className="bg-third-theme">
      세번째 테마
      </button>
  </div>
  );
}

export default ThemeSwitcher;
