import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import SelectMenu from "./Sections/SelectMenu";
import HAPPY from "../../assets/images/happy.png";

function BehaviorSelectionPage() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState({});

    useEffect(() => {
        // TEST: Mockup Data
        setPets([
            {"petId": 1, "petName": "첫 번째 강쥐", "petImage": HAPPY},
            {"petId": 2, "petName": "두 번째 강쥐", "petImage": HAPPY},
        ]);

        // TODO: GET pets
        
    }, []);

    useEffect(() => {
        if (pets) {
            setSelectedPet(pets[0]);
        }
    }, [pets]);

    return (
        <div className="container mx-auto w-screen h-screen px-8">
            <Header />
            <div className="mt-12 mb-6">어떤 아이의 이상행동을 확인하는 건가요?</div>
            <SelectMenu pets={pets} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
        </div>
    )
}

export default BehaviorSelectionPage
