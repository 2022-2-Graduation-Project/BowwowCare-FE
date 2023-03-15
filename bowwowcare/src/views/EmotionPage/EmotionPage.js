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
    <div className="w-full h-screen px-8">
    <Header/>
    <div className="h-full">
      <div className="h-1/5"></div>
      <div className="flex flex-col gap-6 text-center">
        <div className="text-xl font-bold mt-16 text-gray-700">
            <p>우리 아이의 감정이 어떤지</p>
            <p>확인해볼까요?</p>
        </div>
        <span>사진을 선택하거나 바로 찍어보세요</span>
        <div className="flex justify-around gap-3 mx-3">
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
    </div>
    </div>
  )
}

export default EmotionPage
