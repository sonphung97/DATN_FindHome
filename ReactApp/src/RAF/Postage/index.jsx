import React, {useState, useEffect} from "react";

// redux 
import { connect } from "react-redux";
import { PostageActions } from './_redux/actions';

// helpers
import { formatCurrency } from 'helpers/formatter';

// constants 
import { postageTypes } from './_redux/constants'

// components
import { Pagination, Empty, Button, Table, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/LoadingSpin';
import CreatePostage from './CreatePostage';


const { confirm } = Modal;

const Postage = (props) => {
    const { postage } = props;

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1
    })

    const [loaded, setLoaded] = useState(false);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            
            props.getAllPostages(queryData);
        }
    }, [loaded])

    useEffect(() => {
        props.getAllPostages(queryData);
    }, [queryData])

    const columns = [
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên cước phí',
            width: '30%',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Loại cước phí',
            width: '20%',
            render: (data) => {
                return (<span>{postageTypes[data]}</span>)
            }
        },
        {
            key: 'point',
            dataIndex: 'point',
            title: 'Trọng số',
            width: '20%',
            align: 'center'
        },
        {
            key: 'postage',
            dataIndex: 'postage',
            title: 'Mức phí',
            width: '20%',
            align: 'center',
            render: (data) => {
                return (<span>{formatCurrency(data)}</span>)
            }
        },
        {
            key: 'actions',
            title: 'Hành động',
            width: 'auto',
            align: 'center',
            render: (data, record) => {
                return (
                    <div >
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            size='small'
                            onClick={() => { showConfirmDelete(record) }}
                        >
                        </Button>
                    </div>
                );
            },
        },
    ];

    const createPostage = async (values) => {
        await props.createPostage(values);
        setVisible(false)
    }

    const showConfirmDelete = (f) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa gói cước "${f.name}" hay không?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",
            
            onOk() {
                props.deletePostage(f._id)
            },
            onCancel() {},
        });
    }

    return <Container>
        {postage.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>
                    Mức phí bài đăng VIP
                    <Button
                        type="primary" style={{ float: "right" }}
                        onClick={() => setVisible(true)}
                    >
                        Thêm gói
                    </Button>
                </Card.Header>
                <Card.Body>

                    {postage.listPostages?.length !== 0 ?
                        <Table
                            columns={columns}
                            dataSource={postage.listPostages}
                            pagination={false}
                        /> :
                        <Empty description="Không có dữ liệu"/>
                    }

                    <CreatePostage
                        visible={visible}
                        setVisible={setVisible}
                        createPostage={createPostage}
                    />

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={postage.totalDocs}
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
    const { postage } = state;
    return { postage };
}

const mapDispatchToProps = {
    getAllPostages: PostageActions.getAllPostages,
    createPostage: PostageActions.createPostage,
    deletePostage: PostageActions.deletePostage
}

export default connect(mapStateToProps, mapDispatchToProps)(Postage);
