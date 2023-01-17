import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

function HomePage() {
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
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />

      <p className="text-xl font-bold mt-20">
        우리 아이가 이상행동을 보이나요?
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
      <button className="w-full h-14 mt-8 font-bold rounded-md bg-main-color text-white text-left p-4"
      onClick={() => navigate("/camera")}>사진 찍기</button>

      </div>
      
      <button className="w-full h-32 mt-6 text-center rounded-md border border-gray-300 hover:border-main-color text-gray-300 bg-transparent pl-4"
      onClick={()=>navigate("/addition")}>
        <p>+</p>가족을 추가해주세요
      </button>
    </div>
  );
}

export default HomePage;
