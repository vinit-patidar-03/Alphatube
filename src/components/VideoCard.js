import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import VideoDurationBadge from "./VideoDurationBadge";
import { formatViewCount } from "../utils/videoHelpers";
import Loader from "./Loader";

const VideoCard = (props) => {
  const Navigate = useNavigate();
  const [thubnailLoaded, setThubnailLoaded] = useState(false);
  const { video } = props;
  const { theme } = useContext(Context);

  const Render = () => {
    Navigate(`/video/${video.videoId}/${video.channelId}`);
  };

  const gotoChannel = () => {
    Navigate(`/channelDetails/${video.channelId}`);
  };

  return (
    <>
      <div className="lg:w-[calc(25%-0.375rem)] md:w-[calc(33.33%-0.333rem)] sm:w-[calc(50%-0.25rem)] w-full">
        <div className="flex flex-col">
          <div className="w-full relative">
            {!thubnailLoaded && (
              <Loader />
            )}
            <img
              src={video?.thumbnail[1]?.url || 'images/images.webp'}
              className="w-full h-52 sm:rounded-xl object-cover object-center cursor-pointer"
              loading="lazy"
              onLoad={() => setThubnailLoaded(true)}
              onError={() => setThubnailLoaded(true)}
              onClick={Render}
              alt="logo"
            />
            <div className="text-white text-center absolute right-2 bottom-2">
              <VideoDurationBadge video={video} className="text-xs" />
            </div>
          </div>
          <div
            className={`flex my-2 px-2 text-${theme === "light" ? "black" : "white"
              }`}
          >
            {video.channelThumbnail && (
              <img
                src={video.channelThumbnail[0].url}
                className="rounded-full self-start w-[40px]"
                alt=""
              />
            )}
            <div className="mx-3  text-sm sm:text-xs">
              <h4 className="font-semibold">
                {video?.title}
              </h4>
              <div className="my-1 text-gray-00">
                <div className="flex">
                  <h4
                    className="font-bold cursor-pointer"
                    onClick={gotoChannel}
                  >
                    {video.channelTitle}{" "}
                  </h4>
                  <img
                    src="./images/verify.webp"
                    className="self-center mx-2 w-3 h-auto"
                    alt="verify"
                  />
                </div>
                <div className="mt-1">
                  {video.isLive ? (
                    <img src="/images/live.webp" className="w-4" alt="live" />
                  ) : (
                    <h4>
                      {formatViewCount(video.viewCount)} •{" "}
                      {video.publishedTimeText}{" "}
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
