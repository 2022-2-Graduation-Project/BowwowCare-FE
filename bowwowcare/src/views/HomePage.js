import React from "react";
import { useNavigate } from 'react-router-dom';

function HomePage() {
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
				"file": file
			}
		})
    }
  };

  return <div className="mx-8">
  <div className="flex flex-row mt-20">
    <div className="basis-2/4 text-lg font-bold text-left text-main-color" >BowwowCare 🐾</div>
    <div className="basis-1/4"></div>
    <div className="basis-1/4 text-right">로그인</div>
  </div>

  <p className="text-xl font-bold mt-20">우리 아이가 이상행동을 보이나요?</p>
  <button className="w-full h-16 mt-8 font-bold rounded-md bg-main-color text-white text-left pl-4" onClick={handleButtonClick}>사진으로 이상행동 체크하기</button>
  <input type="file"
   id="avatar" name="avatar"
   accept="image/jpg image/png, image/jpeg" 
   ref={fileInput}
   onChange={handleChange}
   style={{ display: "none" }}/>
  <button className="w-full h-32 mt-6 text-center rounded-md border border-gray-300 hover:border-main-color text-gray-300 bg-transparent pl-4"><p>+</p>가족을 추가해주세요</button>
  
</div>;
}

export default HomePage;
