import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";

import dayjs from "dayjs";

import Header from "../../components/Header";
import Lens from "../../assets/images/lens.png";
import { behaviorType, colorVariants } from "../../utils/Dictionary";
import { ThemeContext } from "../../context/ThemeProvider";

function CarePage() {
  const location = useLocation();
  const today = dayjs().format("YYYY-MM-DD");
  const [cards, setCards] = useState([]);
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const [careType, setCareType] = useState("aggression");

  useEffect(() => {
    if (location?.state?.type) {
      setCareType(location.state.type);
    }
  }, [location?.state?.type]);

  const getCards = () => {
    if (location?.state?.petId) {
      axios({
        method: "GET",
        url: `${API_URL}/care/${careType}/${location.state.petId}`,
        headers: authHeader(),
      }).then((response) => {
        if (response.status === 200) {
          setCards(response.data);
        }
      });
    }
  };

  useEffect(() => {
    if (careType) {
      getCards();
    }
  }, [careType]);

  const handleMission = (cardId) => (e) => {
    if (careType && location?.state?.petId) {
      axios({
        method: "POST",
        url: `${API_URL}/care/mission/${careType}`,
        headers: authHeader(),
        data: {
          id: cardId,
          missionDate: today,
        },
      }).then((response) => {
        if (response.status === 200) {
          getCards();
          if (response.data?.message) {
            alert(response.data.message);
          } else {
            alert("오늘 미션에 성공하였습니다!");
          }
        }
      });
    }
  };

  const handleChangeCareType = (e) => {
    if (careType === "aggression") {
      setCareType("anxiety");
    } else {
      setCareType("aggression");
    }
  };

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />
      <div
        className={`shadow-md rounded-md ${
          colorVariants["bg" + themeMode + "s"]
        } px-4 py-6 relative`}
      >
        <div className="flex flex-col gap-2">
          <span>솔루션 수행 후에 오늘 미션 도전을 눌러주세요!</span>
          <span>지정된 횟수만큼 미션을 수행하면</span>
          <span>리워드를 드립니다!️</span>
        </div>
        <img
          src={Lens}
          width="120px"
          className="absolute bottom-0 right-0"
          alt="Lens"
        />
      </div>
      <div>
        <div className="shadow-md rounded-md bg-slate-50 w-full mt-8 z-0">
          {careType === "aggression" ? (
            <div>
              <button
                className={`shadow-md rounded-l-md ${
                  colorVariants["bg" + themeMode + "s"]
                } px-4 py-2 w-1/2 z-20`}
              >
                공격 행동
              </button>
              <button
                className="px-4 py-2 w-1/2"
                onClick={handleChangeCareType}
              >
                분리 불안
              </button>
            </div>
          ) : (
            <div className="z-10 w-full">
              <button
                className="px-4 py-2 w-1/2"
                onClick={handleChangeCareType}
              >
                공격 행동
              </button>
              <button
                className={`shadow-md rounded-r-md ${
                  colorVariants["bg" + themeMode + "s"]
                } px-4 py-2 w-1/2 z-20`}
              >
                분리 불안
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-8">
        {cards?.length
          ? cards.map((card) => (
              <div className="shadow-md rounded-md">
                <div
                  className={`px-4 py-2 ${
                    colorVariants["bg" + themeMode]
                  } rounded-t-md shadow-t-md text-white`}
                >
                  {card.modifiedAt}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <span>{card.count}회 / 30회</span>
                    {today === card.missionDate ? (
                      <button
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        disabled
                      >
                        오늘 미션 성공
                      </button>
                    ) : (
                      <button
                        className={`${
                          colorVariants["bg" + themeMode + "s"]
                        } py-2 px-4 rounded-md`}
                        onClick={handleMission(card.id)}
                      >
                        오늘 미션 도전
                      </button>
                    )}
                  </div>
                  <div className="py-4">{card.solution}</div>
                  {careType === "aggression" ? (
                    <div class="flex justify-between overflow-x-hidden w-full">
                      <div class="flex w-full overflow-x-auto [&>div]:flex-shrink-0 pb-2">
                        {card.aggressionType?.map((aggressionType) => (
                          <div
                            className={`rounded-md px-2 ${
                              colorVariants["bg" + aggressionType]
                            }`}
                          >
                            {behaviorType[aggressionType]}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default CarePage;
