import styled from "styled-components";
import { useContext } from 'react'
import { ThemeContext } from './../context/ThemeProvider.js';
import { colorVariants } from "../utils/Dictionary";

function ThemeBox({onClick, title, status, rewards, mainColor, subColor}) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  return (
    <button onClick={onClick} className={`shadow-lg px-6 py-3 rounded-lg border ${status ? colorVariants['border'+themeMode] : null}`}>
        <div className='flex justify-between mb-4'>
          <span>{title}</span>
          <span className=" text-gray-500">{status}</span>
        </div>
        <div className='w-full flex justify-between content-center mb-2'>
          <div className='flex gap-x-4 w-3/4'>
            <div className={`bg-${mainColor} rounded-full w-12 h-12`} />
            <div className={`bg-${subColor} rounded-full w-12 h-12`} />
          </div>
          <span className={`grid content-center w-1/4 text-main-color ${status ? colorVariants['text'+themeMode]: 'text-black'}`}>X {rewards}</span>
        </div>  
      </button>
  )
}

export default ThemeBox
