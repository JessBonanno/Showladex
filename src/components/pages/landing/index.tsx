import React, { useContext } from 'react';
import styles from './landing.module.scss';
import Search from '../../parts/search';
import SearchResults from '../../parts/SearchResults';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import Trending from 'src/components/parts/trending/Trending';

const Landing = () => {
	const { searchResultsState } = useContext(ShowsContext);
	const [searchResults, setSearchResults] = searchResultsState;
  return (
    <div className={styles.landing}>
      <Search />
      {searchResults && searchResults.length > 0 && <SearchResults />}
      <Trending />
    </div>
  );
};
const MemoizedLanding = React.memo(Landing);

export default ({show, movie, setShows}) => (
	<ShowsProvider>
		<MemoizedLanding />
	</ShowsProvider>
);
