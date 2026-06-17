import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import VideoDurationBadge from "./VideoDurationBadge";
import { formatViewCount } from "../utils/videoHelpers";
import Loader from "./Loader";

const SuggestVideoCard = (props) => {
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
        className={`sm:w-[calc(50%-0.25rem)] lg:w-[100%] text-${theme === "light" ? "black" : "white"
          }  text-sm sm:text-xs`}
      >
        <div className="flex flex-col mb-5">
          <div className="thumb relative">
            {!thumbnailLoaded && <Loader />}
            <img
              src={video?.thumbnail[1]?.url}
              className="sm:rounded-xl cursor-pointer w-full h-52"
              onClick={Render}
              onLoad={() => setThumbnailLoaded(true)}
              onError={() => setThumbnailLoaded(true)}
              alt="logo"
            />
            <div className="text-white text-center absolute right-2 bottom-2">
              <VideoDurationBadge video={video} />
            </div>
          </div>

          <div className="mx-3">
            <h4 className="mt-2 font-semibold">
              {video?.title}
            </h4>
            <div className="hidden lg:block">
              <div className="flex items-center">
                <h5 className="font-bold">{video?.channelTitle} </h5>
                <img
                  src="/images/verify.webp"
                  className="self-center mx-2 w-3"
                  alt="verify"
                />
              </div>
              {video.isLive ? (
                <h6 className="flex items-center my-2">
                  <img
                    src="/images/live.webp"
                    width="20px"
                    className="mr-2"
                    alt="live"
                  />
                </h6>
              ) : (
                <h6
                  className={`${theme === "light" ? "text-gray-500" : "text-gray-200"
                    } my-1`}
                >
                  {formatViewCount(video?.viewCount)} views •{" "}
                  {video?.publishedTimeText}
                </h6>
              )}
            </div>
            <div className="lg:hidden">
              <div className="flex items-center mt-2">
                {video.channelThumbnail.length !== 0 && (
                  <img
                    src={video?.channelThumbnail[0].url}
                    width="30px"
                    className="rounded-full mr-2"
                    alt="channel"
                  />
                )}
                <h5 className="font-bold">{video?.channelTitle}</h5>{" "}
                <img
                  src="/images/verify.webp"
                  className="self-center mx-2 w-3"
                  alt="verify"
                />
                {video.isLive && (
                  <div className="flex items-center my-2">
                    <img
                      src="/images/live.webp"
                      width="20px"
                      className="mr-2"
                      alt="live"
                    />
                  </div>
                )}
                <p
                  className={`my-2 ${theme === "light" ? "text-gray-500" : "text-gray-200"
                    }`}
                >
                  {formatViewCount(video?.viewCount)} views •{" "}
                  {video?.publishedTimeText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestVideoCard;
