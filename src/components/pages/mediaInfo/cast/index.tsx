import React, { FC } from 'react';
import styles from './cast.module.scss';
import { Cast, ShowDetails } from '../../../../ts/showInterfaces';

interface Props {
  cast: Cast[] | undefined;
  color: string;
}

const CastInfo:FC<Props> = ({ cast, color }) => {
  return (
    <div className={styles.cast} style={{ color }}>
      <h3 style={{ color }}>Cast</h3>
      <div className={styles.castCards} style={{ color }}>
        {cast && cast.length > 0 && cast.map((actor) => {
          return (
            <div className={styles.castCard}>
              {actor.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CastInfo;
