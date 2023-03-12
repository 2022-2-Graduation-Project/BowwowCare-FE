import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { ThemeContext } from "../../context/ThemeProvider";

function EmotionPage() {
  const navigate = useNavigate();
  const fileInput = React.useRef(null);
  const [themeMode, setThemeMode] = useContext(ThemeContext)
    const handleButtonClick = (e) => {
        fileInput.current.click();
      };
    
      const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          navigate("/preview", {
            state: {
              file: file,
            },
          });
        }
      };

  return (
    <div className="px-8">
    <Header/>
    <p className="text-xl font-bold mt-16">
        우리 아이 표정으로 감정 알아보기
      </p>
    <div className="flex justify-around">
    <Button onClick={handleButtonClick} bgColor={themeMode}>사진 선택</Button>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/jpg, image/png, image/jpeg"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <Button onClick={() => navigate("/camera")} bgColor={themeMode}>사진 찍기</Button>
      </div>
      </div>
  )
}

export default EmotionPage
