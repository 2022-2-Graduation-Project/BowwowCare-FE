import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../Config";

import { getAge } from "../../../../utils/Calculator";
import { getDurationDate } from "../../../../utils/Calculator";

function PetInfo(props) {
  const [petName, setPetName] = useState("");
  const [petImg, setPetImg] = useState("");
  const [age, setAge] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    getPetDetail();
  }, []);

  const getPetDetail = () => {
    axios({
      method: 'get',
      url: `${API_URL}/pets/${props.pet.petId}`
    })
    .then(response => {
      if (response.status===200) {
        const pet = response.data;
        setPetName(pet.name);
        setPetImg(pet.petImg);
        const birthDate = new Date(Date.parse(pet.birthDate));
        const adoptionDate = new Date(Date.parse(pet.adoptionDate));
        setAge(getAge(birthDate));
        setDay(getDurationDate(adoptionDate));
      }
    })
  };

  return (
    <div className="flex w-80 h-28 shadow m-1 p-7 rounded-lg ">
      <div className="rounded-full border w-14 h-14">
        {petImg && (
          <img
            src={petImg}
            alt="프로필 이미지"
            className="rounded-full w-14 h-14"
          ></img>
        )}
      </div>
      {petName ? (
        <div className="ml-5">
          <span className="text-xl">{petName}</span>
          <span className="text-sm"> {age}살</span>
          <div>함께한지 {day}일째</div>
        </div>
      ) : null}
    </div>
  );
}

export default PetInfo;
