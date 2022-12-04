import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { en2koDictEmotionVerb } from "../../utils/Dictionary";
import HAPPY from "../../assets/images/happy.png";
import SAD from "../../assets/images/sad.png";
import Header from "../../components/Header";


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
                        <div className="flex justify-center pb-8">
                            {emotion === "HAPPY" ? (
                                <img src={HAPPY} width="280px" />
                            ) : (
                            emotion === "SAD" ? (
                                <img src={SAD} width="280px" />
                            ) : null)}
                        </div>
                        <button 
                            className="h-12 w-full font-bold rounded-md bg-main-color text-white text-center" 
                            onClick={handleExamination}
                        >
                            문진하기
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ResultsPage
