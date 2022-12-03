import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function SolutionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    if (location?.state?.answer) {
      setAnswer(location?.state?.answer);
    }
  }, []);

  return (
    <div>
        <div>solution page</div>
    </div>
  );
}

export default SolutionPage;