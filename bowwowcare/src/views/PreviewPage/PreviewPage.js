import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";


function PreviewPage() {
    const location = useLocation();
	const navigate = useNavigate();
    const [file, setFile] = useState();

    useEffect(() => {
        if (location?.state?.file) {
            setFile(location.state.file);
            console.log(file)
        }
    }, []);

    const handleGoBack = (e) => {
        navigate(-1);
    }

    const handleAnalysis = (e) => {
        navigate("/results", {
			state: {
				"file": file
			}
		})
    }

    return (
        <div>
            {file ? (
                <div className="container mx-auto w-screen h-screen">
                    <div className="my-4 px-2 flex justify-between items-center">
                        <button onClick={handleGoBack}>
                            <IoIosArrowBack size="2rem" />
                        </button>
                        <div>
                            미리보기
                        </div>
                        <div className="w-8"></div>
                    </div>
                    <img src={URL.createObjectURL(file)} width="100%" />
                    <div className="fixed bottom-10 flex justify-center w-screen">
                        <button 
                            className="h-12 mt-8 w-full mx-8 font-bold rounded-md bg-main-color text-white text-center px-4" 
                            onClick={handleAnalysis}
                        >
                            분석하기
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default PreviewPage
