import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeProvider.js';
import ThemeBox from './ThemeBox.js';
import { API_URL } from '../Config.js';
import authHeader from '../services/auth-header.js';

function ThemeSwitcher(props) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const availableTheme = props.availableTheme;
  const reward = props.reward;
  const bones = [1,20,3];
  const themes = [0,1,2]
  
  useEffect(() => {
    //setAvailableTheme(props.availableThemes);
    //setReward(props.reward);
  }, [])

  const putUser = (theme) => {
    axios({
      url: `${API_URL}/user`,
      method: 'PUT',
      headers: authHeader(),
      data: {
        username : "짱구",
        profileImage : "",
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
            username : "짱구",
            profileImage : "",
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

  const switchPrimary = () => {
    setThemeMode("primary");
    putUser(themes[0])
  }

  const switchSecondary = () => {
    if(props.availableTheme.indexOf(1) < 0){
      alert("theme2 구매?");
      console.log(reward);
      if(reward >= bones[1]){
        postUser(bones[1], 1);
        window.location.reload();
        setThemeMode("secondary");
      }else{
        console.log("부족!");
      }
    }else{
      putUser(themes[1]);
      setThemeMode("secondary");
    }
    
  }

  const switchThird = () => {
    if(props.availableTheme.indexOf(2) < 0){
      alert("theme3 구매?");
      //console.log(reward);
      if(reward >= bones[2]){
        postUser(bones[2], 2);
        window.location.reload();
        setThemeMode("third");
      }else{
        console.log("부족!");
      }
    }else{
      putUser(themes[2]);
      setThemeMode("third");
    }
  }

  return (
      <div className='flex flex-col gap-6'>
        <ThemeBox onClick={switchPrimary} title={"Theme 1"} status={themeMode === 'primary' ? '적용중' : null} rewards={bones[0]} mainColor={"primary-theme"} subColor={"primary-theme-s"} locked={availableTheme.indexOf(0) < 0}></ThemeBox>
        <ThemeBox onClick={switchSecondary} title={"Theme 2"} status={themeMode === 'secondary' ? '적용중' : null} rewards={bones[1]} mainColor={"secondary-theme"} subColor={"secondary-theme-s"} locked={availableTheme.indexOf(1) < 0}></ThemeBox>
        <ThemeBox onClick={switchThird} title={"Theme 3"} status={themeMode === 'third' ? '적용중' : null} rewards={bones[2]} mainColor={"third-theme"} subColor={"third-theme-s"} locked={availableTheme.indexOf(2) < 0} disabled={false}></ThemeBox>
      </div>
  );
}

export default ThemeSwitcher;
