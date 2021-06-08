import React, { FC } from 'react';
import styles from './outlinedButton.module.scss';

interface IProps {
  buttonText: string;
}

const OutLinedButton:FC<IProps> = ({ buttonText }) => {
  return (
    <button className={styles.button}>{buttonText}</button>
  );
};

export default OutLinedButton;
