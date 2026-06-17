import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import VideoDurationBadge from "./VideoDurationBadge";
import Loader from "./Loader";

const PlaylistVideoCard = (props) => {
  const { video } = props;
  const Navigate = useNavigate();
  const { theme } = useContext(Context);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const Render = () => {
    Navigate(`/video/${video.videoId}/${video.channelId}`);
  };
  return (
    <>
      <div
        className={`flex flex-col md:w-[calc(33.33%-0.333rem)] lg:w-[calc(25%-0.375rem)] sm:w-[calc(50%-0.25rem)] w-full text-${theme === "light" ? "black" : "white"
          }  text-sm sm:text-xs`}
      >
        <div className="w-full relative">
          {!thumbnailLoaded && <Loader />}
          <img
            src={video?.thumbnail[2]?.url || video?.thumbnail[0]?.url}
            onClick={Render}
            className="w-full h-52 sm:rounded-xl object-cover cursor-pointer"
            onLoad={() => setThumbnailLoaded(true)}
            onError={() => setThumbnailLoaded(true)}
            alt="logo"
          />
          <div className="text-white text-center absolute right-2 bottom-2">
            <VideoDurationBadge video={video} />
          </div>
        </div>
        <div className="flex m-1">
          <div>
            <h4 className="font-semibold">
              {video?.title}
            </h4>
            <div className="my-1">
              <div className="flex ">
                <h4 className="font-bold">{video.channelTitle} </h4>
                <img
                  src="/images/verify.webp"
                  className="self-center mx-2 w-3"
                  alt="verify"
                />
              </div>
              <div className="mt-1">
                {video.isLive ? (
                  <img src="/images/live.png" className="w-4" alt="live" />
                ) : (
                  <h4>
                    {video.viewCountText} • {video.publishedTimeText}{" "}
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistVideoCard;
