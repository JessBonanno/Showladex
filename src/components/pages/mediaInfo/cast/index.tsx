import React, { FC } from 'react';
import styles from './cast.module.scss';
import { Cast } from '../../../../ts/showInterfaces';
import CastCard from './CastCard';

interface Props {
  cast: Cast[] | undefined;
  color: string;
}

const CastInfo:FC<Props> = ({ cast, color }) => {
  return (
    <div className={styles.cast} style={{ color }}>
      <div className={styles.heading}>
        <p style={{ color }}>Cast</p>
      </div>
      <div>
        <div className={styles.castCards} style={{ color }}>
          {cast && cast.length > 0 && cast.map((actor) => {
            return (
              <CastCard actor={actor} key={actor.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CastInfo;
