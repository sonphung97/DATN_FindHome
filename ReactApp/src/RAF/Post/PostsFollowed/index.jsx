import React, {useEffect, useState} from "react";

// redux
import { connect } from "react-redux";
import { PostActions } from '../_redux/actions';

// styles
import './styles.scss';

// components
import { Pagination, Empty } from 'antd';
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/LoadingSpin';
import PostFollowedItem from './PostFollowedItem';

const PostsFollwed = (props) => {
    const { user, auth, post } = props;
    const { listPosts } = post;

    const [queryData, setQueryData] = useState({
        page: 1,
        limit: 10,
        follows: auth?.user?._id
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllPosts(queryData)
        }
    })

    useEffect(() => {
        props.getAllPosts(queryData);
    }, [queryData])

    //Load lại dữ liệu sau khi unfollow
    const reLoadAfterUnFollow = () => {
        props.getAllPosts(queryData);
    }
    
    return <Container>
    {user.isLoading && <Loading />}
    <Container.Col colSpan={12}>
        <Card >
            <Card.Header>Bài đăng đang theo dõi</Card.Header>
                
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
                            {listPosts.length !== 0 ?
                                listPosts.map((item, index) =>
                                    <PostFollowedItem
                                        postItem={item}
                                        index={index + 1}
                                        key={index}
                                        reLoadAfterUnFollow={reLoadAfterUnFollow}
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
    getAllPosts: PostActions.getAllPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsFollwed);