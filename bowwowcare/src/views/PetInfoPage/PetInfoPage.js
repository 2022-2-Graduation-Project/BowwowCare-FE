import React from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Header from '../../components/Header';
import Button from '../../components/Button';

function PetInfoPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const pet = location.state.pet;
  const petname = location.state.pet.name;
  const gender = location.state.pet.gender;
  const birthDate = location.state.pet.birthDate.substring(0,10).split('-').join('.');
  const adoptDate = location.state.pet.adoptionDate.substring(0,10).split('-').join('.');
  const fileImg = location.state.pet.petImg;

  return (
    <div className="px-8">
      <Header />
      <div className='flex justify-center mt-30'>
        <div className='flex flex-col w-full'>
          <div className='text-center'>
            <div className='flex justify-center'>
            <div className="rounded-full border w-14 h-14 mb-5">
                    {fileImg && (
                      <img
                        src={fileImg}
                        alt="프로필 이미지"
                        className="rounded-full w-14 h-14"
                      ></img>
                    )}
      </div>
            </div>
          

      <div className='text-xl mb-5'>{petname}</div>
      <div className='flex justify-center'>
        <div className='text-sm mb-10 border w-28 p-2 rounded-lg'>{gender}</div>
      </div>
      
      </div>
      <div className='mb-10'>
        <div className='flex justify-center'>
          <table className='border-separate border-spacing-3'>
          <tr>
            <td>태어난 날</td>
            <td>{birthDate}</td>
          </tr>
          <tr>
            <td>가족이 된 날</td>
            <td>{adoptDate}</td>
          </tr>
        </table>
        </div>
        </div>
          
      <div className='shadow-lg p-10 h-60 mb-10'>
        <span>기록</span>
      </div>
      <Button children="편집" onClick={()=>navigate(`/edit/${params.id}`, { state: pet })}></Button>
    </div>
    </div>
    </div>
  )
}

export default PetInfoPage
