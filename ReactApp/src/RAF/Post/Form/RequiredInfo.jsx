import React, {useEffect, useState} from "react";

// redux
import { connect } from "react-redux";
import { CategoryActions } from '../../Category/_redux/actions';

// helper
import { editorConfig } from 'constants/config';

// style
import './styles.scss';

// constant
import { postTypes } from 'constants/global';

// component
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Form, Input, Select, Row, Col } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const RequiredInfo = (props) => {
    const { listCategoriesNoPagination = [] } = props.category;
    const { type, setType, onChangeDescription, description } = props;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllCategoriesNoPagination()
        }
    }, [ loaded ])

    return <React.Fragment>
        <div className="post-add-item-header">
            <span>Các thông tin bắt buộc</span>
        </div>

        <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
                {
                    required: true,
                    message: 'Tiêu đề không được bỏ trống',
                },
            ]}
            className="ant-advanced-search-form"
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="metaDescription"
            label="Nội dung tóm tắt"
            rules={[
                {
                    required: true,
                    message: 'Nội dung không được bỏ trống',
                },
            ]}
        >
            <TextArea rows={4}/>
        </Form.Item>

        <p style={{marginBottom: "0.5rem"}}>Nội dung</p>
        <CKEditor
            editor={ ClassicEditor }
            data={description}
            config={editorConfig}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                onChangeDescription(data)
            }}
        />
        <br />

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
                        name="type"
                        label="Loại tin"
                        rules={[
                            {
                                required: true,
                                message: 'Loại tin không được bỏ trống',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn loại tin"
                            onChange={(v) => setType(v)}
                        >
                            <Option value={1}>{postTypes[1]}</Option>
                            <Option value={2}>{postTypes[2]}</Option>
                        </Select>
                    </Form.Item>
                </Col>
                    
                <Col span={16}>
                    <Form.Item
                        name="categories"
                        label="Danh mục"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn ít nhất 01 danh mục',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Chọn danh mục"
                        >
                            {listCategoriesNoPagination.filter(c => c.type === type).map(c =>
                                (<Option key={c._id} value={c._id}>{c.name}</Option>))}
                        </Select>
                    </Form.Item>
                </Col>
            </Col>
        </Row>
    </React.Fragment>
}

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination
}


export default connect(mapStateToProps, mapDispatchToProps)(RequiredInfo);