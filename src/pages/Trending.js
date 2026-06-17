import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../API/YoutubeAPI';
import VideoCard from '../components/VideoCard';
import ShortsCard from '../components/ShortsCard';
import Context from '../context/Context';
import Spinner from '../components/Spinner';
import { FaArrowCircleLeft, FaArrowCircleRight, FaArrowUp } from 'react-icons/fa';
import { getItemsByType, getListingDataByType } from '../utils/videoHelpers';

const Trending = () => {

    const { theme } = useContext(Context);
    const [trendingvideos, settrendingVideos] = useState([]);
    const [page, setPage] = useState(0);
    const [activeTab, setActiveTab] = useState('recent');
    const recentTrendings = getItemsByType(trendingvideos, 'video_listing');
    const trendingVideoItems = getItemsByType(trendingvideos, 'video');
    const trendingShorts = getItemsByType(trendingvideos, 'shorts_listing');
    const trendingShortItems = getListingDataByType(trendingvideos, 'shorts_listing');

    useEffect(() => {
        fetchTrendingVideos();
        moveTotop();
    }, []);

    useEffect(() => {
        if (recentTrendings.length > 0) {
            setActiveTab('recent');
        } else if (trendingVideoItems.length > 0) {
            setActiveTab('videos');
        } else if (trendingShorts.length > 0) {
            setActiveTab('shorts');
        }
    }, [recentTrendings.length, trendingVideoItems.length, trendingShorts.length]);

    const fetchTrendingVideos = () => {
        fetchData(`trending?geo=IN`).then((res) => {
            settrendingVideos(res.data.data);
        })
    }

    const moveTotop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const ChangePage = (e) => {
        const listingsLength = recentTrendings.length;
        if (e === 'incr' && page !== (listingsLength ? listingsLength - 1 : 0)) {
            setPage(page + 1);
        }
        else if (page !== 0) {
            setPage(page - 1);
        }

    }
    return (
        <>
            {trendingvideos &&
                <div className='mt-[60px] mb-[50px] sm:px-2'>

                    {(recentTrendings.length > 0 ? 1 : 0) + (trendingVideoItems.length > 0 ? 1 : 0) + (trendingShorts.length > 0 ? 1 : 0) > 1 && <div className={`my-3 text-${theme === 'light' ? 'black' : 'white'}`}>
                        <ul className='flex justify-evenly gap-3 flex-wrap'>
                            {recentTrendings.length > 0 && <li className='font-semibold'><button onClick={() => { setActiveTab('recent'); moveTotop(); }} className={activeTab === 'recent' ? 'underline' : ''}>Recent Trendings</button></li>}
                            {trendingVideoItems.length > 0 && <li className='font-semibold'><button onClick={() => { setActiveTab('videos'); moveTotop(); }} className={activeTab === 'videos' ? 'underline' : ''}>Trendings</button></li>}
                            {trendingShorts.length > 0 && <li className='font-semibold'><button onClick={() => { setActiveTab('shorts'); moveTotop(); }} className={activeTab === 'shorts' ? 'underline' : ''}>Trending shorts</button></li>}
                        </ul>
                        <hr />
                    </div>}
                    {activeTab === 'recent' && recentTrendings[page] && <section className='flex flex-col pt-[20px] items-center' id='Recent'>
                        <h1 className={`font-bold text-${theme === 'light' ? 'black' : 'white'} mb-5`}>Recently Trending Videos</h1>
                        <div className='flex flex-wrap gap-2'>
                            {recentTrendings[page] &&
                                recentTrendings[page]?.data?.map((elem, index) => {
                                    return <VideoCard video={elem} key={index} />
                                })
                            }
                        </div>
                        <div className='w-full flex justify-evenly'>
                            <button onClick={() => { ChangePage('decr') }} className='py-2 px-5 bg-black text-white rounded-full font-semibold'><FaArrowCircleLeft /></button>
                            <button onClick={() => { ChangePage('incr') }} className='py-2 px-5 bg-black text-white rounded-full font-semibold'><FaArrowCircleRight /></button>
                        </div>
                        <hr />
                    </section>
                    }
                    {activeTab === 'videos' && trendingVideoItems.length > 0 && <section className='flex flex-col pt-[20px]' id='TrendV'>
                        <h1 className={`font-bold text-${theme === 'light' ? 'black' : 'white'} text-2xl mb-5`}>Trending Videos</h1>
                        <div className='flex flex-wrap gap-2'>
                            {trendingVideoItems.map((elem, index) => <VideoCard video={elem} key={index} />)}
                        </div>

                    </section>}

                    <hr />

                    {activeTab === 'shorts' && trendingShorts.length > 0 && <section className='flex flex-col pt-[20px] items-center' id='TrendS'>
                        <h1 className={`font-bold text-${theme === 'light' ? 'black' : 'white'} mb-5`}>Trending Shorts</h1>
                        <div className='flex flex-wrap justify-center'>
                            {trendingShortItems.map((elem, index) => {
                                return <ShortsCard video={elem} key={index} />
                            })
                            }
                        </div>
                    </section>}
                    <div className={`fixed right-[10px] bottom-[55px] cursor-pointer flex justify-center items-center rounded-full w-10 h-10 bg-${theme === 'light' ? 'white' : 'black'}`} onClick={moveTotop}>
                        <FaArrowUp className={`text-xl text-${theme === 'light' ? 'black' : 'white'}`} />
                    </div>
                </div>
            }
            {!trendingvideos && <Spinner />}
        </>
    )
}

export default Trending