import React from "react";

// redux
import { connect } from "react-redux";

// constant
import { directionTypes } from 'constants/global';

// styles
import './styles.scss';

// component
import { Form, Input, Row, Col, Select, InputNumber } from 'antd';
const { Option } = Select;

const MoreInfo = (props) => {

    return <React.Fragment>
        <div className="post-add-item-header">
            <span>Các thông tin khác</span>
        </div>

        <Row >
            <Col
                span={24}
                style={{
                    textAlign: 'right',
                }}
                className="post-select-add-address"
            >
                <Col span={8}>
                    <Form.Item
                        name="width"
                        label="Chiều ngang (m)"
                    >
                        <InputNumber style={{width: "100%"}} />
                    </Form.Item>
                </Col>
                    
                <Col span={8}>
                    <Form.Item
                        name="length"
                        label="Chiều dài (m)"
                    >
                        <InputNumber style={{width: "100%"}} />
                    </Form.Item>
                </Col>
                    
                <Col span={8}>
                    <Form.Item
                        name="direction"
                        label="Hướng"
                    >
                         <Select placeholder="Chọn hướng">
                             {directionTypes.map((value, index) =>
                              <Option key={index} value={index }>{value} </Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Col>
        </Row>

        <Row >
            <Col
                span={24}
                style={{
                    textAlign: 'right',
                }}
                className="post-select-add-address"
            >
                <Col span={8}>
                    <Form.Item
                        name="roadAhead"
                        label="Đường trước nhà (m)"
                    >
                        <Input type="number" />
                    </Form.Item>
                </Col>
                    
                <Col span={8}>
                    <Form.Item
                        name="floorNumber"
                        label="Số lầu"
                    >
                        <InputNumber style={{width: "100%"}} />
                    </Form.Item>
                    </Col>
                    
                <Col span={8}>
                    <Form.Item
                        name="bedroomNumber"
                        label="Số phòng ngủ"
                    >
                         <InputNumber style={{width: "100%"}} />
                    </Form.Item>
                </Col>
            </Col>
        </Row>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(MoreInfo);