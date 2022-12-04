import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { IoIosArrowBack, IoIosRadioButtonOn } from "react-icons/io";
import Header from "../../components/Header";


const videoConstraints = {
  width: "100%",
  facingMode: "environment",
};

function CameraPage() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    // convert URL to File
    fetch(imageSrc).then(
      async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], "image", { contentType });

        if (file) {
          navigate("/preview", {
            state: {
              file: file,
            },
          });
        }
      },
      [webcamRef]
    );
  });

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleGoBack = (e) => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />

      {/* <div className="my-4 px-2 flex justify-between items-center">
        <button onClick={handleGoBack}>
          <IoIosArrowBack size="2rem" />
        </button>
      </div> */}
      <div className="h-5/6 flex flex-col justify-between items-center">
        <div className="flex justify-center">
          <Webcam className="align-middle"
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            onUserMedia={onUserMedia}
            mirrored={true}
            videoConstraints={videoConstraints}
          />
        </div>
        <div className="w-screen text-center">
          <button onClick={capturePhoto}><IoIosRadioButtonOn size="4rem" className="text-main-color"/></button>
        </div>
      </div>
    </div>
  );
}

export default CameraPage;
