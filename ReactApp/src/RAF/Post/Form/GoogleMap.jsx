import React from "react";

// redux
import { connect } from "react-redux";

// constants
import { googleMapUrl } from 'constants/config';

// style
import './styles.scss';

// component
import WrappedMap from './WrappedMap';
import { Form } from 'antd';

const GoogleMap = (props) => {
    const { onChangeLocation, location } = props;

    return <React.Fragment>
        <div className="post-add-item-header-map post-add-item-header">
            <span>Bản đồ</span>
        </div>
        <p style={{color: "#d33320", marginBottom: "1.5rem"}}>Chọn vị trí trên bản đồ để người thuê dễ dàng tìm kiếm hơn</p>
        
        <Form.Item
            name="location"
            label="Tọa độ bản đồ"
        >
            <WrappedMap
                googleMapURL={ googleMapUrl }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                onChangeLocation={onChangeLocation}
                location={location}
            />
        </Form.Item>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);