import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../Config";
import authHeader from "../../services/auth-header";
import Header from "../../components/Header";
import SelectMenu from "./Sections/SelectMenu";
import ButtonGroups from "./Sections/ButtonGroups";
import HAPPY from "../../assets/images/happy.png";
import Button from "../../components/Button";


function BehaviorSelectionPage() {  // type: aggression || anxiety
	const navigate = useNavigate();
    const location = useLocation();
    const [pets, setPets] = useState([]);
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
            {"aggressionId": 1, "aggressionType": 0, "content": "헐떡이며 숨쉬기"},
            {"aggressionId": 2, "aggressionType": 0, "content": "동공확장"},
            {"aggressionId": 3, "aggressionType": 0, "content": "몸 떨기"},
            {"aggressionId": 4, "aggressionType": 0, "content": "털 세우기"},
            {"aggressionId": 5, "aggressionType": 1, "content": "입 다물기"},
            {"aggressionId": 6, "aggressionType": 1, "content": "경직되기"},
            {"aggressionId": 7, "aggressionType": 1, "content": "짖기"},
            {"aggressionId": 8, "aggressionType": 1, "content": "응시하기"},
            {"aggressionId": 9, "aggressionType": 2, "content": "이빨 보이기"},
            {"aggressionId": 10, "aggressionType": 2, "content": "도망/철수"},
            {"aggressionId": 11, "aggressionType": 2, "content": "달려들기 & 한 번 물기"},
        ]);

        axios({
            method: 'get',
            url: `${API_URL}/pets`,
            headers: authHeader()
        })
        .then(response => {
            if (response.status === 200) {
                if (response.data?.length) {
                    setPets(response.data);
                }
            }
        })
        .catch(error => {
            console.log(error?.response);
        });

        axios({
            method: 'get',
            url: `${API_URL}/behaviors`,
        })
        .then(response => {
            if (response.status === 200) {
                setBehaviors(response.data);
            }
        })
        .catch(error => {
            console.log(error?.response);
        });
    }, []);

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
				"aggressionType": location.state.type,
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
