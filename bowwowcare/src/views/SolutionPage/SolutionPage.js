import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header";
import Solution from "./Sections/Solution";
import Alert from "../../components/Alert";


function SolutionPage() {
  const location = useLocation();
  const [answer, setAnswer] = useState({});
  const [emotion, setEmotion] = useState();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (location?.state?.answer) {
      setAnswer(location?.state?.answer);
      setEmotion(location?.state?.emotion);
    }
  }, []);

  const handleOpen = (e) => {
    setOpen(!open);
  }

  const handleSaveResults = (e) => {
    setAlertMessage("로그인이 필요한 서비스입니다");
    handleOpen();
    // TODO: POST results
  }

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="h-5/6 flex flex-col justify-between">
        <div className="h-2/3 overflow-x-auto flex mt-10 px-2 py-8">
          {Object.entries(location?.state?.answer)?.map(([key, value]) => {
            if (value === "예") {
              return (
                <Solution key={key} answer={key} emotion={emotion} />
              );
            }
          })}
        </div>
        <div className="w-full">
            <button 
                className="h-12 w-full font-bold rounded-md bg-main-color text-white text-center" 
                onClick={handleSaveResults}
            >
                결과 저장하기
            </button>
        </div>
      </div>
      <Alert open={open} handleOpen={handleOpen} content={alertMessage} />
    </div>
  );
}

export default SolutionPage;
