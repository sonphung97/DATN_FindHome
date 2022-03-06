import React, {useEffect, useState} from "react";

// redux
import { connect } from "react-redux";
import { UserActions } from '../../User/_redux/actions';

// styles
import './styles.scss';

// components
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/LoadingSpin';
import PostOwnerItem from './PostOwnerItem';
import { Pagination, Empty } from 'antd'; 

const PostsOwner = (props) => {
    const { user, auth, post } = props;
    const { postsOwner = [] } = user;
    const { postDeleted } = post;

    const [loaded, setLoaded] = useState(false);

    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10
    });

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getPostsOwner(auth.user._id, queryData)
        }
    }, [ loaded ])

    useEffect(() => {
        props.getPostsOwner(auth.user._id, queryData);
    }, [queryData.limit, queryData.page])

    //Load lại danh sách khi xóa 1 bài đăng
    useEffect(() => {
        props.getPostsOwner(auth.user._id, queryData);
    }, [postDeleted])
    
    return <Container>
    {user.isLoading && <Loading />}
    <Container.Col colSpan={12}>
        <Card >
            <Card.Header>Quản lý bài đăng</Card.Header>
                
            <Card.Body>
                <div style={{padding: "10px"}}>
                    <table className="user-posts-table">
                        <tr>
                            <th>STT</th>
                            <th>Ảnh</th>
                            <th>Tiêu đề</th>
                            <th>Giá</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                            {postsOwner.length !== 0 ?
                                postsOwner.map((item, index) =>
                                    <PostOwnerItem
                                        postItem={item}
                                        index={index + 1}
                                        key={index}
                                    />) : 
                                <Empty description="Không có dữ liệu" style={{marginTop: "10px"}}/>}
                    </table>
                </div>
            </Card.Body>
                
            <Card.Footer styles={{textAlign: "right"}}>
                <Pagination
                    total={user.totalDocs}
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
    const { user, auth, post } = state;
    return { user, auth, post };
}

const mapDispatchToProps = {
    getPostsOwner: UserActions.getPostsOwner
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsOwner);