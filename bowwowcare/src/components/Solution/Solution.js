import React from "react";

import { solutions } from "../../utils/Dictionary";

function Solution({ answer, emotion }) {
  return (
    <div>
      <div>
        {solutions[emotion]?.map((x) => {
          if (answer === x.id) {
            return (
              <div key={answer} className="shadow-lg rounded-2xl px-6 py-8">
                <div>{x.question}</div>
                <div>{x.solution}</div>
                <button className="h-12 mt-8 rounded-md bg-main-color border-2 border-main-color text-white text-center px-4">
                  실천하기
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Solution;
