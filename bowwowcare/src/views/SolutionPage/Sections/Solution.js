import React, { useState, useContext } from "react";

import Modal from "../../../components/Modal/Modal";
import YoutubeEmbed from "../../../components/YoutubeEmbed/YoutubeEmbed";
import Button from "../../../components/Button";
import { colorVariants } from "../../../utils/Dictionary";
import { ThemeContext } from "../../../context/ThemeProvider";

import "../../../components/YoutubeEmbed/youtube.css";

function Solution({ solution, emotion }) {
  const [popup, setPopup] = useState(false);
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const handleTrigger = () => {
    setPopup(false);
  };

  return (
    <div>
        <div
          key={solution}
          className="w-72 h-full text-center shadow-lg rounded-2xl flex flex-col justify-between px-8 pt-10 pb-8 mx-2"
        >
          <div className="font-bold">{solution.situation}</div>
          <div className="h-5/6 overflow-y-auto">{solution.solution}</div>
          {/* <Button
            onClick={() => setPopup(true)}
            bgColor="white" borderColor={themeMode} textColor={themeMode}
          >
            <div>자세히 보기</div>
          </Button>
          <Modal
            trigger={popup}
            handleTrigger={handleTrigger}
            solution={solution.solution}
          >
            <YoutubeEmbed embedId="w7aE4ihj7Ao" />
          </Modal> */}
        </div>
    </div>
  );
}

export default Solution;
