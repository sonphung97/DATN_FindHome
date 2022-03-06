import React from "react";

// redux
import { connect } from "react-redux";
import { AuthActions } from './_redux/actions';

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

const Login = (props) => {

    const { visibleLogin, setState, auth } = props;

    const submitLogin = async (values) => {
        //Call api
        await props.login(values);
    };
    
    return <Modal
        title="Đăng nhập"
        visible={visibleLogin}
        footer={null}
        onCancel={() => setState({visibleLogin: false })}
    >
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={ submitLogin}
            >
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
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={auth.isLoading} className="button-color">
                Đăng nhập
                </Button>
            </Form.Item>
            </Form>
    </Modal>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    login: AuthActions.login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
