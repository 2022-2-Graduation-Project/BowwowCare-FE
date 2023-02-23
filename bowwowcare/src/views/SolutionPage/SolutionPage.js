import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config";

import Header from "../../components/Header";
import Solution from "./Sections/Solution";
import Alert from "../../components/Alert";
import Button from "../../components/Button";

import lens from "../../assets/images/lens.png";

function SolutionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [solutions, setSolutions] = useState([]);


  useEffect(() => {
    if (location?.state?.responses) {
      axios({
          method: 'post',
          url: `${API_URL}/survey/${location?.state?.type}`,
          data: location.state.responses
      })
      .then(response => {
          if (response.status === 200) {
            setSolutions(response.data);
          }
      })
      .catch(error => {
          console.log(error?.response);
      });
    }
  }, []);

  const handleOpen = (e) => {
    setOpen(!open);
  }

  const handleSaveResults = (e) => {
    setAlertMessage("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?");
    handleOpen();
    // TODO: POST results
  }

  const handleLogin = (e) => {
		navigate("/login");
	}

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div className="h-5/6 flex flex-col justify-between">
        <div className="h-2/3 overflow-x-auto flex px-2 py-4">
          {solutions?.map(solution => {
            return (
              <Solution key={solution.id} solution={solution} emotion={location?.state?.emotion} />
            );
          })}
        </div>
        <div className="flex flex-col items-center">
          <img src={lens} width="200px" />
        </div>
        <div className="w-full">
            <Button onClick={handleSaveResults}>멍멍케어 시작하기</Button>
        </div>
      </div>
      <Alert open={open} handleOpen={handleOpen} content={alertMessage} handleSubmit={handleLogin} />
    </div>
  );
}

export default SolutionPage;
