import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import Header from "../../components/Header";
import PetList from "./PetList/PetList";

import anxiety from "../../assets/images/anxiety.png";
import aggression from "../../assets/images/aggression.png";

function HomePage() {
  const [petlist, setPetlist] = useState([]);
  const [pet, setPet] = useState([]);
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

  const handleNavigation = (type) => {
    if (type === "aggression") {
      navigate("/behavior-selection", {
        state: {
          type: type,
        },
      });
    } else if (type === "anxiety") {
      navigate("/examination", {
        state: {
          type: type,
        },
      });
    }
  };

  const handleBehaviorSelection = (type) => {
    navigate("/behavior-selection", {
      state: {
        type: type,
      },
    });
  };

  const getPetList = async () => {
      axios({
        method: "GET",
        url: `${API_URL}/pets`,
        headers: authHeader(),
      }).then((res) => {
        if (res.status === 200) {
          console.log(res);
          setPetlist(res.data);
        }
      }).catch((e) => {
        console.log(e.message);
      })

      
    };

  const getPetDetail = async () => {
    const promise = petlist.map(async (v) => {
      const res = await axios.get(`${API_URL}/pets/${v.petId}`);
      return res.data;
    });
    return Promise.all(promise).then((result) => setPet(result));
  };
  useEffect(() => {
    getPetList();
    getPetDetail();
  }, []);

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="flex">{pet && <PetList pets={pet} />}</div>
      
      <p className="text-xl font-bold mt-16">우리 아이 이상행동 확인해보기</p>
      <div className="flex justify-center mt-6 text-gray-500 text-center text-sm">
        <button onClick={() => handleNavigation("anxiety")}>
          <img src={anxiety}></img>
          <p>불안에 떨고 있어요</p>
        </button>
        <button onClick={() => handleNavigation("aggression")}>
          <img src={aggression}></img>
          <p>으르렁 거리고 있어요</p>
        </button>
      </div>

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
  );
}

export default HomePage;
