import React from 'react';

const Body = (props) => {
    const { styles, className } = props;

    return (
        <div className={`card-item card-body ${className}`} style={styles}>
            {props.children}
        </div>
    );
};

export default Body;
