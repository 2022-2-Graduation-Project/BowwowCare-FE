import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import Header from "../../components/Header";
import Alert from "../../components/Alert";
import Examination from "./Sections/Examination";

function ExaminationPage() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (location?.state?.aggressionType && location?.state?.petId) {
      axios({
        method: "POST",
        url: `${API_URL}/progress/aggression/${location.state.petId}`,
        headers: authHeader(),
        data: { aggressionType: location.state.aggressionType },
      }).then((response) => {
        if (response.status === 200) {
          handleOpen();
          setAlertMessage(
            <div>
              {response.data.message.map((m) => (
                <div className="my-1">
                  {m}
                  <br />
                </div>
              ))}
              <br />
            </div>
          );
        }
      });
    }
  }, []);

  const handleOpen = (e) => {
    setOpen(!open);
  };

  return (
    <div className="container mx-auto w-screen h-screen px-8">
      <Header />
      {location?.state?.type ? (
        <div>
          {location.state.type === "aggression" ? (
            <div className="mt-20 mb-6">
              아이가 어떤 상황에서 <span className="font-bold">앞의 행동</span>
              을 보이나요?
            </div>
          ) : (
            <div className="mt-20 mb-6">
              아이가 어떤 <span className="font-bold">행동</span>을 보이고
              있나요?
            </div>
          )}
          <Examination
            type={location.state.type}
            petId={location.state.petId}
            aggressionType={location.state.aggressionType}
          />
        </div>
      ) : null}
      <Alert
        open={open}
        handleOpen={handleOpen}
        content={alertMessage}
        icon={null}
      />
    </div>
  );
}

export default ExaminationPage;
