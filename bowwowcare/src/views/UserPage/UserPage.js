import React ,{ useEffect, useState }from "react";
import axios from "axios";
import Header from "../../components/Header";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import HAPPY from "../../assets/images/happy.png"
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

function UserPage() {
  const [rewards, setRewards] = useState(0);
  const [user, setUser] = useState();
  const [fileImg, setFileImg] = useState("");
  const [userName, setUserName] = useState("");
  const [availableThemes, setAvailableThemes] = useState([])

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    axios({
      method: 'GET',
      url: `${API_URL}/user`,
      headers: authHeader(),
    })
    .then( (response) => {
      if(response.status === 200) {
      const user = response.data;
      console.log(user);
      setUserName(user.username);
      setRewards(user.reward);
      setFileImg(user.profileImage);
      setAvailableThemes(user.availableTheme);
      }
    }
    ).catch((e) => {console.log(e.response.data)})
  }

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="mb-5">
        <div className="flex justify-center mb-2">
          <div className="rounded-full w-12 h-12 border">
            <img src={fileImg ? fileImg : HAPPY} className="rounded-full w-12 h-12" alt="유저 이미지"></img>
          </div>
        </div>
        <div className="text-center">{userName}</div>
      </div>
      
      <hr />
      <div className='flex justify-between mx-5 my-3'>
        <span>내 리워드</span>
        <span>{rewards}</span>
      </div>
      <ThemeSwitcher availableTheme={availableThemes} reward={rewards}></ThemeSwitcher>
    </div>
  );
}

export default UserPage;
