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
      <div className="flex flex-row my-10">
        <div className="basis-2/4 text-lg font-bold text-left text-main-color" onClick={handleGoHome}>
          <span style={{ fontFamily: "Tenada" }}>멍멍케어</span>
        </div>
        <div className="basis-1/4"></div>
        <button className="basis-1/4 text-right">로그인</button>
      </div>
    </div>
  );
}

export default Header;
