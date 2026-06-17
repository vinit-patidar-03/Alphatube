/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router-dom";
import { fetchData } from "../API/YoutubeAPI";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";

const ShortVideos = () => {
  const { id, cid } = useParams();
  const location = useLocation();
  const { shortscategory } = useContext(Context);
  const [shorts, setShorts] = useState([]);
  const [shortNo, setShortNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    fetchshortsData();
    setShortNo(0);
    setPlayerReady(false);
  }, [location]);

  const fetchshortsData = async () => {
    setLoading(true);
    if (cid !== shortscategory && id === ":id") {
      const res = await fetchData(`search?query=${shortscategory}`);
      setShorts(
        res.data.data.filter((elem) => {
          return elem.type === "shorts_listing";
        })[0].data
      );
    } else if (shortscategory === cid && id === ":id") {
      const res = await fetchData(`channel/shorts?id=${shortscategory}`);
      setShorts(res.data.data);
    }
    setLoading(false);
  };

  const changeShortPage = (e) => {
    if (e === "incr" && shortNo !== shorts.length - 1) {
      setShortNo(shortNo + 1);
    } else if (e === "decr" && shortNo !== 0) {
      setShortNo(shortNo - 1);
    } else if (e === "incr" && shortNo === shorts.length - 1) {
      setShortNo(0);
    } else if (e === "decr" && shortNo === 0) {
      setShortNo(shorts.length - 1);
    }
  };

  if (id !== ":id") {
    return (
      <>
        <div className="flex justify-center items-center min-h-[100vh] px-3 py-5">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl h-[calc(100vh-160px)] w-[min(420px,calc(0.5625*(100vh-140px)))]">
            {!playerReady && <Loader />}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              playing={true}
              loop={true}
              width="100%"
              height="100%"
              onReady={() => setPlayerReady(true)}
              onError={() => setPlayerReady(true)}
              playsinline
            />
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        {shorts.length !== 0 ? (
          <div className="flex justify-center items-center min-h-[100vh] px-3 py-5">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black h-[calc(100vh-160px)] w-[min(420px,calc(0.5625*(100vh-140px)))]">
              {!playerReady && <Loader />}
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${shorts[shortNo].videoId}`}
                playing={true}
                loop={true}
                width="100%"
                height="100%"
                onReady={() => setPlayerReady(true)}
                onError={() => setPlayerReady(true)}
                playsinline
              />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 pointer-events-none">
                <button
                  type="button"
                  className="pointer-events-auto rounded-full bg-black/50 backdrop-blur-sm text-white p-3 text-2xl hover:bg-black/70 transition"
                  onClick={() => {
                    changeShortPage("decr");
                  }}
                  aria-label="Previous short"
                >
                  <FaArrowCircleLeft />
                </button>
                <button
                  type="button"
                  className="pointer-events-auto rounded-full bg-black/50 backdrop-blur-sm text-white p-3 text-2xl hover:bg-black/70 transition"
                  onClick={() => {
                    changeShortPage("incr");
                  }}
                  aria-label="Next short"
                >
                  <FaArrowCircleRight />
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                <p className="text-white font-bold text-sm line-clamp-2">
                  {shorts[shortNo].title}
                </p>
                <p className="text-white/80 text-xs mt-1">
                  {shorts[shortNo].viewCountText}
                </p>
              </div>
            </div>
          </div>
        ) :
          loading ? <Spinner /> : <h1 className=" mt-20 font-bold text-lg text-center">No Shorts Posted</h1>
        }
      </>
    )
  }
};

export default ShortVideos;
