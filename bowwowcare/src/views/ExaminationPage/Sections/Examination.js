import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";


function Examination({ type }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (type) {
      // TEST: mockup data
      setQuestions([
        { "id": 1, "content": "낯선자가 방문했나요?" },
        { "id": 2, "content": "영역에 과도하게 집착하고 있나요?" },
        { "id": 3, "content": "가족을 심하게 졸졸 따라다니나요?" },
        { "id": 4, "content": "이사를 가거나 새로운 가족 구성원이 생겼나요?" },
        { "id": 5, "content": "보호자가 아이의 물건을 강제로 빼앗았나요?" },
        { "id": 6, "content": "먹이가 부족했나요?" },
        { "id": 7, "content": "보호자가 아이를 힘으로 통제하였나요?" }
      ])

      // TODO: GET questions
    }
  }, [type]);

  useEffect(() => {
    if (questions) {
      setResponses(questions?.map(question => ({ [`aggression${question.id}`]: false })));
    }
  }, [questions]);

  const handleChangeResponse = (index, id) => (e) => {
    let array = [...responses];
    array[index][`aggression${id}`] = JSON.parse(e.target.value);
    setResponses(array);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/solution", {
      state: {
        responses,
        type,
      },
    });
    console.log(responses);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="shadow-lg rounded-2xl px-6 py-8">
          {responses?.length === questions?.length && questions?.map((question, index) => {
            return (
              <div key={question.id} className="text-sm">
                <li className="mb-2">{question.content}</li>
                <fieldset>
                  <div className="flex">

                      <div className="mr-8 mb-4">
                        <label>
                          <input
                            type="radio"
                            value={true}
                            name={`${question.id}`}
                            onChange={handleChangeResponse(index, question.id)}
                            className="mr-2 accent-main-color"
                            checked={responses[index][`aggression${question.id}`]}
                          />
                          {`예`}
                        </label>
                      </div>

                      <div className="mr-8 mb-4">
                        <label>
                          <input
                            type="radio"
                            value={false}
                            name={`${question.id}`}
                            onChange={handleChangeResponse(index, question.id)}
                            className="mr-2 accent-main-color"
                            checked={responses[index][`aggression${question.id}`] === false}
                          />
                          {`아니요`}
                        </label>
                      </div>
                      
                  </div>
                </fieldset>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-8 w-5/6">
          <Button
            type="submit"
          >
            제출하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Examination;