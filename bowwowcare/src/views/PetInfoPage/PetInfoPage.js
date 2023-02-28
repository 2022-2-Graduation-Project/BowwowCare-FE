import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../../Config';
import { useLocation, useNavigate, useParams} from "react-router-dom";

import Header from '../../components/Header';
import Button from '../../components/Button';
import lens from '../../assets/images/lens.png'

function PetInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [petInfo, setPetInfo] = useState('')
  const [petname, setPetname] = useState('')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('');
  const [adoptDate, setAdoptDate] = useState('');
  const [fileImg, setFileImg] = useState('')

  const pet = location.state.pet;

  useEffect(() => {
    getPetDetail();
  }, []);

  const getPetDetail = () => {
    axios({
      method: 'get',
      url: `${API_URL}/pets/${pet.petId}`
    })
    .then(response => {
      if (response.status===200) {
        const pet = response.data;
        setPetInfo(pet);
        setPetname(pet.name)
        if(pet.gender === 'FEMALE') setGender('여')
        else if(pet.gender === 'MALE') setGender('남')
        else setGender('중성')
        setBirthDate(pet.birthDate)
        setAdoptDate(pet.adoptionDate)
        setFileImg(pet.petImg)
      }
    })
  };

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
            <tbody>
              <tr>
                <td>태어난 날</td>
                <td>{birthDate}</td>
              </tr>
              <tr>
                <td>가족이 된 날</td>
                <td>{adoptDate}</td>
              </tr>
          </tbody>
        </table>
        </div>
        </div>
        {
          // TODO: 편집 버튼 위치&모양 조정 ...?
        }
        <div className="text-center">
          <p onClick={()=>navigate(`/edit/${params.id}`, { state: petInfo })}>편집</p>
        </div>

      <div className=" absolute bottom-8 w-5/6">
        <div className="flex justify-center">
            <img src={lens} width="100px"></img>
        </div>
        <Button children="멍멍케어 시작하기" ></Button>
      </div>
    </div>
    </div>
    </div>
  )
}

export default PetInfoPage
