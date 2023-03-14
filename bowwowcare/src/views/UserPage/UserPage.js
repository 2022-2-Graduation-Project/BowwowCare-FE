import React ,{ useEffect, useState }from "react";
import Header from "../../components/Header";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import HAPPY from "../../assets/images/happy.png"
import userService from "../../services/user.service";

function UserPage() {
  const [rewards, setRewards] = useState(0);
  const [fileImg, setFileImg] = useState("");
  const [userName, setUserName] = useState("");
  const [availableThemes, setAvailableThemes] = useState([]);

  useEffect(() => {
      userService.getUserBoard().then((response) => {
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
  }, [])

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
      <ThemeSwitcher availableTheme={availableThemes} reward={rewards} username={userName} fileImg={fileImg} ></ThemeSwitcher>
    </div>
  );
}

export default UserPage;
