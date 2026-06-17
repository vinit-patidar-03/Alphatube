import React, { useContext, useEffect } from 'react'
import Context from '../context/Context'
import VideoCard from './VideoCard';
import { getItemsByType } from '../utils/videoHelpers';

const MainPageVideos = () => {

  const { mainpageVideos, loading, setShortsCategory, selectCategory } = useContext(Context);
  const videos = getItemsByType(mainpageVideos, 'video');

  useEffect(() => {
    setShortsCategory(selectCategory)
  })

  return (
    <>
      <div className='flex flex-wrap gap-2 relative mb-[50px]'>
        {!loading && videos.map((elem, index) => <VideoCard video={elem} key={index} />)}
      </div>
    </>
  )
}

export default MainPageVideos