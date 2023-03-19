import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Header from "../../components/Header";
import lens from "../../assets/images/lens.png";
import Button from "../../components/Button";
import { ThemeContext } from "../../context/ThemeProvider";

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  useEffect(() => {
    if (location?.state?.file) {
      setFile(location.state.file);
      console.log(file);
    }
  }, []);

  const handleGoBack = (e) => {
    navigate(-1);
  };

  const handleAnalysis = (e) => {
    navigate("/results", {
      state: {
        file: file,
      },
    });
  };

  return (
    <div className="container mx-auto w-screen h-screen px-8">
      <Header />

      {file ? (
        <div className="h-5/6 flex flex-col justify-between">
          <div>
            {/* <div className="my-4 flex justify-between items-center">
                            <button onClick={handleGoBack}>
                                <IoIosArrowBack size="2rem" />
                            </button>
                            <div>
                                미리보기
                            </div>
                            <div className="w-8"></div>
                        </div> */}
            <img
              className="rounded-md"
              src={URL.createObjectURL(file)}
              width="100%"
            />
          </div>
          <div className="w-full">
            <div className="flex justify-center pb-8">
              <img src={lens} width="180x" />
            </div>

            {/* <button 
                            className="h-12 w-full font-bold rounded-md bg-main-color text-white text-center" 
                            onClick={handleAnalysis}
                        >
                            분석하기
                        </button> */}
            <Button onClick={handleAnalysis} bgColor={themeMode}>
              분석하기
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PreviewPage;
