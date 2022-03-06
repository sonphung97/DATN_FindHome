import React from "react";

// redux
import { connect } from "react-redux";

// constants
import { googleMapUrl } from 'constants/config';

// styles
import './styles.scss';

// components
import WrappedMap from './WrappedMap';

const GoogleMap = (props) => {
    const {location } = props;

    return <React.Fragment>
        <h3 style={{color: "#0f78da"}}>Vị trí trên bản đồ</h3>
        
        <WrappedMap
            googleMapURL= { googleMapUrl }
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            location={location}
        />
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);