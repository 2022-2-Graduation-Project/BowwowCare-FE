import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/Header";

function EditPage() {
  let navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const [petname, setPetName] = useState(state.petname);
  const [gender, setGender] = useState(state.gender);
  const [birthDate, setBirthDate] = useState(new Date(state.birthDate));
  const [adoptDate, setAdoptDate] = useState(new Date(state.adoptDate));
  const [fileImg, setFileImg] = useState();

  const fileInput = React.useRef();

  const handleChange = (e) => {
    setFileImg(e.target.files[0]);
  };

  // 변경함수로 변경
  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    let body = {
      petname: petname,
      gender: gender,
      // petImgUrl: fileImg,
      birthDate: birthDate,
      adoptDate: adoptDate,
    };

    formData.append("pet", JSON.stringify(body));
    formData.append("file", fileImg);

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    if (petname && gender && fileImg && birthDate && adoptDate) {
      // console.log(data);
      axios
        .post("http://localhost:8080/api/v1/pets/", formData)
        .then((res) => {
          console.log(res);
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("모든 항목을 입력하세요.");
      console.log(body);
    }
  };

  const changeHandlerBgColor = (g) => {
    return gender == g
      ? "bg-main-color text-white "
      : "bg-transparent text-gray-300";
  };

  return (
    <div className="px-8">
      <Header />
      <form>
        <div className="flex flex-col justify-center m-12">
          <div className="w-full mb-10 flex justify-center">
            <div className="flex flex-col">
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
            <p>이름</p>
            <input
              className="w-full mt-3 border-b"
              value={petname}
              onChange={(e) => {
                setPetName(e.target.value);
              }}
            ></input>
          </div>

          <div className="mb-10">
            <span>성별</span>
            <div className="flex gap-1">
              <input
                type="button"
                value="남"
                onClick={() => setGender("남")}
                className={`w-full h-10 mt-3 text-center rounded-md border border-gray-300 hover:bg-main-color hover:text-white ${changeHandlerBgColor("남")}`}
              />
              <input
                type="button"
                value="여"
                onClick={() => setGender("여")}
                className={`w-full h-10 mt-3 text-center rounded-md border border-gray-300 hover:bg-main-color hover:text-white ${changeHandlerBgColor("여")}`}
              />
            </div>
          </div>

          <div className="mb-10">
            <span>태어난 날</span>
            <DatePicker
              dateFormat="yyyy년 MM월 dd일"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
            />
          </div>

          <div className="mb-10">
            <span>가족이 된 날</span>
            <DatePicker
              dateFormat="yyyy년 MM월 dd일"
              selected={adoptDate}
              onChange={(date) => setAdoptDate(date)}
            />
          </div>
          <div className="flex flex-row-reverse">
            <button
              onClick={handleEdit}
              className="w-16 h-8 mt-24 bg-gray-400 rounded-full text-white"
            >
              변경
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPage;
