import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import styles from './showCard.module.scss';
import { IShow as Show, IShowDetails as ShowDetails } from '../../../context/ShowsContext';
import { APIContext } from '../../../context/APIContext';

interface IProps {
  media: Show;
}

export const ShowCard:FC<IProps> = ({ media }) => {
  return (
    <div className={styles.card}>
      <img src={`https://image.tmdb.org/t/p/original${media.poster_path}`} alt="show poster" />
    </div>
  );
};

export default ShowCard;
