import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { Show, ShowDetails } from '../../../ts/showInterfaces';
import MediaPoster from '../../common/MediaPoster';
import styles from './favorites.module.scss';
import { getFavorites } from 'src/utils/API';
import { ShowResult } from 'src/ts/apiInterfaces';
import MediaInfo from '../mediaInfo/MediaInfo';

const dummyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 25];

export const Favorites = () => {
	const [userFavorites, setUserFavorites] = useState<ShowResult[] | ShowDetails[] | null>();
	const [showId, setShowId] = useState<number | null>(null);

	/**
	 * Infinite scroll state
	 */
	const [hasMore, setHasMore] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);

	const getUsersFavorites = async () => {
		const currentFavs = userFavorites as ShowResult[];
		const favsResponse = await getFavorites(pageNumber);
		const totalPages = favsResponse?.total_pages;
		const favorites = favsResponse?.results as ShowResult[];
		if (currentFavs && favorites) {
			setUserFavorites([...currentFavs, ...favorites]);
		} else {
			setUserFavorites([...favorites]);
		}

		if (pageNumber && totalPages && totalPages > pageNumber) {
			setHasMore(true);
			setPageNumber(pageNumber + 1);
		} else {
			setHasMore(false);
			setPageNumber(pageNumber + 1);
		}
	};

	useEffect(() => {
		getUsersFavorites();
	}, []);
	useEffect(() => {
		if (userFavorites && userFavorites?.length) {
			const id = userFavorites[0].id;
			setShowId(id);
		}
	}, [userFavorites]);

	return (
		<div className={styles.trending}>
			<div className={styles.heading}>
				<h2>Favorite shows</h2>
			</div>
			<div>
				<InfiniteScroll
					height="260px"
					className={styles.cardContainer}
					dataLength={(userFavorites && userFavorites.length) || [].length}
					next={getUsersFavorites}
					hasMore={hasMore}
					loader={dummyArray.map(number => {
						return <div key={uuidv4()} className={styles.skeleton}></div>;
					})}
				>
					{userFavorites &&
						userFavorites.length > 0 &&
						userFavorites.map((result: Show) => {
							return <MediaPoster show={result} movie={null} key={uuidv4()} setShows={undefined} setShowId={setShowId}/>;
						})}
				</InfiniteScroll>
				{showId && <MediaInfo id={showId.toString()}/>}
			</div>
		</div>
	);
};

const MemoizedFavorites = React.memo(Favorites);

export default () => <MemoizedFavorites />;
