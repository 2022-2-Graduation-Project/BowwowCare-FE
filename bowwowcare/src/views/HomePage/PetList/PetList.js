import React from 'react'
import { Link } from 'react-router-dom';

import PetInfo from './PetInfo/PetInfo'

function PetList(props) {
  return (
    <div>
      { props.pet.map((a, i)=>{
        return(
        <Link to={`/petinfo/${a.id}`} state={{ pet: a }}>
            <PetInfo pet={a} key={i}/>
        </Link>
        ) 
        })}
    </div>
  )
}

export default PetList
