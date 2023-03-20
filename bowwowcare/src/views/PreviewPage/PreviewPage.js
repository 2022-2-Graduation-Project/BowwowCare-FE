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
        <div className="h-5/6 flex flex-col justify-between pb-6">
          <div>
            <div className="rounded-md w-full h-[280px] overflow-hidden flex items-center justify-center">
              <img
                className="w-[full] sm:w-[480px] h-[320px] sm:h-[480px] object-cover"
                src={URL.createObjectURL(file)}
                width="100%"
                alt="Uploaded File"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center pb-8">
              <img src={lens} width="160x" alt="Lens" />
            </div>
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
