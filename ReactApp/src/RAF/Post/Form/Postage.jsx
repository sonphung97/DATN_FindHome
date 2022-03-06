import React, {useState} from "react";

// redux
import { connect } from "react-redux";
import {  PostageActions } from '../../Postage/_redux/actions';

// helper
import { formatCurrency } from 'helpers/formatter';

// style
import './styles.scss';

// component
import { Form, Select, Radio } from 'antd';
const { Option } = Select;

const Postage = (props) => {
    const { listPostages = [] } = props.postage;

    const [queryData] = useState({
        limit: 1000,
        page: 1
    })

    return <React.Fragment>
        <div className="post-add-item-header-map post-add-item-header">
            <span>Mua cước phí</span>
        </div>
        <p style={{ color: "#d33320", marginBottom: "1.5rem" }}>Mua cước phí để người thuê 
        dễ tiếp cận bài viết của bạn hơn</p>
        
        <Form.Item
            name="postageType"
            label="Loại cước phí"
        >
            <Select onChange={(value) => props.getAllPostages({...queryData, type: value })}>
                <Option value={1}>Cước phí 1 ngày</Option>
                <Option value={2}>Cước phí 30 ngày</Option>
            </Select>
        </Form.Item>

        <Form.Item
            name="postageId"
        >
            <Radio.Group>
                {listPostages.map(f => (
                    <Radio value={f._id} key={f._id}>
                        <b>{f.name}</b> &ensp;
                        <span style={{color: "red"}}>{formatCurrency(f.postage)}</span>
                    </Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    </React.Fragment>
}

const mapStateToProps = state => {
    const { postage } = state;
    return { postage };
}

const mapDispatchToProps = {
    getAllPostages: PostageActions.getAllPostages
}

export default connect(mapStateToProps, mapDispatchToProps)(Postage);