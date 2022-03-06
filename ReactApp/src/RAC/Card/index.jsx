import React from 'react';
import Header from './CardHeader';
import Body from './CardBody';
import Footer from './CardFooter';

// styles
import './styles.scss';

const Card = (props) => {
  const { className } = props;

  return (
    <div className={`card ${className}`}>
        {props.children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
