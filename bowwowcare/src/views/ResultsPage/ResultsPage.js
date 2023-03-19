/*global kakao*/
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, FAST_API_URL } from "../../Config";
import { en2koDictEmotionVerb } from "../../utils/Dictionary";
import Header from "../../components/Header";
import HAPPY from "../../assets/images/happy.png";
import SAD from "../../assets/images/sad.png";
import ANGRY from "../../assets/images/angry.png";
import kakaotalk from "../../assets/images/kakaotalk.png";
import { ThemeContext } from "../../context/ThemeProvider";
import { colorVariants } from "../../utils/Dictionary";

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [emotion, setEmotion] = useState();
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useContext(ThemeContext);

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
        method: "post",
        url: `${FAST_API_URL}/predict`,
        data: formData,
      })
        .then((response) => {
          if (response.status === 200 && response.data?.emotion) {
            setEmotion(response.data.emotion);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [file]);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js";
    script.async = true;
    script.onload = () => setLoading(false);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [emotion]);

  useEffect(() => {
    if (!loading) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, [loading]);

  const shareKakao = async () => {
    let thumbnail = "";

    const formData = new FormData();
    formData.append("file", file);

    await axios({
      method: "POST",
      url: `${API_URL}/image`,
      data: formData,
    }).then((response) => {
      if (response.status === 200) {
        thumbnail = response.data.url;
      }
    });

    await window.Kakao.Share.sendCustom({
      templateId: 89326,
      templateArgs: {
        PROFILE_NAME: `아이가 ${en2koDictEmotionVerb[emotion]} 있어요 🐶`,
        THUMBNAIL: thumbnail,
      },
    });
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />

      {file && emotion ? (
        <div className="h-5/6 flex flex-col justify-between">
          <div>
            <div className="w-full h-[240px] overflow-hidden">
              <img
                className="rounded-md w-[full] h-[300px] mt-[-35px]"
                src={URL.createObjectURL(file)}
                width="100%"
                alt="Uploaded File"
              />
            </div>
            <div className="text-center pt-8">
              <div className="mt-1 text-lg">
                아이가
                <span className="font-bold">
                  &nbsp;{en2koDictEmotionVerb[emotion]}&nbsp;
                </span>
                있어요
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center">
              {emotion === "POSITIVE" ? (
                <img src={HAPPY} width="200px" alt="Happy Dog" />
              ) : emotion === "SAD" ? (
                <img src={SAD} width="200px" alt="Sad Dog" />
              ) : emotion === "ANGRY" ? (
                <img src={ANGRY} width="200px" alt="Angry Dog" />
              ) : null}
            </div>
            {emotion === "SAD" || emotion === "ANGRY" ? (
              <div className="text-center">
                <div>아이의 감정 상태가 좋지 않아요.</div>
                <div>홈 화면으로 돌아가서 이상행동을 진단해보세요 👀</div>
              </div>
            ) : (
              <div className="text-center pb-1">
                {en2koDictEmotionVerb[emotion]}있는 아이의 모습을 공유해보세요
                ✨
              </div>
            )}
            {loading ? (
              <div>
                <p>...</p>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-4 w-full my-8">
                <button
                  className={`flex-1 h-12 font-bold rounded-md border-2 ${
                    colorVariants["border" + themeMode]
                  } text-center`}
                  onClick={handleHome}
                >
                  <div>처음으로</div>
                </button>
                <button
                  onClick={shareKakao}
                  className={`flex-1 h-12 font-bold rounded-md flex justify-center items-center ${
                    colorVariants["bg" + themeMode]
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={kakaotalk} width="32px" alt="Kakaotalk" />
                    <div className="text-white mr-1">공유하기</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ResultsPage;
