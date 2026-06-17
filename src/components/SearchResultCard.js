import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context';
import VideoDurationBadge from './VideoDurationBadge';
import { formatViewCount } from '../utils/videoHelpers';
import Loader from './Loader';

const SearchResultCard = (props) => {
  const Navigate = useNavigate();
  const { video } = props;
  const { theme } = useContext(Context);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const Render = () => {
    Navigate(`/video/${video.videoId}/${video.channelId}`)
  }

  return (
    <>
      <div className='my-2 lg:w-[70%] w-full  text-sm sm:text-xs'>
        <div className='flex mb-5 flex-col sm:flex-row'>
          <div className='thumb relative'>
            {!thumbnailLoaded && (
              <Loader />
            )}
            <img
              src={video?.thumbnail[0]?.url}
              className='sm:rounded-xl cursor-pointer w-full sm:w-[400px] '
              onClick={Render}
              onLoad={() => setThumbnailLoaded(true)}
              onError={() => setThumbnailLoaded(true)}
              alt="logo"
            />
            <div className='text-white text-center absolute right-2 bottom-2'>
              <VideoDurationBadge video={video} />
            </div>
          </div>
          <div className='mx-4 my-1'>
            <h4 className={`font-semibold text-${theme === 'light' ? 'black' : 'white'}`}>{video?.title}</h4>
            <div className={`text-${theme === 'light' ? 'black' : 'white'}  sm:block hidden`}>
              <h4 className='text-[10px] my-2'>{formatViewCount(video.viewCount)} views • {video?.publishedTimeText}</h4>
              <div className='flex items-center my-3'>
                <img src={video.channelThumbnail[0].url} width='20px' className='rounded-full mr-2' alt="" />
                <h5 className='font-bold cursor-pointer' onClick={() => { Navigate(`/channelDetails/${video.channelId}`) }}>{video?.channelTitle}</h5>
                <img src="/images/verify.webp" className='self-center mx-2 w-3' alt="verify" />
                {video.isLive &&
                  <p className='flex items-center my-2'>
                    <img src="/images/live.webp" width='20px' className='mr-2' alt="live" />
                  </p>}
              </div>
            </div>

            <div className={`text-${theme === 'light' ? 'black' : 'white'} block sm:hidden`}>
              <div className='flex items-center'>
                {<img src={video.channelThumbnail[0].url} width='20px' className='rounded-full mr-2' alt="" />}
                <h5 className='font-bold' onClick={() => { Navigate(`/channelDetails/${video.channelId}`) }}>{video?.channelTitle}</h5>
                <img src="/images/verify.webp" className='self-center mx-2 w-3' alt="verify" />
                {video.isLive &&
                  <p className='flex items-center my-2'>
                    <img src="/images/live.webp" width='20px' className='mr-2' alt="live" />
                  </p>}
                <p className='my-2'>{formatViewCount(video?.viewCount)} views • {video?.publishedTimeText}</p>
              </div>
            </div>
            <h6 className={`text-${theme === 'light' ? 'black' : 'white'} my-2 hidden md:block`}>{video.description}</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchResultCard