import React from "react";

// redux
import { connect } from "react-redux";

// constants
import { layout, tailLayout } from 'constants/createFormLayoutConfig';

// helpers 
import { formatMoneyInput } from 'helpers/formatter';

// components
import { Button,  Modal, Form, Input, InputNumber } from 'antd';

const CreateRecharge = (props) => {
    const { payment, visible, setVisible, createRecharge } = props;

    return <Modal
        title="Nạp tiền vào tài khoản"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
    >
        <Form
            {...layout}
            name="basic"
            onFinish={ createRecharge }
        >
             <Form.Item
                name="transaction"
                label="Số tiền giao dịch (vnđ)"
                rules={[
                {
                    required: true,
                    message: 'Số tiền không được bỏ trống!',
                },
                ]}
            >
                <InputNumber
                    style={{ width: "100%" }}
                    formatter={formatMoneyInput}
                />
            </Form.Item>

            <Form.Item
                name="bankName"
                label="Tên ngân hàng"
                rules={[
                    {
                        required: true,
                        message: 'Tên ngân hàng không được bỏ trống',
                    },
                    ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="bankAccount"
                label="Số tài khoản"
                rules={[
                    {
                        required: true,
                        message: 'Số tài khoản không được bỏ trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="bankOwer"
                label="Chủ tài khoản"
                rules={[
                    {
                        required: true,
                        message: 'Tên chủ tài khoản không được bỏ trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={payment.isLoading}>
                    Nạp tiền
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    const { payment } = state;
    return { payment };
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecharge);
