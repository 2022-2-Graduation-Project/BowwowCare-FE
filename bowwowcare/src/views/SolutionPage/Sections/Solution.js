import React, { useState } from "react";

import Modal from "../../../components/Modal/Modal";
import YoutubeEmbed from "../../../components/YoutubeEmbed/YoutubeEmbed";
import Button from "../../../components/Button";

import "../../../components/YoutubeEmbed/youtube.css";

function Solution({ solution, emotion }) {
  const [popup, setPopup] = useState(false);

  const handleTrigger = () => {
    setPopup(false);
  };

  return (
    <div>
        <div
          key={solution}
          className="w-72 h-full text-center shadow-lg rounded-2xl flex flex-col justify-between px-10 pt-12 pb-8 mx-2"
        >
          <div className="font-bold pb-2">{solution.situation}</div>
          <div className="h-1/2 overflow-y-auto">{solution.solution}</div>
          <Button
            onClick={() => setPopup(true)}
            bgColor="white" borderColor="main-color" textColor="main-color"
          >
            <div>자세히 보기</div>
          </Button>
          <Modal
            trigger={popup}
            handleTrigger={handleTrigger}
            solution={solution.solution}
          >
            <YoutubeEmbed embedId="w7aE4ihj7Ao" />
          </Modal>
        </div>
    </div>
  );
}

export default Solution;
