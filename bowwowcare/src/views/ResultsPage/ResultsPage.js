import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { en2koDictEmotionVerb } from "../../utils/Dictionary";
import happy from "../../assets/images/happy.png";


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
        <div className="container mx-auto w-screen h-screen">
            {file ? (
                <div>
                    <div className="m-8">
                        <img className="rounded-md" src={URL.createObjectURL(file)} width="100%" />
                    </div>
                    <div className="text-center py-4">
                        <div>아이의 현재 감정 상태는</div>
                        <div className="mt-1 text-lg"><span className="font-bold">{en2koDictEmotionVerb[results?.emotion]}</span> 있어요</div>
                    </div>
                    <div className="flex justify-center">
                        <img src={happy} width="240px" />
                    </div>
                    <div className="fixed bottom-10 flex justify-center w-screen">
                        <button 
                            className="h-12 mt-8 w-full mx-8 font-bold rounded-md bg-main-color text-white text-center px-4" 
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
