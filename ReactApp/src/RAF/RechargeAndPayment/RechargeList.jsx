import React, { useState, useEffect } from "react";

// redux
import { connect } from "react-redux";
import { PaymentActions } from './_redux/actions';
import { UserActions } from '../User/_redux/actions';

// helpers
import moment from 'moment';
import { formatCurrency } from 'helpers/formatter';

// components
import { Button, Table, Empty, Pagination } from 'antd';
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/DropdownList';
import CreateRecharge from './CreateRecharge';

const RechargeList = (props) => {
    const { payment, auth, user } = props;
    const { listPayments = [] } = payment;
    const { userDetail = {} } = user;

    // states
    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10,
        type: 1
    })
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllPayments(queryData);
        }
    }, [loaded])

    useEffect(() => {
        props.getAllPayments(queryData);
    }, [queryData])

    useEffect(() => {
        props.getUserDetail(auth?.user?._id)
    }, [listPayments])

    const columns = [
        {
            key: 'transaction',
            dataIndex: 'transaction',
            title: 'Tiền giao dịch',
            width: '20%',
            render: (data) => {
                return (<span>{formatCurrency(data)}</span>)
            }
        },
        {
            key: 'bankName',
            dataIndex: 'bankName',
            title: 'Tên ngân hàng',
            width: '20%'
        },
        {
            key: 'bankAccount',
            dataIndex: 'bankAccount',
            title: 'Số tài khoản',
            width: '20%'
        },
        {
            key: 'bankAccount',
            dataIndex: 'bankAccount',
            title: 'Chủ tài khoản',
            width: '20%'
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày nạp tiền',
            width: '20%',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            render: (data, record) => {
                return (
                    <span>{moment(new Date(data)).format("hh:mm - DD/MM/YYYY")}</span>
                )
            }
        },
    ];

    const createRecharge = async (values) => {
        values.type = 1;
        await props.createPayment(values);
        await setVisible(false);
    }

    return <Container>
        {payment.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>
                    Lịch sử nạp tiền
                    <Button
                        type="primary" style={{ float: "right" }}
                        onClick={() => setVisible(true)}
                    >
                        Nạp tiền
                    </Button>
                </Card.Header>
                <Card.Body>
                    <div style={{ marginBottom: "10px" }}>
                        <b>Số dư tài khoản: &ensp;
                            <span style={{ color: "red" }}>{formatCurrency(userDetail.balance || 0)}</span>
                        </b>
                    </div>
                    {listPayments?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={listPayments}
                            pagination={false}
                        /> :
                        <Empty description="Không có dữ liệu"/>
                    }
                    <CreateRecharge
                        visible={visible}
                        setVisible={setVisible}
                        createRecharge={createRecharge}
                    />
                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={payment.totalDocs}
                        current={queryData.page}
                        pageSize={queryData.limit}
                        onChange={(page, pageSize) => {
                            setQueryData({ ...queryData, page, limit: pageSize })
                        }}
                        showSizeChanger
                        showQuickJumper
                        pageSizeOptions={[5, 10, 15, 20, 50]}
                        showTotal={total => `Tổng ${total} mục`}
                    />
                </Card.Footer>
            </ Card>
        </Container.Col>
    </Container>
};

const mapStateToProps = state => {
    const { payment, auth, user } = state;
    return { payment, auth, user }
}

const mapDispatchToProps = {
    getAllPayments: PaymentActions.getAllPayments,
    createPayment: PaymentActions.createPayment,
    getUserDetail: UserActions.getUserDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeList);