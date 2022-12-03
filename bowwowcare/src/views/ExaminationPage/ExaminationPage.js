import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { en2koDictEmotionVerb } from "../../utils/Dictionary";
import Header from "../../components/Header";
import Sad from "../../components/Examination/Sad";

function ExaminationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState();

  useEffect(() => {
    if (location?.state?.emotion) {
      setResults(location.state.emotion);
    }
  }, []);

  return (
    <div className="mx-8">
      <Header />
      <div className="mt-20 mb-6">아이가 왜 <span className="font-bold">{en2koDictEmotionVerb[results]}</span> 하고 있을까요?</div>
      <Examination emotion={results} />
    </div>
  );
}

function Examination(props) {
  let emotion = props.emotion;
  switch (emotion) {
    case "SAD":
      return <Sad />;
    case "HAPPY":
      return <h4>HAPPY</h4>;
    case "RELAXED":
      return <h4>RELAXED</h4>;
    case "ANGRY":
      return <h4>ANGRY</h4>;
    default:
      return <h4></h4>;

  }
}
export default ExaminationPage;