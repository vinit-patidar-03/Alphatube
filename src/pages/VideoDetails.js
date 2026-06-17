import React, { useContext, useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import SuggestVideo from "../components/SuggestedVideos";
import { useParams } from "react-router-dom";
import Context from "../context/Context";
import Spinner from "../components/Spinner";
import { FaArrowUp } from "react-icons/fa";

const VideoDetails = () => {
  const { theme } = useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    moveTotop();
  }, [id]);

  const moveTotop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex relative lg:h-[100vh] flex-col sm:items-center md:items-start lg:flex-row mb-[50px] lg:mb-0">
      <VideoPlayer />
      <SuggestVideo setLoading={setLoading} />
      <div
        className={`fixed right-[10px] bottom-[50px] cursor-pointer flex justify-center items-center rounded-full w-10 h-10 bg-${theme === "light" ? "white" : "black"
          } text-${theme === "light" ? "black" : "white"}`}
        onClick={moveTotop}
      >
        <FaArrowUp className="text-lg" />
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default VideoDetails;
