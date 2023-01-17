import React, { useState } from "react";

import Modal from "../../../components/Modal/Modal";
import YoutubeEmbed from "../../../components/YoutubeEmbed/YoutubeEmbed";
import { solutions } from "../../../utils/Dictionary";

import "../../../components/YoutubeEmbed/youtube.css";

function Solution({ answer, emotion }) {
  const [popup, setPopup] = useState(false);

  const handleTrigger = () => {
    setPopup(false);
  };

  return (
    <div>
      {solutions[emotion]?.map((x) => {
        if (answer === x.id) {
          return (
            <div
              key={answer}
              className="w-64 h-full text-center shadow-lg rounded-2xl flex flex-col justify-between px-8 pt-16 pb-8 mx-3"
            >
              <div>
                <div className="font-bold pb-4">{x.question}</div>
                <div>{x.solution}</div>
              </div>
              <button
                onClick={() => setPopup(true)}
                className="h-12 mt-8 px-4 rounded-md text-center bg-white border border-main-color text-main-color hover:bg-main-color hover:text-white"
              >
                <div className="hover:text-white">실천하기</div>
              </button>
              <Modal
                trigger={popup}
                handleTrigger={handleTrigger}
                solution={x.solution}
              >
                <YoutubeEmbed embedId="w7aE4ihj7Ao" />
              </Modal>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Solution;
