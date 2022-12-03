import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { questions } from "./../../utils/Dictionary";

function Sad() {
  const [answer, setAnswer] = useState({
    1: "아니요",
    2: "아니요",
    3: "아니요",
    4: "아니요",
    5: "아니요",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/solution", {
			state: {
				answer
			}
		})
    console.log(answer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="shadow-lg rounded-2xl px-6 py-8">
          {questions.map((x) => {
            return (
              <div className="text-sm" key={x.id}>
                <li className="mb-2">{x.question}</li>
                <div className="flex">
                  {x.options.map((options, idx) => (
                    <div key={idx} className="mr-8 mb-4">
                      <label>
                        <input
                          type="radio"
                          value={options}
                          name={x.id}
                          checked={answer[x.id] === options}
                          onChange={() =>
                            setAnswer((answer) => ({
                              ...answer,
                              [x.id]: options,
                            }))
                          }
                          className="mr-2 accent-main-color"
                        />
                        {options}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="h-12 mt-28 w-full font-bold rounded-md bg-main-color text-white text-center"
          >
            제출하기
          </button>
        </div>
      </form>
    </div>
  );

}

export default Sad;