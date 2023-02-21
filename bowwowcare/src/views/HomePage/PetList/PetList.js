import React from "react";
import { Link, useNavigate } from "react-router-dom";

import PetInfo from "./Sections/PetInfo";

function PetList(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return user ? (
    <div className="flex overflow-x-scroll">
      {props.pets.map((pet, i) => {
        return (
          <Link to={`/petinfo/${pet.id}`} state={{ pet: pet }}>
            <PetInfo pet={pet} key={i} />
          </Link>
        );
      })}
      <div>
        <button
          className="w-80 h-28 shadow m-1 rounded-lg border-gray-300 hover:border-main-color text-gray-300 bg-transparent pl-4"
          onClick={() => navigate("/addition")}
        >
          <p>+</p>가족을 추가해주세요
        </button>
      </div>
    </div>
  ) : (
    <div>
      <button
        className="w-80 h-28 shadow m-1 rounded-lg border-gray-300 hover:border-main-color text-gray-300 bg-transparent pl-4"
        onClick={() => navigate("/addition")}
      >
        <p>+</p>가족을 추가해주세요
      </button>
    </div>
  );
}

export default PetList;
