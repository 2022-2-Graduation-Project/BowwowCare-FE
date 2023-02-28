import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Header from "../../components/Header";
import Button from "../../components/Button";

function AdditionPage() {
  let navigate = useNavigate();

  const [petname, setPetName] = useState("");
  const [gender, setGender] = useState("male");
  const [birthDate, setBirthDate] = useState(new Date());
  const [adoptDate, setAdoptDate] = useState(new Date());
  const [fileImg, setFileImg] = useState();

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
    setFileImg(e.target.files[0]);
  };

  const handleAdd = (e) => {
    if (petname && gender && fileImg && birthDate && adoptDate) {
      const formData = new FormData();
      formData.append("file", fileImg);

      axios({
        method: "POST",
        url: `${API_URL}/image`,
        data: formData
      })
      .then((response => {
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
      }))
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
                  src={URL.createObjectURL(fileImg)}
                  alt="프로필 이미지"
                  className="rounded-full w-20 h-20"
                ></img>
              )}
            </div>

            <div className="mt-3">
              <label className="font-bold " htmlFor="profileImg">
                프로필 이미지 추가
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
        <Button onClick={handleAdd}>
          추가
        </Button>
      </div>
    </div>
  );
}

export default AdditionPage;
