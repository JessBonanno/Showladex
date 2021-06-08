import React, { FC } from 'react';
import styles from './showDetails.module.scss';
import { IShowDetails as Show } from '../../../context/ShowsContext';

interface IProps {
  show: Show | undefined;
}

const Cast:FC<IProps> = ({ show }) => {
  return (
    <></>
  );
};

export default Cast;
