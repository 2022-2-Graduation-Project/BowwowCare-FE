import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import userService from "../../services/user.service";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";
import HAPPY from "../../assets/images/happy.png";

function UserPage() {
  const [rewards, setRewards] = useState(0);
  const [fileImg, setFileImg] = useState(null);
  const [userName, setUserName] = useState("");
  const [availableThemes, setAvailableThemes] = useState([]);
  const fileInput = React.useRef();

  const handleEditUserImg = (profileImg) => {
    const formData = new FormData();
    formData.append("file", profileImg);
    axios({
      method: "POST",
      url: `${API_URL}/image`,
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          let image = {
            profileImage: response.data.url,
          };
          localStorage.setItem("userImg", image.profileImage);
          axios({
            method: "PUT",
            url: `${API_URL}/user/image`,
            data: image,
            headers: authHeader(),
          })
            .then((response) => {
              if (response.data === 200) {
                console.log(response.data);
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      })
      .catch((e) => console.log(e.response.error));
  };

  const handleChange = (e) => {
    const profileImg = e.target.files[0];
    setFileImg(profileImg);
    handleEditUserImg(profileImg);
  };

  useEffect(() => {
    userService
      .getUserBoard()
      .then((response) => {
        if (response.status === 200) {
          const user = response.data;
          setUserName(user.username);
          setRewards(user.reward);
          setFileImg(user.profileImage);
          setAvailableThemes(user.availableTheme);
        }
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="mb-5">
        <div className="flex justify-center mb-2">
          <div className="rounded-full w-12 h-12 border">
            <label htmlFor="profileImg">
              <img
                src={
                  !fileImg
                    ? HAPPY
                    : typeof fileImg === "string"
                    ? fileImg
                    : URL.createObjectURL(fileImg)
                }
                className="rounded-full w-12 h-12 object-cover"
                alt="유저 이미지"
              ></img>
            </label>
          </div>
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
        <div className="text-center">{userName}</div>
      </div>

      <hr />
      <div className="flex justify-between mx-5 my-3">
        <span>내 리워드</span>
        <span>{rewards}</span>
      </div>
      <ThemeSwitcher
        availableTheme={availableThemes}
        reward={rewards}
        username={userName}
        fileImg={fileImg}
      ></ThemeSwitcher>
    </div>
  );
}

export default UserPage;
