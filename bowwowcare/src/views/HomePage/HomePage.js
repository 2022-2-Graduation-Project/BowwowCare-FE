import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import PetList from "./PetList/PetList"

function HomePage() {
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

  const res = [{
    id: 0,
    petname: "강쥐",
    gender: "남",
    birthDate: "2020-01-30T08:13:57.980Z",
    adoptDate: "2020-01-30T08:13:57.980Z",
    fileImg: ""
  }, {
    id: 1,
    petname: "강쥐2",
    gender: "여",
    birthDate: "2019-01-30T08:13:57.980Z",
    adoptDate: "2019-01-30T08:13:57.980Z",
    fileImg: ""
  }, {
    id: 2,
    petname: "강쥐3",
    gender: "남",
    birthDate: "2010-01-30T08:13:57.980Z",
    adoptDate: "2010-01-30T08:13:57.980Z",
    fileImg: ""
  }]

  useEffect(() => {
    setPet(res);
    console.log(pet);
  }, [])
  
  // 펫 데이터 불러오기
  // useEffect(async() => {
  //   try{
  //     const res = await axios.get('/api/v1/pets');
  //     const input = await res.map((x) => ({
  //           id: x.idx,
  //           petname: x.name,
  //           gender: x.gender,
  //           birthDate: x.birthDate,
  //           adopDate: x.adopday,
  //           fileImg: x.fileImg
  //           })
  //     )
  //     setPet(pet.concat(input))
  //   } catch(e){
  //     console.error(e.message)
  //   }
  // },[])

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
      {pet && <PetList pet={pet}/>}
      
      <button className="w-full h-32 mt-6 text-center rounded-md border border-gray-300 hover:border-main-color text-gray-300 bg-transparent pl-4"
      onClick={()=>navigate("/addition")}>
        <p>+</p>가족을 추가해주세요
      </button>
    </div>
  );
}

export default HomePage;
