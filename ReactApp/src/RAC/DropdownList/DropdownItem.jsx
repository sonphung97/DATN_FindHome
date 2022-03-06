import React from 'react';

// constants
import { routePath } from 'constants/global';

// components
import { Link } from 'react-router-dom';

// styles 
import './styles.scss';

const DropdownItem = (props) => {
    const { itemData, isManage } = props;

    return (
        <div className="dropdown-item">
            <Link to={!isManage ? `/${routePath.postCategory}/${itemData._id || ""}` : `/${itemData.path}`}>
                <div className="dropdown-item-name">{itemData.name}</div>
            </Link>
        </div>
    );
};

export default DropdownItem;