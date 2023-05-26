import React, { FC, useContext, useEffect, useState } from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from 'react-icons/md';
import styles from './showInfo.module.scss';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import { getFavorites, markFavorite } from 'src/utils/API';
import { UsersContext, UsersProvider } from 'src/context/UsersContext';
import { ShowResult } from 'src/ts/apiInterfaces';

interface Props {
	show: ShowResult;
	color: string;
}

const Favorite: FC<Props> = ({ show, color }) => {
	const { favoritesState, showPageState } = useContext(ShowsContext);
	const { accountDetailsState } = useContext(UsersContext);
	const [isFavorite, setIsFavorite] = useState(false);
	const [favorites, setFavorites] = favoritesState;
	const [showPage, setShowPage] = showPageState;
	const [accountDetails, setAccountDetails] = accountDetailsState;

	const getUsersFavorites = async (currentPage?: number) => {
		try {
			const favsResponse = await getFavorites(currentPage && currentPage);
			const favorites = favsResponse?.results as ShowResult[];
			currentPage = favsResponse?.page;
			const totalPages = favsResponse?.total_pages;
			setFavorites(favorites);
			setShowPage((showPage || 0) + 1);
			if (currentPage && totalPages && totalPages > currentPage) {
				getUsersFavorites(currentPage + 1);
			}
		} catch (err) {
			console.error(err);
		}
	};
	const checkFavorites = () => {
		if (show && favorites) {
			favorites.forEach(f => {
				if (f.id === show.id) {
					return true;
				}
			});
			// return favorites.find((fav: ShowResult) => fav.id === show.id);
		}
		return false;
	};

	useEffect(() => {
		getUsersFavorites();
	}, []);

	useEffect(() => {
		if (checkFavorites()) {
			setIsFavorite(true);
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
							if (show && accountDetails) await markFavorite(show.id, false, accountDetails);
							console.log(show.id, false, accountDetails);
							setIsFavorite(false);
						}}
						className={styles.heart}
					/>
				) : (
					<GrFavorite
						onClick={async () => {
							if (show && accountDetails) await markFavorite(show.id, true, accountDetails);
							console.log(show.id, true, accountDetails);
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
	<UsersProvider>
		<ShowsProvider>
			<MemoizedFavorite show={show} color={color} />
		</ShowsProvider>
	</UsersProvider>
);
