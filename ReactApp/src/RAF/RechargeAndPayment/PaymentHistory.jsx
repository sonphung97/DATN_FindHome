import React, { useState, useEffect } from "react";

// redux
import { connect } from "react-redux";
import { PaymentActions } from './_redux/actions';

// helpers
import { slugRoute, formatCurrency } from 'helpers/formatter';
import moment from 'moment';

// components
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/LoadingSpin';
import { Table, Empty, Pagination } from 'antd';
import { Link } from 'react-router-dom';

// constants 
import { routePath } from 'constants/global';

const PaymentHistory = (props) => {
    const { payment } = props;
    const { listPayments = [] } = payment;

    // states
    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10,
        type: 2
    })
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllPayments(queryData);
        }
    }, [loaded])

    useEffect(() => {
        props.getAllPayments(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'post',
            dataIndex: 'post',
            title: 'Bài đăng đã được thanh toán',
            width: '60%',
            render: (data) => {
                return (<Link to={`/${routePath.postDetail}/${slugRoute(data?.title)}.${data?._id}.net`}>{data?.title}</Link>)
            }
        },
        {
            key: 'transaction',
            dataIndex: 'transaction',
            title: 'Số tiền thanh toán',
            width: '20%',
            render: (data) => {
                return (<span>{formatCurrency(data)}</span>)
            }
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày thanh toán',
            width: '20%',
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            render: (data) => {
                return (
                    <span>{moment(new Date(data)).format("hh:mm - DD/MM/YYYY")}</span>
                )
            }
        },
    ];

    return <Container>
        {payment.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>Lịch sử thanh toán</Card.Header>
                <Card.Body>
                    {listPayments?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={listPayments}
                            pagination={false}
                        /> :
                        <Empty description="Không có dữ liệu"/>
                    }
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
    const { payment } = state;
    return { payment }
}

const mapDispatchToProps = {
    getAllPayments: PaymentActions.getAllPayments
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory);