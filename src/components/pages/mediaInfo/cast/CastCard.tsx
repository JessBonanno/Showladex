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
      console.log(details);
      setActorDetails(details);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getActor();
  }, []);

  const actorName = actorDetails && actorDetails.name.split(' ');

  return (
    <div className={styles.card}>

      {actorDetails && actorDetails.profile_path !== null && (
        <>
          <Link
            className={styles.link}
            to={actorDetails && `/actorDetails/${actorDetails.id}`}
            onClick={() => console.log('click')}
          >
            <p>
              {character}
            </p>

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
          </Link>
        </>
      )}

    </div>
  );
};

export default CastCard;
