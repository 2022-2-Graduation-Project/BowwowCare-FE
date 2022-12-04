import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Solution from "../../components/Solution/Solution";
import { solutions } from "../../utils/Dictionary";

function SolutionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState({});
  const [emotion, setEmotion] = useState();

  useEffect(() => {
    if (location?.state?.answer) {
      setAnswer(location?.state?.answer);
      setEmotion(location?.state?.emotion);
    }
  }, []);

  return (
    <div className="mx-8">
      <Header />
      <div className="grid justify-center">
        {Object.entries(location?.state?.answer).map(([key, value]) => {
          if (value === "예") {
            return (
              <div
                key={key}
                className="mb-10"
              >
                <Solution answer={key} emotion={emotion} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SolutionPage;
