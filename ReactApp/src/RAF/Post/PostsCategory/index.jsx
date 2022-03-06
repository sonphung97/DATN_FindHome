import React, {useState, useEffect} from "react";

// redux
import { connect } from "react-redux";
import { PostActions } from '../_redux/actions';

// components
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/LoadingSpin';
import CardListItem from 'RAC/CardListItem';
import PostFilter from '../Filter';
import { Pagination, Empty } from 'antd';

const PostsCategory = (props) => {
    const { post } = props;
    const { listCategoriesNoPagination = [] } = props.category;
    const { catId } = props.match.params;

    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1,
        categories: catId,
        status: 2
    })

    useEffect(() => {
        if (catId !== queryData.categories) {
            setQueryData({...queryData, categories: catId})
            props.getAllPosts({...queryData, categories: catId});
        }
    }, [ catId ])
    
    useEffect(() => {
        props.getAllPosts(queryData);
    }, [ queryData ])
    
    return <Container>
        <PostFilter queryData={queryData} setQueryData={setQueryData}/>
        {post.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>{listCategoriesNoPagination.find(c => c._id === catId)?.name || "Thông tin trọ"}</Card.Header>
                <Card.Body>
                    <div className="list-view-contents">
                        {post?.listPosts?.length !== 0 ?
                            post?.listPosts?.map((item) =>
                            <CardListItem
                                postItem={item}
                                key={item._id}
                            />
                            ) :
                            <Empty description="Không có dữ liệu"/>
                        }
                    </div>
                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Pagination
                        total={post.totalDocs}
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
    const { post, category } = state;
    return { post, category };
}

const mapDispatchToProps = {
    getAllPosts: PostActions.getAllPosts,
    getPostDetail: PostActions.getPostDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsCategory);