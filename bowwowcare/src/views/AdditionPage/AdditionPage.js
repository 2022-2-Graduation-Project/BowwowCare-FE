import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RainbowThemeContainer, DatePicker } from "react-rainbow-components";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import Header from "../../components/Header";
import Button from "../../components/Button";
import Alert from "../../components/Alert";
import { ThemeContext } from "../../context/ThemeProvider";
import { colorVariants } from "../../utils/Dictionary";
import HAPPY from "../../assets/images/happy.png";

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

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fileInput = React.useRef();
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const colors = { primary: "#38A8AC", secondary: "#7E57C2", third: "#424242" };

  const theme = {
    rainbow: {
      palette: {
        brand: colors[themeMode],
      },
    },
  };

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
      }
    } else {
      handleOpen();
      setAlertMessage("모든 항목을 입력하세요.");
    }
  };

  const handleOpen = (e) => {
    setOpen(!open);
  };

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="flex flex-col justify-center relative w-6/7 m-1.5">
        <div className="w-full mb-6 flex justify-center">
          <div className="flex flex-col ">
            <label className="font-bold " htmlFor="profileImg">
              <div className="rounded-full w-20 h-20 ml-4">
                <img
                  src={
                    !fileImg
                      ? HAPPY
                      : typeof fileImg === "string"
                      ? fileImg
                      : URL.createObjectURL(fileImg)
                  }
                  alt="프로필 이미지"
                  className="rounded-full w-20 h-20 object-cover"
                ></img>
              </div>
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

        <div className="mb-10">
          <div className="mb-2">이름</div>
          <input
            className={`w-full outline-none border-b-2 ${
              colorVariants["border" + themeMode]
            }`}
            value={petname}
            placeholder="반려견의 이름을 입력해주세요."
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
                className={`mr-2 ${colorVariants["accent" + themeMode]}`}
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
                className={`mr-2 ${colorVariants["accent" + themeMode]}`}
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
                className={`mr-2 ${colorVariants["accent" + themeMode]}`}
                checked={gender === "other"}
              />
              중성
            </label>
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-2">태어난 날</div>
          <RainbowThemeContainer theme={theme}>
            <DatePicker
              formatStyle="large"
              value={birthDate}
              onChange={(date) => setBirthDate(date)}
              maxDate={new Date()}
              borderRadius="semi-square"
            />
          </RainbowThemeContainer>
        </div>

        <div className="mb-10">
          <div className="mb-2">가족이 된 날</div>
          <RainbowThemeContainer theme={theme}>
            <DatePicker
              formatStyle="large"
              value={adoptDate}
              onChange={(date) => setAdoptDate(date)}
              maxDate={new Date()}
              borderRadius="semi-square"
            />
          </RainbowThemeContainer>
        </div>
      </div>
      <div className="absolute bottom-8 w-5/6">
        <Button onClick={handleSubmit} bgColor={themeMode}>
          {pet ? "변경" : "추가"}
        </Button>
      </div>
      <Alert open={open} handleOpen={handleOpen} content={alertMessage} />
    </div>
  );
}

export default AdditionPage;
