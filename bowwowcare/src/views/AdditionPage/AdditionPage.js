import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Header from "../../components/Header";

function AdditionPage() {
  let navigate = useNavigate();

  const [petname, setPetName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [adoptDate, setAdoptDate] = useState(new Date());
  const [fileImg, setFileImg] = useState();

  const fileInput = React.useRef();

  const handleChange = (e) => {
    setFileImg(URL.createObjectURL(e.target.files[0]));
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   setFileImg(reader.result);
    // };
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();

    let body = {
      petname: petname,
      gender: gender,
      petImgUrl: fileImg,
      birthDate: birthDate,
      adoptDate: adoptDate,
    };

    formData.append(
      "pet", JSON.stringify(body)
    );

    for (let key of formData.keys()) { 
      console.log(key, ':', formData.get(key)); 
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
        .catch((error) => {console.log(error)});
    } else {
      alert("모든 항목을 입력하세요.");
      console.log(body);
    }

  };

  return (
    <div className="px-8">
      <Header />
      <form>
        <div className="flex flex-col justify-center m-12">
          <div className="w-full mb-10 flex justify-center">
            <div className="flex flex-col ">
              <div className="rounded-full border w-20 h-20 ml-4">
                {fileImg && (
                  <img
                    src={fileImg}
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
            <p>이름</p>
            <input
              className="w-full mt-3"
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
                className="w-full h-10 mt-3 text-center rounded-md border border-gray-300 hover:bg-main-color hover:text-white text-gray-300 bg-transparent"
              />
              <input
                type="button"
                value="여"
                onClick={() => setGender("여")}
                className="w-full h-10 mt-3 text-center rounded-md border border-gray-300 hover:bg-main-color hover:text-white text-gray-300 bg-transparent"
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
              onClick={handleAdd}
              className="w-16 h-8 mt-24 bg-gray-400 rounded-full text-white"
            >
              추가
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdditionPage;