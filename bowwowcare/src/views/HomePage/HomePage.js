import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";
import { isLogin } from "../../utils/Status";

import Header from "../../components/Header";
import PetList from "./PetList/PetList";

import anxiety from "../../assets/images/anxiety.png";
import aggression from "../../assets/images/aggression.png";
import { useMediaQuery } from "react-responsive";

function HomePage() {
  const isDesktopOrMobile = useMediaQuery({query: '(max-width:768px)'});
  const [petList, setPetList] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    if (type) {
      navigate("/selection", {
        state: {
          type: type,
        },
      });
    }
  };

  const getPetList = async () => {
      axios({
        method: "GET",
        url: `${API_URL}/pets`,
        headers: authHeader(),
      }).then((res) => {
        if (res.status === 200) {
          setPetList(res.data);
        }
      }).catch((e) => {
        console.log(e.response.data);
      })
    };

  useEffect(() => {
    isLogin() && getPetList();
  }, []);

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="flex w-full">{<PetList pets={petList} />}</div>

      <div className="mt-14 py-8 shadow-lg rounded-lg">

        <div className="text-center">
        <p className=" text-lg">우리 아이가 이상행동을 보이나요?</p>
        <p className=" text-xs">간단한 진단을 통해 솔루션을 확인해보세요</p>
        </div>

      <div>
      {isDesktopOrMobile !== true ? 
        <div className="flex justify-center mt-6 text-gray-500 text-center text-sm">
          <button onClick={() => handleNavigation("aggression")} className=" border-r">
            <img src={aggression} style={{width:"250px"}}></img>
            <p>공격적인 아이</p>
          </button>

          <button onClick={() => handleNavigation("anxiety")}>
            <img src={anxiety} style={{width:"250px"}}></img>
            <p>불안해보이는 아이</p>
          </button>
        </div>
       : 
        <div className="flex justify-center mt-6 text-gray-500 text-center text-sm">
          <button onClick={() => handleNavigation("aggression")} className=" border-r">
            <img src={aggression}></img>
            <p>공격적인 아이</p>
          </button>

          <button onClick={() => handleNavigation("anxiety")}>
            <img src={anxiety}></img>
            <p>불안해보이는 아이</p>
          </button>
        </div>
      }
      </div>
      </div>

      <div className="mt-8 p-8 shadow-lg rounded-lg">
        <button onClick={() => navigate("/emotion")}>
          <p className=" text-lg">우리 아이의 감정을 확인해보세요</p>
          <p className=" text-xs text-left">사진 한 장으로 간편하게 알아보세요</p>
          </button>
      </div>
    </div>
  );
}

export default HomePage;
