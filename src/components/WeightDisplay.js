// src/components/WeightDisplay.js
import React from 'react';
import styles from './css/WeightDisplay.module.css';

const WeightDisplay = ({ weight }) => {
  return (
    <div>
      <h3 className={styles.weight}>Peso: {weight}</h3>
    </div>
  );
};

export default WeightDisplay;
