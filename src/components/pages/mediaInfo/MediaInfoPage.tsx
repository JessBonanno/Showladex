import { useParams } from 'react-router';
import MediaInfo from './MediaInfo';

interface ShowParams {
	id: string;
}

interface Rating {
	iso_3166_1: string;
	rating?: string;
	primary?: string;
	certification?: string;
	release_date?: string;
}

export const MediaInfoPage = () => {
	const { id } = useParams<ShowParams>();
	return <MediaInfo id={id} />;
};

export default MediaInfoPage;
