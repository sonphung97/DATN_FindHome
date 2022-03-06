import React from 'react';

// components
import Col from './Col';

// styles
import './styles.scss';

const Container = (props) => {
  return (
    <div className="container">
        {props.children}
    </div>
  );
};

Container.Col = Col;

export default Container;
