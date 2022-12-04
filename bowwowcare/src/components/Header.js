import React from "react";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const handleGoHome = (e) => {
    navigate("/");
  }

  return (
    <div>
      <div className="flex flex-row my-10">
        <div className="basis-2/4 text-lg font-bold text-left text-main-color font-Tenada" onClick={handleGoHome}>
          멍멍케어
        </div>
        <div className="basis-1/4"></div>
        <button className="basis-1/4 text-right">로그인</button>
      </div>
    </div>
  );
}

export default Header;
