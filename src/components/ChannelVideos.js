import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import VideoDurationBadge from './VideoDurationBadge';
import { formatViewCount } from '../utils/videoHelpers';
import Loader from './Loader';

const ChannelVideos = (props) => {

  const Navigate = useNavigate();
  const { video, cid } = props;
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const Render = () => {
    Navigate(`/video/${video.videoId}/${cid}`)
  }


  return (
    <>
      <div className='flex flex-col relative w-full mb-2 lg:w-[calc(25%-0.375rem)] md:w-[calc(33.33%-0.333rem)] sm:w-[calc(50%-0.25rem)] text-sm sm:text-xs'>
        <div className='w-full relative'>
          {!thumbnailLoaded && <Loader />}
          <img
            src={video?.thumbnail[3]?.url || video?.thumbnail[0].url}
            onClick={Render}
            className='w-full sm:rounded-xl object-cover cursor-pointer h-52'
            onLoad={() => setThumbnailLoaded(true)}
            onError={() => setThumbnailLoaded(true)}
            alt="logo"
          />
          <div className='text-white text-center absolute right-2 bottom-2'>
            <VideoDurationBadge video={video} />
          </div>
        </div>
        <div className='m-1'>
          <h4 className='font-semibold'>{video?.title}</h4>
          <div>
            {video.isLive ? <img src='/images/live.webp' className='w-4' alt='live' /> : <h4>{formatViewCount(video.viewCount)} • {video.publishedTimeText} </h4>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChannelVideos