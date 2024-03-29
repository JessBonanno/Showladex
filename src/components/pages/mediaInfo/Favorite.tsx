import React, { FC, useContext, useEffect, useState } from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from 'react-icons/md';
import styles from './showInfo.module.scss';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import { getFavorites, markFavorite } from 'src/utils/API';
import { ShowResult } from 'src/ts/apiInterfaces';

interface Props {
	show: ShowResult;
	color: string;
}

const Favorite: FC<Props> = ({ show, color }) => {
	const { favoritesState } = useContext(ShowsContext);
	const [favorites, setFavorites] = favoritesState;
	const [isFavorite, setIsFavorite] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const id = localStorage.getItem('accountId');
		setUserId(id);
	}, []);

	const getUsersFavorites = async (currentPage?: number) => {
		try {
			const favsResponse = await getFavorites(currentPage && currentPage);
			const favorites = favsResponse?.results as ShowResult[];
			currentPage = favsResponse?.page;
			const totalPages = favsResponse?.total_pages;
			setFavorites(favorites);
			if (currentPage && totalPages && totalPages > currentPage) {
				getUsersFavorites(currentPage + 1);
			}
		} catch (err) {
			console.error(err);
		}
	};
	
	useEffect(() => {
		getUsersFavorites();
		if (show && favorites) {
			favorites.forEach(f => {
				if (f.id === show.id) {
					setIsFavorite(true);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (show && favorites) {
			favorites.forEach(f => {
				if (f.id === show.id) {
					setIsFavorite(true);
				}
			});
		} else {
			setIsFavorite(false);
		}
	}, [favorites]);
	return (
		<div className={styles.Favorite}>
			<p>Favorite</p>
			<div>
				{isFavorite ? (
					<MdFavorite
						onClick={async () => {
							if (show && userId) await markFavorite(show.id, false, userId);
							setIsFavorite(false);
						}}
						className={styles.heart}
					/>
				) : (
					<GrFavorite
						onClick={async () => {
							if (show && userId) await markFavorite(show.id, true, userId);
							setIsFavorite(true);
						}}
						className={styles.heart}
					/>
				)}
			</div>
		</div>
	);
};

const MemoizedFavorite = React.memo(Favorite);

export default ({ show, color }) => (
	<ShowsProvider>
		<MemoizedFavorite show={show} color={color} />
	</ShowsProvider>
);
