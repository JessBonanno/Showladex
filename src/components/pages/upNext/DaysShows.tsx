import React, { FC, useState, useEffect, useContext } from 'react';
import styles from './upNext.module.scss';
import { ShowDetails } from '../../../ts/showInterfaces';
import EpisodeInfo from './EpisodeInfo';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import { getFavorites, getShowDetails } from 'src/utils/API';
import { ShowResult } from 'src/ts/apiInterfaces';
import { datesArray } from 'src/utils/helpers';

interface Props {
	date: string;
	day: string;
}

const DaysShows: FC<Props> = ({ date, day }) => {
	const [todaysShows, setTodaysShows] = useState<ShowDetails[]>();
	const { favoritesState, showPageState } = useContext(ShowsContext);
	const [favorites, setFavorites] = favoritesState;

	const getUsersFavorites = async (currentPage?: number) => {
		try {
			const favsResponse = await getFavorites(currentPage && currentPage);
			const favorites = favsResponse?.results as ShowResult[];
			currentPage = favsResponse?.page;
			const totalPages = favsResponse?.total_pages;
			const airing = await Promise.all(
				favorites.map(async fav => {
					const details = await getShowDetails(fav.id.toString());
					if (
						details &&
						details?.next_episode_to_air !== null &&
						datesArray.includes(details.next_episode_to_air.air_date)
					) {
						return details;
					}
				})
			);
			const cleanList = airing.filter(fav => fav !== undefined);
			if (cleanList) setFavorites(cleanList as ShowDetails[]);
			if (currentPage && totalPages && totalPages > currentPage) {
				getUsersFavorites(currentPage + 1);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getUsersFavorites();
	}, []);

	useEffect(() => {
		if (favorites && favorites.length) {
			const list: ShowDetails[] = [];
			favorites.forEach(f => {
					if (f?.next_episode_to_air?.air_date === date) list.push(f);
				});
			setTodaysShows(list);
		}
	}, [favorites]);

	return (
		<div className={styles.daysShows}>
			<h3>{day}</h3>
			{todaysShows && todaysShows.length > 0 ? (
				todaysShows.map(show => {
					return <EpisodeInfo show={show} key={show.id} />;
				})
			) : (
				<div className={styles.noInfo}>
					<p>Nothing on today</p>
				</div>
			)}
		</div>
	);
};

const MemoizedDaysShows = React.memo(DaysShows);

export default ({ date, day }) => (
	<ShowsProvider>
		<MemoizedDaysShows date={date} day={day} />
	</ShowsProvider>
);
