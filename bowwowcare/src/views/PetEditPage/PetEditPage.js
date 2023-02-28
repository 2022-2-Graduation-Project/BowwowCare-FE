import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Header from "../../components/Header";
import Button from "../../components/Button";

function PetEditPage() {
  let navigate = useNavigate();
  let location = useLocation();
  
  const pet = location.state;
  const [id, setId] = useState(pet.id)
  const [petname, setPetName] = useState(pet.name);
  const [gender, setGender] = useState(pet.gender.toLowerCase());
  const [birthDate, setBirthDate] = useState(Date.parse(pet.birthDate));
  const [adoptDate, setAdoptDate] = useState(Date.parse(pet.adoptionDate));
  const [fileImg, setFileImg] = useState(pet.petImg);

  const fileInput = React.useRef();

  const changeFormat = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 9 ? "0" + date.getDate() : date.getDate())
    );
  };
  
  const handleChange = (e) => {
    setFileImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleEdit = (e) => {
    
  };

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="flex flex-col justify-center m-12">
        <div className="w-full mb-10 flex justify-center">
          <div className="flex flex-col ">
            <div className="rounded-full border w-20 h-20 ml-4">
                <img 
                  src={fileImg}
                  alt="프로필 이미지"
                  className="rounded-full w-20 h-20">
                </img>
            </div>

            <div className="mt-3">
              <label className="font-bold " htmlFor="profileImg">
                프로필 이미지 변경
              </label>
              <input
                type="file"
                id="profileImg"
                name="avatar"
                accept="image/*"
                ref={fileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-2">이름</div>
          <input
            className="w-full outline-none border-b-2 border-main-color"
            value={petname}
            onChange={(e) => {
              setPetName(e.target.value);
            }}
          ></input>
        </div>

        <div className="mb-10">
          <div className="mb-2">성별</div>
          <div className="flex gap-2">
            <label>
              <input
                type="radio"
                value={"male"}
                name={"gender"}
                onChange={() => setGender("male")}
                className="mr-2 accent-main-color"
                checked={gender === "male"}
              />
              남
            </label>
            <label>
              <input
                type="radio"
                value={"female"}
                name={"gender"}
                onChange={() => setGender("female")}
                className="mr-2 accent-main-color"
                checked={gender === "female"}
              />
              여
            </label>
            <label>
              <input
                type="radio"
                value={"other"}
                name={"gender"}
                onChange={() => setGender("other")}
                className="mr-2 accent-main-color"
                checked={gender === "other"}
              />
              중성
            </label>
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-2">태어난 날</div>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            maxDate={new Date()}
            className="outline-none border-b-2 border-main-color w-full"
          />
        </div>

        <div className="mb-10">
          <div className="mb-2">가족이 된 날</div>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            selected={adoptDate}
            onChange={(date) => setAdoptDate(date)}
            maxDate={new Date()}
            className="outline-none border-b-2 border-main-color w-full"
          />
        </div>
      </div>
      <div className="absolute bottom-8 w-5/6">
        <Button onClick={handleEdit}>
          편집
        </Button>
      </div>
    </div>
  );
}

export default PetEditPage;
