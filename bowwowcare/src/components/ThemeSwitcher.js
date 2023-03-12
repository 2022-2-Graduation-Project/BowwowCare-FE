import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider.js';
import ThemeBox from './ThemeBox.js';

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
      <div className='flex flex-col gap-6'>
        <ThemeBox onClick={switchPrimary} title={"Theme 1"} status={themeMode === 'primary' ? '적용중' : null} rewards={10} mainColor={"primary-theme"} subColor={"primary-theme-s"}></ThemeBox>
        <ThemeBox onClick={switchSecondary} title={"Theme 2"} status={themeMode === 'secondary' ? '적용중' : null} rewards={20} mainColor={"secondary-theme"} subColor={"secondary-theme-s"}></ThemeBox>
        <ThemeBox onClick={switchThird} title={"Theme 3"} status={themeMode === 'third' ? '적용중' : null} rewards={30} mainColor={"third-theme"} subColor={"third-theme-s"}></ThemeBox>
      </div>
  );
}

export default ThemeSwitcher;
