import { FC, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ActorDetails, Cast } from '../../../../ts/showInterfaces';
import styles from './cast.module.scss';
import { getActorDetails } from 'src/utils/API';

interface Props {
	actor: Cast;
}

const CastCard: FC<Props> = ({ actor }) => {
	const [actorDetails, setActorDetails] = useState<ActorDetails | null>(null);

	const getActor = async () => {
		try {
			const details = await getActorDetails(actor.id.toString());
			setActorDetails(details);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getActor();
	}, []);

	const actorName = actorDetails && actorDetails.name.split(' ');
	const characterName = actor && actor.character && actor.character.split(' ');

	return (
		<div className={styles.card}>
			{actorDetails && actorDetails.profile_path !== null && (
				<>
					<a
						className={styles.link}
						href={actorDetails && `https://www.imdb.com/name/${actorDetails.imdb_id}/?ref_=tt_cl_t_6`}
						target="_blank"
						onClick={() => {}}
						rel="noreferrer"
					>
						<div className={styles.actor}>
							{characterName &&
								characterName.map(word => {
									if (word !== '/') {
										return <p key={uuidv4()}>{word}</p>;
									}
									return null;
								})}
						</div>
						<img
							src={`https://image.tmdb.org/t/p/original${actorDetails && actorDetails.profile_path}`}
							alt={`${actorDetails && actorDetails.name}`}
						/>
						<div className={styles.actor}>
							{actorName &&
								actorName.map(word => {
									return <p key={uuidv4()}>{word}</p>;
								})}
						</div>
					</a>
				</>
			)}
		</div>
	);
};

export default CastCard;
