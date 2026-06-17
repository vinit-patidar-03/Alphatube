import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const PlaylistCard = (props) => {
  const { video } = props;
  const Navigate = useNavigate();
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const Render = () => {
    Navigate(`/playlist/${video.playlistId}`)
  }
  return (
    <>
      <div className='flex flex-col relative w-full sm:w-[calc(50%-0.25rem)] lg:w-[calc(25%-0.375rem)] md:w-[calc(33.33%-0.333rem)]  text-sm sm:text-xs'>
        <div className='w-full relative'>
          {!thumbnailLoaded && <Loader />}
          <img
            src={video?.thumbnail[3]?.url || video?.thumbnail[0].url}
            title='Playlist'
            onClick={Render}
            className='w-full sm:rounded-xl object-cover cursor-pointer h-52'
            onLoad={() => setThumbnailLoaded(true)}
            onError={() => setThumbnailLoaded(true)}
            alt="logo"
          />
          <div className='text-white text-center absolute right-2 bottom-2'>
            <img src="/images/playlist.webp" className='w-7' alt="playlist" />
          </div>
        </div>
        <div className='m-1 mb-5'>
          <h4 className='font-bold'>{video?.title}</h4>
        </div>
      </div>
    </>
  )
}

export default PlaylistCard