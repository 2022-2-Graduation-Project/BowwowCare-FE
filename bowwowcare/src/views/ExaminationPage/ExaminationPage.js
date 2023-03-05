import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Examination from "./Sections/Examination";


function ExaminationPage() {
  const location = useLocation();

  return (
    <div className="container mx-auto w-screen h-screen px-8">
      <Header />
      {location?.state?.type ? 
        <div>
          {location.state.type==="aggression" ? (
            <div className="mt-20 mb-6">아이가 어떤 상황에서 <span className="font-bold">앞의 행동</span>을 보이나요?</div>
          ) : (
            <div className="mt-20 mb-6">아이가 어떤 <span className="font-bold">행동</span>을 보이고 있나요?</div>
          )}
          <Examination type={location.state.type} petId={location.state.petId} aggressionType={location.state.aggressionType} /> 
        </div>
      : null}
    </div>
  );
}

export default ExaminationPage;