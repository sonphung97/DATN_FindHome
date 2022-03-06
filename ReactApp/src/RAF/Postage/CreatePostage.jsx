import React from "react";

// redux
import { connect } from "react-redux";

// constants
import { postageTypes } from './_redux/constants'
import { layout, tailLayout } from 'constants/createFormLayoutConfig';

// helpers 
import { formatMoneyInput } from 'helpers/formatter';

// components
import { Button,  Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const CreatePostage = (props) => {
    const { postage, visible, setVisible, createPostage } = props;

    return <Modal
        title="Thêm cước phí"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
    >
        <Form
            {...layout}
            name="basic"
            onFinish={ createPostage}
        >
            <Form.Item
                name="name"
                label="Tên cước phí"
                rules={[
                    {
                        required: true,
                        message: 'Tên cước phí là bắt buộc',
                    },
                ]}
            >
                <Input placeholder="Ví dụ: VIP 2" />
            </Form.Item>

            <Form.Item
                name="postage"
                label="Mức phí"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mức phí',
                },
                ]}
            >
                <InputNumber
                    placeholder="Ví dụ: 1.000"
                    style={{ width: "100%" }}
                    formatter={formatMoneyInput}
                />
            </Form.Item>

            <Form.Item
                name="type"
                label="Loại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn loại cước phí',
                    },
                ]}
            >
                <Select placeholder="Chọn loại phí">
                    <Option value={1}>{postageTypes[1]}</Option>
                    <Option value={2}>{postageTypes[2]}</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="point"
                label="Trọng số"
                rules={[
                    {
                        required: true,
                        message: 'Trọng số là bắt buộc',
                    },
                ]}
            >
                <InputNumber
                    placeholder="Trọng số càng cao bài đăng càng được ưu tiên"
                    style={{ width: "100%" }}
                />
            </Form.Item>
            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={postage.isLoading}>
                    Thêm mới
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    const { postage } = state;
    return { postage };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostage);
