import React, {useEffect, useState} from "react";

// redux
import { connect } from "react-redux";      
import { CountryActions } from '../../Country/_redux/actions';

// helper
import { formatMoneyInput } from 'helpers/formatter';

// style
import './styles.scss';

// component
import { Form, Select, Col, Row, Input, InputNumber } from 'antd';
const { Option } = Select;

const Address = (props) => {

    const [loaded, setLoaded] = useState(false);

    const { provincesData, districtsData, wardsData } = props.country;
    
    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getProvinces()
        }
    }, [ loaded ])

    const _getDistricts = async (value) => {
        let provinceInfo = await provincesData.find(p => p._id === value);
        if (provinceInfo) await props.getDistricts({ provinceId: provinceInfo.id });
    }

    const _getWards = (value) => {
        let districtInfo = districtsData.find(d => d._id === value);
        if (districtInfo) props.getWards({ districtId: districtInfo.id })
    }

    return <React.Fragment>
        {/* Chọn khu vực */}
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
                        name="province"
                        label="Tỉnh / thành phố"
                        rules={[
                        {
                            required: true,
                            message: 'Tỉnh / thành phố không được ỏ trống!',
                        },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn tỉnh / thành phố"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={(value) => _getDistricts(value)}
                        >
                            {provincesData && provincesData.length && 
                                provincesData.map(p => <Option key={p._id} value={p._id}>
                                {p.name}
                            </Option>)}
                        </Select>
                    </Form.Item>
                    </Col>
                    
                    <Col span={8}>
                    <Form.Item
                        name="district"
                        label="Quận / huyện"
                        rules={[
                        {
                            required: true,
                            message: 'Quận / huyện không được bỏ trống!',
                        },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn quận / huyện"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                                onChange={(value) => _getWards(value)}
                        >
                            {districtsData && districtsData.length && 
                                districtsData.map(d => <Option key={d._id} value={d._id}>
                                {d.name}
                            </Option>)}
                        </Select>
                    </Form.Item>
                    </Col>
                    
                    <Col span={8}>
                    <Form.Item
                        name="ward"
                        label="Xã / phường"
                        rules={[
                        {
                            required: true,
                            message: 'Xã / phường không được bỏ trống!',
                        },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn xã / phường"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {wardsData && wardsData.length && 
                                wardsData.map(w => <Option key={w._id} value={w._id}>
                                {w.name}
                            </Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Col>
        </Row>

        {/* Địa chỉ */}
        <Form.Item
            name="address"
            label="Địa chỉ"
        >
            <Input placeholder="Ví dụ: Số 01, Đại Cồ Việt" />
        </Form.Item>
        
        {/* Diện tích, giá */}
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
                        name="acreage"
                        label="Diện tích (m2)"
                        rules={[
                            {
                                required: true,
                                message: 'Diện tích không được bỏ trống',
                            },
                        ]}
                    >
                        <InputNumber style={{width: "100%"}} />
                    </Form.Item>
                </Col>
                    
                <Col span={8}>
                    <Form.Item
                        name="price"
                        label="Giá (vnđ) / tháng"
                        rules={[
                        {
                            required: true,
                            message: 'Giá không được bỏ trống!',
                        },
                        ]}
                    >
                        <InputNumber
                            placeholder="Ví dụ: 1.000k"
                            style={{ width: "100%" }}
                            formatter={formatMoneyInput}
                        />
                    </Form.Item>
                </Col>
            </Col>
        </Row>
    </React.Fragment>
}

const mapStateToProps = state => {
    const { country } = state
    return { country };
}

const mapDispatchToProps = {
    getProvinces: CountryActions.getProvinces,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);