import React from "react";

// redux
import { connect } from "react-redux";

// constants
import { postTypes } from 'constants/global';
import { layout, tailLayout } from 'constants/createFormLayoutConfig';

// components
import { Button,  Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const EditCategory = (props) => {
    const { category, state, setState, updateCategory, categoryEdit } = props;

    return <Modal
        title="Chỉnh sửa danh mục"
        visible={state.visibleEdit}
        footer={null}
        onCancel={() => setState({...state, visibleEdit: false })}
    >
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={updateCategory}
            initialValues={categoryEdit}
        >
            <Form.Item
                label="Tên danh mục"
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Tên danh mục không được bỏ trống!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            
            <Form.Item
                label="Loại danh mục"
                name="type"
                rules={[
                {
                    required: true,
                    message: 'Loại danh mục không được bỏ trống!',
                },
                ]}
            >
                <Select placeholder="Chọn loại danh mục">
                    <Option value={1}>{postTypes[1]}</Option>
                    <Option value={2}>{postTypes[2]}</Option>
                </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={category.isLoading}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
