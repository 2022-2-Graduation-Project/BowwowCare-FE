import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Examination({ type }) {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState({
    1: "아니요",
    2: "아니요",
    3: "아니요",
    4: "아니요",
    5: "아니요",
  });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (type) {
      // TEST: mockup data
      setQuestions([
        "낯선자가 방문했나요?",
        "영역에 과도하게 집착하고 있나요?",
        "가족을 심하게 졸졸 따라다니나요?",
        "이사를 가거나 새로운 가족 구성원이 생겼나요?",
        "보호자가 아이의 물건을 강제로 빼앗았나요?",
        "먹이가 부족했나요?",
        "보호자가 아이를 힘으로 통제하였나요?"
      ])

      // TODO: GET questions
    }
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/solution", {
      state: {
        answer,
        type,
      },
    });
    console.log(answer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="shadow-lg rounded-2xl px-6 py-8">
          {questions?.map((question, index) => {
            return (
              <div key={index} className="text-sm">
                <li className="mb-2">{question}</li>
                <div className="flex">
                  {/* {x.options.map((options, idx) => (
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
                  ))} */}
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

export default Examination;