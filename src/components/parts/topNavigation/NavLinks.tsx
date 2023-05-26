import React, { FC, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShowsContext, ShowsProvider } from '../../../context/ShowsContext';
import styles from './navBar.module.scss';
import { endSession, getAccountDetails, getSession, getUserToken } from 'src/utils/API';
import { UserDetails } from 'src/ts/userInterfaces';

interface Props {
	isMobile: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const NavLinks: FC<Props> = ({ isMobile, setOpen }: Props) => {
	const { favoritesState, searchResultsState } = useContext(ShowsContext);
	const [authorized, setAuthorized] = useState<boolean | null>(false);
	const [accountDetails, setAccountDetails] = useState<UserDetails | null>(null);
	const [favorites, setFavorites] = favoritesState;
	const [searchResults, setSearchResults] = searchResultsState;
	const createSession = async () => {
		const token = localStorage.getItem('movieToken');
		let success;
		if (token) success = await getSession(token);
		if (success) {
			setAuthorized(true);
		}
	};

	const getUserInfo = async () => {
		const userInfo = await getAccountDetails();
		if (userInfo) {
			setAccountDetails(userInfo);
			setAuthorized(true);
			localStorage.setItem('accountId', userInfo.id);
		}
	};
	const saveSession = async () => {
		await getUserToken();
		await getUserInfo();
		accountDetails && localStorage.setItem('accountId', accountDetails.id.toString());
	};

	const deleteSession = async () => {
		const token = localStorage.getItem('session');
		try {
			let success;
			if (token) success = await endSession(token);
			if (success) {
				setAuthorized(true);
			}
			localStorage.removeItem('session');
			localStorage.removeItem('accountId');

			setAuthorized(false);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		createSession();
		getUserInfo();
	}, []);
	return (
		<ul className="w3-animate-right">
			<li>
				<Link
					to="/"
					className={styles.navLink}
					onClick={() => {
						setOpen && setOpen(false);
						setSearchResults(null);
					}}
				>
					Home
				</Link>
			</li>
			{authorized ? (
				<>
					<li>
						<Link
							to="/favorites"
							className={styles.navLink}
							onClick={() => {
								setOpen && setOpen(false);
								setSearchResults(null);
							}}
						>
							Favorites
						</Link>
					</li>
					<li>
						<Link
							to="/up-next"
							className={styles.navLink}
							onClick={() => {
								setOpen && setOpen(false);
								setFavorites(null);
								setSearchResults(null);
							}}
						>
							What's On
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className={styles.navLink}
							onClick={() => {
								setOpen && setOpen(false);
								deleteSession();
								setSearchResults(null);
							}}
						>
							Logout
						</Link>
					</li>
				</>
			) : (
				<li>
					<Link
						to="/"
						className={styles.navLink}
						onClick={() => {
							setOpen && setOpen(false);
							saveSession();
							setSearchResults(null);
						}}
					>
						Login
					</Link>
				</li>
			)}
		</ul>
	);
};

const MemoizedNavLinks = React.memo(NavLinks);

export default ({ isMobile, setOpen }) => (
		<ShowsProvider>
			<MemoizedNavLinks isMobile={isMobile} setOpen={setOpen}/>
		</ShowsProvider>
);
