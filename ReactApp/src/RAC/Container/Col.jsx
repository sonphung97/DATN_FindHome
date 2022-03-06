import React from 'react';

const Col = (props) => {
    const { colSpan = 0 } = props;

    return (
        <div className={`col-md-${colSpan}`}>
            {props.children}
        </div>
    );
};

export default Col;
