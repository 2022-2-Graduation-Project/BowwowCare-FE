import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { en2koDictEmotionVerb } from "../../utils/Dictionary";
import happy from "../../assets/images/happy.png";
import Header from "../../components/Header";


function ResultsPage() {
    const location = useLocation();
	const navigate = useNavigate();
    const [file, setFile] = useState();
    const [results, setResults] = useState({ emotion: "SAD" });

    useEffect(() => {
        if (location?.state?.file) {
            setFile(location.state.file);
        }
    }, []);

    useEffect(() => {
        if (file) {
            // TODO: GET results
        }
    }, [file]);

    const handleExamination = () => {
        navigate("/examination", {
			state: {
				"emotion": results?.emotion
			}
		})   
    }

    return (
        <div className="container mx-auto px-8 w-screen h-screen">
          <Header />

            {file ? (
                <div>
                    <div className="h-5/6 flex flex-col justify-between">
                        <img className="rounded-md" src={URL.createObjectURL(file)} width="100%" />
                        <div className="text-center py-4">
                            <div>아이의 현재 감정 상태는</div>
                            <div className="mt-1 text-lg"><span className="font-bold">{en2koDictEmotionVerb[results?.emotion]}</span> 있어요</div>
                        </div>
                        <div className="flex justify-center">
                            <img src={happy} width="240px" />
                        </div>
                    </div>
                    <div className="w-full">
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
