import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Lens from '../../assets/images/lens.png'
import dayjs from 'dayjs';
import { behaviorType } from '../../utils/Dictionary';

function CarePage({ type="aggression" }) {
    const [cards, setCards] = useState([]);
    const today = dayjs().format("YYYY-MM-DD");

    useEffect(() => {
        // TODO: GET cards
        setCards([
            {
                "id": 1,
                "count": 3,
                "missionDate": "",
                "solution": "아이만의 공간을 만들어 그곳에서 편히 먹거나 쉬도록 켄넬교육을 시켜보세요.",
                "aggressionType": [0],
                "modifiedAt": "2023-02-28"
            },
            {
                "id": 1,
                "count": 4,
                "missionDate": "2023-02-28",
                "solution": "사회화 시기에 사람, 다른 동물 등에 대한 사회화의 기회가 없는 경우에 발생할 수 있습니다. 낯선 사람이 간식을 줘보도록 해보세요.",
                "aggressionType": [1, 2],
                "modifiedAt": "2023-02-24"
            },
        ]);
    }, []);

    const handleMission = (e) => {
        // TODO: POST mission
        alert("오늘 미션에 성공하였습니다!");
    }

    return (
        <div className="container mx-auto px-8 w-screen h-screen">
            <Header />
            <div className="shadow-md rounded-md bg-secondary px-4 py-6 relative">
                <div className="flex flex-col gap-2">
                    <span>솔루션 수행 후에 오늘 미션 도전을 눌러주세요!</span>
                    <span>지정된 횟수만큼 미션을 수행하면</span>
                    <span>리워드를 드립니다!️</span>
                </div>
                <img src={Lens} width="120px" className="absolute bottom-0 right-0" />
            </div>
            <div className="flex flex-col gap-6 mt-8">
                {cards?.length ? cards.map(card => 
                    <div className="shadow-md rounded-md">
                        <div className="px-4 py-2 bg-main-color rounded-t-md shadow-t-md text-white">{card.modifiedAt}</div>
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <span>{card.count}회 / 30회</span>
                                {today === card.missionDate ? (
                                    <button className="bg-gray-200 py-2 px-4 rounded-md" disabled>오늘 미션 성공</button>
                                ) : (
                                    <button className="bg-secondary py-2 px-4 rounded-md" onClick={handleMission}>오늘 미션 도전</button>
                                )}
                            </div>
                            <div className="py-4">{card.solution}</div>
                            {type==="aggression" ? (
                                <div class="flex justify-between overflow-x-hidden w-full">
                                    <div class="flex w-full overflow-x-auto [&>div]:flex-shrink-0 pb-2">
                                        {card.aggressionType?.map(aggressionType => 
                                            <div className={`rounded-md px-2 bg-aggression${aggressionType}`}>{behaviorType[aggressionType]}</div>
                                        )}
                                    </div>
                                </div>
                            ) : null} 
                            </div>
                        </div>
                ) : null}
            </div>
        </div>
    )
}

export default CarePage
