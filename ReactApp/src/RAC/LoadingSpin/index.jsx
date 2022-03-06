import React from 'react';
import { AtomSpinner } from 'react-epic-spinners';

import './styles.scss';

const LoadingSpin = () => {
  return (
    <div className="loading-spin">
      <AtomSpinner color="#1890FF" />
    </div>
  );
};

export default LoadingSpin;
