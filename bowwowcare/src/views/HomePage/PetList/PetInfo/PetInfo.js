import React from 'react'

import { getAge } from '../../../../utils/Calculator';
import { getBwDate } from '../../../../utils/Calculator';

function PetInfo(props) {

  const birthDate = new Date( Date.parse(props.pet.birthDate) );
  const adoptDate = new Date( Date.parse(props.pet.adoptDate) );

  const age = getAge(birthDate);
  const day = getBwDate(adoptDate);

  return (
    <div className='flex shadow-lg mt-6 p-8 rounded-lg'>
      <div className="rounded-full border w-14 h-14">
                    {props.pet.fileImg && (
                      <img
                        src={URL.createObjectURL(props.pet.fileImg)}
                        alt="프로필 이미지"
                        className="rounded-full w-14 h-14"
                      ></img>
                    )}
      </div>
      <div className='ml-5'>
        <span className='text-xl'>{props.pet.petname}</span>
        <span className='text-sm'> {age}살</span>
        <div>함께한지 {day}일째</div>
      </div>
    </div>
  )

}

export default PetInfo
