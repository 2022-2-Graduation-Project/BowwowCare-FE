import axios from 'axios';
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider.js';
import ThemeBox from './ThemeBox.js';
import { API_URL } from '../Config.js';
import authHeader from '../services/auth-header.js';

function ThemeSwitcher({ availableTheme, reward, username, fileImg }) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const mode = ["primary","secondary", "third"];
  const bones = [1,2,30];
  const themes = [0,1,2];
  
  const putUser = (theme) => {
    axios({
      url: `${API_URL}/user`,
      method: 'PUT',
      headers: authHeader(),
      data: {
        username : `${username}`,
        profileImage : `${fileImg}`,
        theme : theme
      }
    })
    .then((response) => {
      if(response.data === 200){
        console.log(response.data)
      }
    }).catch((e) => console.log(e.response.error))
  }
  
  const postUser = (bones, theme) => {
    axios({
      method: 'POST',
      url: `${API_URL}/user/theme`,
      headers: authHeader(),
      data: {
        bones: bones,
        theme: theme
      }
    }).then((response) => {
      if(response.status === 200){
        console.log(response.data);
        axios({
          url: `${API_URL}/user`,
          method: 'PUT',
          headers: authHeader(),
          data: {
            username : `${username}`,
            profileImage : `${fileImg}`,
            theme : theme
          }
        })
        .then((response) => {
          if(response.data === 200){
            console.log(response.data)
          }
        }).catch((e) => console.log(e.response.error))
      }
    }).catch((e) => console.log(e.response.error))
  }

  const handleTheme = (theme) => {
    // TODO: Alert component
    if(availableTheme.indexOf(theme) < 0){
      if(reward >= bones[theme]){
        if (window.confirm("구매하시겠습니까?") == true){ 
          postUser(bones[theme], theme);
          setThemeMode(mode[theme]);
          window.location.reload();
        }else{
          console.log("취소");
        }
      }else{
        alert("리워드가 부족합니다!")
      }
    }else{
      putUser(themes[theme]);
      setThemeMode(mode[theme]);
    }
  }

  const switchTheme = (theme) => {
    handleTheme(theme);
  }

  return (
      <div className='flex flex-col gap-6'>
        {themes.map((theme, i) => {
          return(
            <ThemeBox onClick={() => switchTheme(theme)} title={`Theme ${theme}`} status={themeMode === mode[theme] ? '적용중' : null} rewards={bones[theme]} mainColor={`${mode[theme]}-theme`} subColor={`${mode[theme]}-theme-s`} locked={availableTheme.indexOf(theme) < 0} key={i}></ThemeBox>
          );
        })}
      </div>
  );
}

export default ThemeSwitcher;
