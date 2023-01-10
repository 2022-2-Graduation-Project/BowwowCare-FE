import React from "react";
import { useNavigate } from "react-router-dom";
import "../font.css";


function Header() {
  const navigate = useNavigate();

  const handleGoHome = (e) => {
    navigate("/");
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center my-10">
        <div className="text-xl font-bold text-left text-main-color" onClick={handleGoHome}>
          <span style={{ fontFamily: "Tenada" }}>멍멍케어</span>
        </div>
        <button className="text-right">로그인</button>
      </div>
    </div>
  );
}

export default Header;
