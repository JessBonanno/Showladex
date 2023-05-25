import React, { FC, useContext, useEffect, useState } from 'react';
import { GrFavorite } from 'react-icons/gr';
import { MdFavorite } from 'react-icons/md';
import styles from './showInfo.module.scss';
import { ShowDetails, Show, FavResults } from '../../../ts/showInterfaces';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import { getFavorites, markFavorite } from 'src/utils/API';
import { UsersContext, UsersProvider } from 'src/context/UsersContext';

interface Props {
	show: ShowDetails | undefined;
	color: string;
}

const Favorite: FC<Props> = ({ show, color }) => {
	const { favoritesState, showPageState } = useContext(ShowsContext);
	const { accountDetailsState } = useContext(UsersContext);
	const [isFavorite, setIsFavorite] = useState(false);
	const [favorites, setFavorites] = favoritesState;
	const [showPage, setShowPage] = showPageState;
	const [accountDetails, setAccountDetails] = accountDetailsState;

	const getUsersFavorites = async () => {
		try {
			const favs: FavResults = await getFavorites();
			if (favorites && favorites.length > 0 && favs.results) {
				setFavorites([...favorites, ...favs.results]);
			} else {
				setFavorites([...favs.results]);
			}
			setShowPage((showPage || 0) + 1);
			if (favs.total_pages > (showPage || 0) + 1) {
				getUsersFavorites();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const checkFavorites = () => {
		if (show && favorites) {
			return favorites.find((fav: Show) => fav.id === show.id);
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
							setIsFavorite(false);
						}}
						className={styles.heart}
					/>
				) : (
					<GrFavorite
						onClick={async () => {
							if (show && accountDetails) await markFavorite(show.id, true, accountDetails);
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
			<Favorite show={show} color={color} />
		</ShowsProvider>
	</UsersProvider>
);
