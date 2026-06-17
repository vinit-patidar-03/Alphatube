import React, { useContext, useEffect } from 'react'
import Context from '../context/Context';
import SearchResultCard from '../components/SearchResultCard';
import { fetchData } from '../API/YoutubeAPI';
import Spinner from '../components/Spinner';
import { getItemsByType } from '../utils/videoHelpers';

const SearchResults = () => {
    const { searchcategory, searchResult, setSearchResults, setShortsCategory } = useContext(Context);
    const searchVideos = getItemsByType(searchResult, 'video');

    useEffect(() => {
        fetchSearchResult(searchcategory);
        setShortsCategory(searchcategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchcategory])
    const fetchSearchResult = (e) => {
        fetchData(`search?query=${e}`).then((res) => {
            setSearchResults(res.data.data);
        })
    }

    return (
        <>{
            <div className='flex flex-col items-center mt-[60px] sm:p-3 relative mb-[50px]'>
                {
                    searchResult &&
                    searchVideos.map((elem, index) => {
                        return <SearchResultCard video={elem} key={index} />
                    })

                }
                {!searchResult && <Spinner />}
            </div>
        }
        </>
    )
}

export default SearchResults