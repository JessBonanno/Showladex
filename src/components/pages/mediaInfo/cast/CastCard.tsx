import React, {
  FC, useContext, useState, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { APIContext } from '../../../../context/APIContext';
import { ActorDetails, Cast } from '../../../../ts/showInterfaces';
import styles from './cast.module.scss';

interface Props {
  actor: Cast;
  character: string;
}

const CastCard:FC<Props> = ({ actor, character }) => {
  const { getActorDetails } = useContext(APIContext);
  const [actorDetails, setActorDetails] = useState<ActorDetails>();

  const getActor = async () => {
    try {
      const details = await getActorDetails(actor.id);
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
            onClick={() => console.log('click')}
            rel="noreferrer"
          >
            <div className={styles.actor}>
              {characterName && characterName.map((word) => {
                return (
                  <p key={word}>{word}</p>
                );
              })}
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${actorDetails && actorDetails.profile_path}`}
              alt={`${actorDetails && actorDetails.name}`}
            />
            <div className={styles.actor}>
              {actorName && actorName.map((word) => {
                return (
                  <p
                    key={word}
                  >
                    {word}
                  </p>
                );
              })}
            </div>
          </a>
        </>
      )}

    </div>
  );
};

export default CastCard;
