import React, { useContext, useState } from 'react';
import styles from './landing.module.scss';
import Search from '../../parts/search/Search';
import SearchResults from '../../parts/SearchResults/SearchResults';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import Trending from 'src/components/parts/trending/Trending';
import { searchShows } from 'src/utils/API';

const Landing = () => {
	const { searchResultsState } = useContext(ShowsContext);
	const [searchResults, setSearchResults] = searchResultsState;
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (searchTerm) {
        const shows = await searchShows(searchTerm);
        if (shows?.results.length) {
          setSearchResults(shows.results);
        }
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
    }
    setSearchTerm('');
  };

  return (
    <div className={styles.landing}>
      <Search handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      {searchResults && searchResults.length > 0 && <SearchResults results={searchResults}/>}
      <Trending />
    </div>
  );
};
const MemoizedLanding = React.memo(Landing);

export default () => (
	<ShowsProvider>
		<MemoizedLanding />
	</ShowsProvider>
);
