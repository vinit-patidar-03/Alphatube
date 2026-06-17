import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import Loader from './Loader';

const ShortsCard = (props) => {
  const Navigate = useNavigate();
  const { theme } = useContext(Context)
  const { video } = props;
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const Render = () => {
    Navigate(`/shorts/${video.videoId}/:cid`)
  }
  return (
    <>
      <div className={`flex flex-col relative w-[calc(0.5625*(50vh))]  m-3 text-${theme === 'light' ? 'black' : 'white'}  text-sm sm:text-xs`}>
        <div className='w-full relative'>
          {!thumbnailLoaded && <Loader />}
          <img
            src={video?.thumbnail[3]?.url || video?.thumbnail[0].url}
            onClick={Render}
            className='h-[50vh] w-[calc(0.5625*(50vh))] rounded-xl object-cover cursor-pointer'
            onLoad={() => setThumbnailLoaded(true)}
            onError={() => setThumbnailLoaded(true)}
            alt="logo"
          />
        </div>
        <div className='mt-1 mb-5 text-gray-00 ChannelVideosText'>
          <h4 className='font-bold'>{video?.title}</h4>
          <div className='mt-1'>
            {video.viewCountText && <h4>{video.viewCountText}</h4>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ShortsCard