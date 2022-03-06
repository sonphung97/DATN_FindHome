import React from "react";

// redux
import { connect } from "react-redux";

// Constants
import { postTypes } from 'constants/global';
import { layout, tailLayout } from 'constants/createFormLayoutConfig';

// Components
import { Button,  Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const CreateCategory = (props) => {
    const { category, state, setState, createCategory } = props;

    return <Modal
        title="Thêm danh mục"
        visible={state.visibleAdd}
        footer={null}
        onCancel={() => setState({...state, visibleAdd: false })}
    >
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={ createCategory}
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
                    Thêm mới
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);