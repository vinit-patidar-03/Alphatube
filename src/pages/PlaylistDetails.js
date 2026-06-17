/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../API/YoutubeAPI";
import PlaylistVideoCard from "../components/PlaylistVideoCard";
import Context from "../context/Context";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";

const PlaylistDetails = (props) => {
  const { pid } = useParams();
  const { theme } = useContext(Context);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [channelPlaylistsVideos, setChannelPlaylistsVideos] = useState();
  useEffect(() => {
    fetchPlaylistVideos();
  }, []);

  const fetchPlaylistVideos = () => {
    fetchData(`playlist?id=${pid}`).then((res) => {
      setChannelPlaylistsVideos(res.data);
    });
  };
  return (
    <>
      {channelPlaylistsVideos ? (
        <div className="mb-[50px]">
          <div className="flex sm:p-2">
            {channelPlaylistsVideos && (
              <div
                className={`mt-[80px] w-full rounded-lg flex flex-wrap md:flex-nowrap text-${theme === "light" ? "black" : "white"
                  }`}
                style={{
                  backgroundColor: `${theme === "light" ? "#FFFBF5" : "#141414"
                    }`,
                }}
              >
                <div className=" w-full lg:w-[calc(25%-0.375rem)] md:w-[calc(33.33%-0.333rem)] sm:w-[calc(50%-0.25rem)] relative">
                  {!thumbnailLoaded && <Loader />}
                  <img
                    src={
                      channelPlaylistsVideos?.meta?.thumbnail[3]?.url ||
                      channelPlaylistsVideos?.meta?.thumbnail[0]?.url
                    }
                    onLoad={() => setThumbnailLoaded(true)}
                    onError={() => setThumbnailLoaded(true)}
                    className=" w-full"
                    alt="thumbnail"
                  />
                  <div className="absolute right-2 bottom-2">
                    <img
                      src="/images/playlist.webp"
                      className="w-7"
                      alt="playlist"
                    />
                  </div>
                </div>
                <div className="m-2 ">
                  <h1 className="font-bold text-lg">
                    {channelPlaylistsVideos.meta.title}
                  </h1>
                  <h3 className="font-semibold text-sm">
                    {channelPlaylistsVideos.meta.channelTitle}
                  </h3>
                  <div className="flex mt-3">
                    <h5 className="text-xs">
                      {channelPlaylistsVideos.meta.videoCountText}
                    </h5>
                    <h5 className="text-xs ml-3">
                      {channelPlaylistsVideos.meta.viewCountText}
                    </h5>
                    <h5 className="text-xs ml-3">
                      {channelPlaylistsVideos.meta.lastUpdated}
                    </h5>
                  </div>
                </div>
              </div>
            )}
          </div>

          <hr className="my-3 mx-3 h-[2px] bg-black" />

          <div className="flex flex-wrap gap-2 sm:p-2">
            {channelPlaylistsVideos &&
              channelPlaylistsVideos.data.map((elem, index) => {
                return <PlaylistVideoCard video={elem} key={index} />;
              })}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PlaylistDetails;
