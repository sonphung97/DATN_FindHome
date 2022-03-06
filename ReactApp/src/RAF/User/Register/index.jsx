import React from "react";

// redux
import { connect } from "react-redux";
import { UserActions } from '../_redux/actions';

// components
import { Button, Modal, Form, Input } from "antd";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Register = (props) => {

    const { visibleRegister, setState, user } = props;

    const submitRegister = async (values) => {
        await props.register(values);
    };
    
    return <Modal
        title="Đăng ký tài khoản"
        visible={visibleRegister}
        footer={null}
        onCancel={() => setState({visibleLogin: false })}
    >
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={ submitRegister}
        >
            <Form.Item
                name="name"
                label="Tên truy cập"
                tooltip="Là tên hiển thị của bạn"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập tên truy cập!',
                    whitespace: true,
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập email!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Xác nhập mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                },
                ]}
            >
                <Input
                    type="number"
                />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={user.isLoading} className="button-color">
                Đăng ký
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    register: UserActions.register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
