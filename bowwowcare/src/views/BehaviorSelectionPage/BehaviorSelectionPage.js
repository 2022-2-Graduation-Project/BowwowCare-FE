import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from "../../components/Header";
import SelectMenu from "./Sections/SelectMenu";
import ButtonGroups from "./Sections/ButtonGroups";
import HAPPY from "../../assets/images/happy.png";
import Button from "../../components/Button";


function BehaviorSelectionPage() {  // type: aggression || anxiety
	const navigate = useNavigate();
    const location = useLocation();
    const [pets, setPets] = useState([]);
    const [type, setType] = useState([]);
    const [selectedPet, setSelectedPet] = useState({});
    const [behaviors, setBehaviors] = useState([]);
    const [selectedBehaviors, setSelectedBehaviors] = useState([]);
    const [abnormal, setAbnormal] = useState(false);
    

    useEffect(() => {
        // TEST: Mockup Data
        setPets([
            {"petId": 1, "petName": "첫 번째 강쥐", "petImage": HAPPY},
            {"petId": 2, "petName": "두 번째 강쥐", "petImage": HAPPY},
        ]);
        setBehaviors([
            {"id": 1, "type": 0, "content": "헐떡이며 숨쉬기"},
            {"id": 2, "type": 0, "content": "동공확장"},
            {"id": 3, "type": 0, "content": "몸 떨기"},
            {"id": 4, "type": 0, "content": "털 세우기"},
            {"id": 5, "type": 1, "content": "입 다물기"},
            {"id": 6, "type": 1, "content": "경직되기"},
            {"id": 7, "type": 1, "content": "짖기"},
            {"id": 8, "type": 1, "content": "응시하기"},
            {"id": 9, "type": 2, "content": "이빨 보이기"},
            {"id": 10, "type": 2, "content": "도망/철수"},
            {"id": 11, "type": 2, "content": "달려들기 & 한 번 물기"},
        ]);

        // TODO: GET pets
        // TODO: GET behaviors

    }, []);

    useEffect(() => {
        if (location?.state?.type) {
            setType(location.state.type);
        }
    },[])

    useEffect(() => {
        if (pets) {
            setSelectedPet(pets[0]);
        }
    }, [pets]);

    useEffect(() => {
        if (behaviors) {
            setSelectedBehaviors(behaviors.map(item => ({ ...item, isDeleted: true })));
        }
    }, [behaviors]);

    const showBehaviors = (e) => {
        if (selectedBehaviors.some(item => item.isDeleted === false)) {
            setAbnormal(true);
        }
    }

    const handleExamination = () => {
        navigate("/examination", {
			state: {
				"type": type,
				// "type": "anxiety",  // TEST
			}
		})   
    }

    const sendBehaviors = (e) => {
        // POST behaviors   
    }
    

    return (
        <div className="container mx-auto w-screen h-screen px-8">
            <Header />
            <div className="h-5/6 flex flex-col justify-between">
                <div className="h-2/3">
                    <div className="mt-4 mb-2">어떤 아이의 이상행동을 확인하는 건가요?</div>
                    <SelectMenu abnormal={abnormal} pets={pets} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
                    <div className="mt-4 mb-2">아이가 어떤 <span className="font-bold">행동</span>을 보이고 있나요?</div>
                    <ButtonGroups abnormal={abnormal} behaviors={behaviors} selectedBehaviors={selectedBehaviors} setSelectedBehaviors={setSelectedBehaviors} />
                </div>
                <div className="w-full">
                    {abnormal ? (
                        <div className="text-center mb-4">
                            <span>문진을 통해 공격 행동 교정을 위한 <br/></span>
                            <span>솔루션을 얻어볼까요?</span>
                        </div>
                    ) : null}
                    <Button onClick={!abnormal ? showBehaviors : handleExamination}>다음</Button>
                </div>
            </div>
        </div>
    )
}

export default BehaviorSelectionPage
