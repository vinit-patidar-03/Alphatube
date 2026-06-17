/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { fetchData } from "../API/YoutubeAPI";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../context/Context";
import { formatViewCount } from "../utils/videoHelpers";
import { FaEye, FaThumbsUp } from "react-icons/fa";

const VideoPlayer = () => {
  const { channel, setChannel, theme } = useContext(Context);
  const { id, cid } = useParams();
  const Navigate = useNavigate();
  const [videodetail, setVideoDetail] = useState("");

  useEffect(() => {
    fetchDetails(id);
    fetchChannel(cid);
  }, [id, cid]);

  const gotoChannel = () => {
    Navigate(`/channelDetails/${cid}`);
  };

  const fetchDetails = (Id) => {
    fetchData(`video/info?id=${Id}&extend=2`).then((res) => {
      setVideoDetail(res.data);
    });
  };

  const fetchChannel = (Id) => {
    fetchData(`channel/home?id=${Id}`).then((res) => {
      setChannel(res.data);
    });
  };

  return (
    <>
      {videodetail.length !== 0 && channel ? (
        <div
          className={`flex flex-col relative w-full mt-[60px] lg:mx-2 lg:w-[calc(70%-1rem)] lg:h-[calc(100vh-110px)] md:w-[100vw] md:h-[90vh] h-[50vh] sm:h-[70vh] bg-${theme === "light" ? "white" : "black"
            } text-${theme === "light" ? "black" : "white"}`}
        >
          <div className="w-full h-full">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              playing={true}
              width="100%"
              height="100%"
              controls
            />
          </div>
          <h1 className="md:text-lg text-sm font-semibold mt-2 ml-2">
            {videodetail.title}
          </h1>
          <div className="flex mt-2 relative items-center ml-2">
            <img
              src={channel.meta.avatar[0].url}
              width="40px"
              className="rounded-full self-start"
              alt="channel"
            />
            <div
              onClick={() => {
                gotoChannel();
              }}
            >
              <h4 className="flex font-bold ml-2 cursor-pointer">
                {videodetail.channelTitle}{" "}
                <img
                  src="/images/verify.webp"
                  width="20px"
                  className="self-center mx-2"
                  alt="verify"
                />
              </h4>
              <div className="flex gap-5">
                {channel.meta.subscriberCountText && (
                  <h1 className="ml-2 text-sm">
                    {channel.meta.subscriberCountText} subscribers
                  </h1>
                )}
                <div className="text-sm ml-2 flex items-center gap-2">
                  <FaEye className="text-lg" />
                  {formatViewCount(videodetail.viewCount)} views
                </div>
                <div className="text-sm ml-2 flex items-center gap-2">
                  <FaThumbsUp className="text-lg" />
                  {formatViewCount(videodetail.likeCount)} likes
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default VideoPlayer;
