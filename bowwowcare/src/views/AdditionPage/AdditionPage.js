import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { ThemeContext } from "../../context/ThemeProvider";
import { colorVariants } from "../../utils/Dictionary";

function AdditionPage() {
  let navigate = useNavigate();
  let location = useLocation();

  const pet = location.state;
  const [petname, setPetName] = useState(pet ? pet.name : "");
  const [gender, setGender] = useState(pet ? pet.gender.toLowerCase() : "male");
  const [birthDate, setBirthDate] = useState(
    pet ? Date.parse(pet.birthDate) : new Date()
  );
  const [adoptDate, setAdoptDate] = useState(
    pet ? Date.parse(pet.adoptionDate) : new Date()
  );
  const [fileImg, setFileImg] = useState(pet ? pet.petImg : null);

  const fileInput = React.useRef();
  const [themeMode, setThemeMode] = useContext(ThemeContext)

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
    setFileImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    if (petname && gender && fileImg && birthDate && adoptDate) {
      if (!pet) {
        const formData = new FormData();
        formData.append("file", fileImg);

        axios({
          method: "POST",
          url: `${API_URL}/image`,
          data: formData,
        }).then((response) => {
          if (response.status === 200) {
            let body = {
              name: petname,
              gender: gender,
              petImg: response.data.url,
              birthDate: changeFormat(birthDate),
              adoptionDate: changeFormat(adoptDate),
            };

            axios({
              method: "POST",
              url: `${API_URL}/pets`,
              data: body,
              headers: authHeader(),
            })
              .then((res) => {
                navigate("/");
              })
              .catch((error) => {
                console.log(error.response);
              });
          }
        });
      } else {
        // TODO: 수정 API 추가
      }
    } else {
      alert("모든 항목을 입력하세요.");
    }
  };

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="flex flex-col justify-center m-12">
        <div className="w-full mb-10 flex justify-center">
          <div className="flex flex-col ">
            <div className="rounded-full border w-20 h-20 ml-4">
              {fileImg && (
                <img
                  src={
                    typeof fileImg === "string"
                      ? fileImg
                      : URL.createObjectURL(fileImg)
                  }
                  alt="프로필 이미지"
                  className="rounded-full w-20 h-20"
                ></img>
              )}
            </div>

            <div className="mt-3">
              <label className="font-bold " htmlFor="profileImg">
                프로필 이미지 {pet ? "변경" : "추가"}
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
            className={`w-full outline-none border-b-2 ${colorVariants['border'+themeMode]}`}
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
                className={`mr-2 ${colorVariants['accent'+themeMode]}`}
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
                className={`mr-2 ${colorVariants['accent'+themeMode]}`}
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
                className={`mr-2 ${colorVariants['accent'+themeMode]}`}
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
            className={`w-full outline-none border-b-2 ${colorVariants['border'+themeMode]}`}
            
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
            className={`w-full outline-none border-b-2 ${colorVariants['border'+themeMode]}`}
          />
        </div>
      </div>
      <div className="absolute bottom-8 w-5/6">
        <Button onClick={handleSubmit} bgColor={themeMode}>{pet ? "변경" : "추가"}</Button>
      </div>
    </div>
  );
}

export default AdditionPage;
