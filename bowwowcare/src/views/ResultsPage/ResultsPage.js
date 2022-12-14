import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { en2koDictEmotionVerb } from "../../utils/Dictionary";
import Header from "../../components/Header";
import HAPPY from "../../assets/images/happy.png";
import SAD from "../../assets/images/sad.png";
import instagram from "../../assets/images/instagram.png";
import kakaotalk from "../../assets/images/kakaotalk.png";
import facebook from "../../assets/images/facebook.png";


function ResultsPage() {
    const location = useLocation();
	const navigate = useNavigate();
    const [file, setFile] = useState();
    const [emotion, setEmotion] = useState();

    useEffect(() => {
        if (location?.state?.file) {
            setFile(location.state.file);
        }
    }, []);

    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file, file.name);

            axios({
                method: 'post',
                url: `http://0.0.0.0:8080/api/v1/predict`,  // fastapi
                data: formData
            })
            .then(response => {
                if (response.status === 200 && response.data?.emotion) {
                    setEmotion(response.data.emotion);
                }
            })
            .catch(error => {
                console.log(error.response);
            });
        }
    }, [file]);

    const handleExamination = () => {
        navigate("/examination", {
			state: {
				"emotion": emotion
			}
		})   
    }

    return (
        <div className="container mx-auto px-8 w-screen h-screen">
          <Header />

            {file && emotion ? (
                <div className="h-5/6 flex flex-col justify-between">
                    <div>
                        <img className="rounded-md" src={URL.createObjectURL(file)} width="100%" />
                        <div className="text-center pt-8">
                            <div>아이의 현재 감정 상태는</div>
                            <div className="mt-1 text-lg"><span className="font-bold">{en2koDictEmotionVerb[emotion]}</span> 있어요</div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex justify-center">
                            {emotion === "HAPPY" ? (
                                <img src={HAPPY} width="280px" />
                            ) : (
                            emotion === "SAD" ? (
                                <img src={SAD} width="280px" />
                            ) : null)}
                        </div>
                        {emotion === "SAD" || emotion === "angry" ? (
                            <button 
                                className="mt-8 h-12 w-full font-bold rounded-md bg-main-color text-white text-center" 
                                onClick={handleExamination}
                            >
                                문진하기
                            </button>
                        ) : (
                            <div>
                                <div className="text-center pb-1">{en2koDictEmotionVerb[emotion]}있는 아이의 모습을 공유해보세요 ✨</div>
                                <div className="flex justify-around items-end px-16 h-12">
                                    <button>
                                        <img className="rounded-full" src={kakaotalk} width="32px" />
                                    </button>
                                    <button>
                                        <img className="rounded-full" src={instagram} width="32px" />
                                    </button>
                                    <button>
                                        <img className="rounded-full" src={facebook} width="32px" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ResultsPage
