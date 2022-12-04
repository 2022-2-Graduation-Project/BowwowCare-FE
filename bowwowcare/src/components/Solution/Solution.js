import React, { useState } from "react";

import Modal from "../Modal/Modal";
import YoutubeEmbed from "./YoutubeEmbed/YoutubeEmbed";
import { solutions } from "../../utils/Dictionary";

import "./YoutubeEmbed/youtube.css";

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
              className="w-64 text-center shadow-lg rounded-2xl px-6 py-8"
            >
              <div className="font-bold">{x.question}</div>
              <div>{x.solution}</div>
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
