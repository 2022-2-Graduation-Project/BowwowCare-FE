import axios from "axios";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider.js";
import ThemeBox from "./ThemeBox.js";
import Alert from "./Alert";
import { API_URL } from "../Config.js";
import authHeader from "../services/auth-header.js";

function ThemeSwitcher({ availableTheme, reward, username, fileImg }) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const mode = ["primary", "secondary", "third"];
  const bones = [1, 2, 30];
  const themes = [0, 1, 2];
  const [themeToPurchase, setThemeToPurchase] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleEditUser = (theme) => {
    axios({
      url: `${API_URL}/user`,
      method: "PUT",
      headers: authHeader(),
      data: {
        username: `${username}`,
        profileImage: `${fileImg}`,
        theme: theme,
      },
    })
      .then((response) => {
        if (response.data === 200) {
          console.log(response.data);
        }
      })
      .catch((e) => console.log(e.response.error));
  };

  const handlePurchaseTheme = () => {
    axios({
      method: "POST",
      url: `${API_URL}/user/theme`,
      headers: authHeader(),
      data: {
        bones: bones[themeToPurchase],
        theme: themeToPurchase,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          handleEditUser();
          setThemeMode(mode[themeToPurchase]);
          window.location.reload();
        }
      })
      .catch((e) => console.error(e.response));
  };

  const handleOpenPurchase = (theme) => {
    if (themeToPurchase) {
      setThemeToPurchase("");
    } else {
      setThemeToPurchase(theme);
    }
  };

  const handleOpenAlert = () => {
    setOpenAlert(!openAlert);
  };

  const handleTheme = (theme) => {
    if (availableTheme.indexOf(theme) < 0) {
      if (reward >= bones[theme]) {
        handleOpenPurchase(theme);
      } else {
        handleOpenAlert();
      }
    } else {
      handleEditUser(themes[theme]);
      setThemeMode(mode[theme]);
    }
  };

  const switchTheme = (theme) => {
    handleTheme(theme);
  };

  return (
    <div className="flex flex-col gap-6">
      {themes.map((theme, i) => {
        return (
          <ThemeBox
            onClick={() => switchTheme(theme)}
            title={`Theme ${theme}`}
            status={themeMode === mode[theme] ? "적용중" : null}
            rewards={bones[theme]}
            mainColor={`${mode[theme]}-theme`}
            subColor={`${mode[theme]}-theme-s`}
            locked={availableTheme.indexOf(theme) < 0}
            key={i}
          />
        );
      })}
      <Alert
        open={themeToPurchase}
        handleOpen={handleOpenPurchase}
        content={"구매하시겠습니까?"}
        handleSubmit={handlePurchaseTheme}
      />
      <Alert
        open={openAlert}
        handleOpen={handleOpenAlert}
        content={"리워드가 부족합니다."}
      />
    </div>
  );
}

export default ThemeSwitcher;
