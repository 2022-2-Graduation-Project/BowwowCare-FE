import React from "react";

import { getAge } from "../../../../utils/Calculator";
import { getDurationDate } from "../../../../utils/Calculator";

function PetInfo(props) {
  const birthDate = new Date(Date.parse(props.pet.birthDate));
  const adoptDate = new Date(Date.parse(props.pet.adoptionDate));

  const age = getAge(birthDate);
  const day = getDurationDate(adoptDate);

  return (
    <div className="flex w-80 h-28 shadow m-1 p-7 rounded-lg ">
      <div className="rounded-full border w-14 h-14">
        {props.pet.fileImg && (
          <img
            src={URL.createObjectURL(props.pet.fileImg)}
            alt="프로필 이미지"
            className="rounded-full w-14 h-14"
          ></img>
        )}
      </div>
      <div className="ml-5">
        <span className="text-xl">{props.pet.name}</span>
        <span className="text-sm"> {age}살</span>
        <div>함께한지 {day}일째</div>
      </div>
    </div>
  );
}

export default PetInfo;
