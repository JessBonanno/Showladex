import { ShowResult } from 'src/ts/apiInterfaces';
import { Show } from '../../../ts/showInterfaces';
import Result from './Result';
import styles from './searchResults.module.scss';

interface Props {
  results: ShowResult[];
}

const SearchResults = ({results}: Props) => {
  return (
    <div className={styles.searchResults}>
      {results && results.length > 0 && results.map((show: Show) => {
        return (<Result show={show} />);
      })}
    </div>
  );
};

export default SearchResults;
