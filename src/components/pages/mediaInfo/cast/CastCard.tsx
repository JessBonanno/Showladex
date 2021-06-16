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

  return (
    <>
      {actorDetails && actorDetails.profile_path !== null && (
        <div className={styles.card}>
          <Link
            className={styles.link}
            to={actorDetails && `/actorDetails/${actorDetails.id}`}
            onClick={() => console.log('click')}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${actorDetails && actorDetails.profile_path}`}
              alt={`${actorDetails && actorDetails.name}`}
            />
            <p>
              {character}
            </p>
          </Link>

        </div>
      )}
    </>
  );
};

export default CastCard;
