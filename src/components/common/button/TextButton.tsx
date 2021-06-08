import React, { FC } from 'react';
import styles from './textButton.module.scss';

interface IProps {
  buttonText: string;
  clicker: () => void;
}

const TextButton:FC<IProps> = ({ buttonText, clicker }) => {
  return (
    <button onClick={clicker} className={styles.button}>{buttonText}</button>
  );
};

export default TextButton;
