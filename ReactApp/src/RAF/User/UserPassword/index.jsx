import React from "react";

// redux
import { connect } from "react-redux";
import { UserActions } from '../_redux/actions';

// constants
import { layout, tailLayout } from 'constants/createFormLayoutConfig';

// components
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import { Button, Form, Input } from "antd";

const UserPassword = (props) => {
    const { user, auth } = props;

    const changePassword = async (values) => {
        props.updatePassword(auth.user._id, values);
    }

    return <Container>
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>Thay đổi mật khẩu</Card.Header>
                <Card.Body>
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={ changePassword }
                    >
                        <Form.Item
                            name="oldPassword"
                            label="Mật khẩu hiện tại"
                            rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được bỏ trống!',
                            },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label="Mật khẩu mới"
                            rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được bỏ trống!',
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="confirmNewPass"
                            label="Xác nhận mật khẩu"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được bỏ trống!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={user.isLoading}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Card.Body>
            </ Card>
        </Container.Col>
    </Container>
};

const mapStateToProps = state => {
    const { user, auth } = state;
    return {user, auth};
}

const mapDispatchToProps = {
    updatePassword: UserActions.updatePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPassword);