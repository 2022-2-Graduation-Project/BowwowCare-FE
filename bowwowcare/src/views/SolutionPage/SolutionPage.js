import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import format from 'date-fns/format';

import Header from "../../components/Header";
import Solution from "./Sections/Solution";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import { ThemeContext } from "../../context/ThemeProvider";

import lens from "../../assets/images/lens.png";

function SolutionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [themeMode, setThemeMode] = useContext(ThemeContext)

  useEffect(() => {
    if (location?.state?.responses) {
      axios({
        method: 'post',
        url: `${API_URL}/survey/${location?.state?.type}`,
        headers: authHeader(),
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
    if (localStorage.getItem("user")) {
      // TODO: POST results
      let data = {
        "petId": location.state.petId,
        "situation": solutions.map(solution => solution.id),
        "createdDate": format(new Date(), "yyyy-MM-dd")
      };

      if (location?.state?.type==="aggression") {
        data.aggressionType = location?.state?.aggressionType
      }

      navigate("/care");

      axios({
        method: 'POST',
        url: `${API_URL}/survey/result/${location?.state?.type}`,
        headers: authHeader(),
        body: data
      }) 
      .then((response => {
        if (response.state===200) {
          navigate("/care");
        }
      }));
    }
    else {
      handleOpen();
      setAlertMessage("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?");
    }
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
            <Button onClick={handleSaveResults} bgColor={themeMode}>멍멍케어 시작하기</Button>
        </div>
      </div>
      <Alert open={open} handleOpen={handleOpen} content={alertMessage} handleSubmit={handleLogin} />
    </div>
  );
}

export default SolutionPage;
