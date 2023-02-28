import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function EmotionPage() {
    const navigate = useNavigate();
  const fileInput = React.useRef(null);
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
        <button
          className="w-full h-14 mt-8 mr-4 font-bold rounded-md bg-main-color text-white text-left p-4"
          onClick={handleButtonClick}
        >
          사진 선택
        </button>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/jpg, image/png, image/jpeg"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <button
          className="w-full h-14 mt-8 font-bold rounded-md bg-main-color text-white text-left p-4"
          onClick={() => navigate("/camera")}
        >
          사진 찍기
        </button>
      </div>
      </div>
  )
}

export default EmotionPage
