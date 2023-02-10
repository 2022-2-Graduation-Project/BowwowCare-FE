import React from 'react'
import { Link } from 'react-router-dom';

import PetInfo from './Sections/PetInfo'

function PetList(props) {
  return (
    <div>
      { props.pets.map((pet, i)=>{
        return(
        <Link to={`/petinfo/${pet.id}`} state={{ pet: pet }}>
            <PetInfo pet={pet} key={i}/>
        </Link>
        ) 
        })}
    </div>
  )
}

export default PetList