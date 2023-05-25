import React, { useState, useEffect, SyntheticEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import styles from './search.module.scss';
import { getRandomPopularImg } from 'src/utils/API';
import { usePalette } from 'react-palette';

interface Props {
	handleSearch: (e: SyntheticEvent<Element, Event>) => Promise<void>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ handleSearch, searchTerm, setSearchTerm }: Props) => {
	const [backgroundImage, setBackgroundImage] = useState('');

	const getBgImage = async () => {
		const img = await getRandomPopularImg();
		setBackgroundImage(img);
	};

	const { data, loading, error } = usePalette(`https://image.tmdb.org/t/p/w500${backgroundImage}`);
	

	useEffect(() => {
		getBgImage();
	}, []);

	return (
		<>
			<div
				className={styles.search}
				style={{
					backgroundImage: backgroundImage && `url(https://image.tmdb.org/t/p/original${backgroundImage})`,
					backgroundColor: data.muted,
				}}
			>
				<h1>
					<b>Explore</b> shows, <b>add</b> favorites, <b>track</b> when to watch!
				</h1>
				<form action="" onSubmit={handleSearch}>
					<input
						type="text"
						name="searchTerm"
						value={searchTerm || ''}
						placeholder="Search Shows"
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<BsSearch onClick={handleSearch} className={styles.icon} />
				</form>
			</div>
		</>
	);
};

export default Search;
