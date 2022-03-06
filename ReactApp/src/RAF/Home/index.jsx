import React, {useState, useEffect} from "react";

// redux
import { connect } from "react-redux";
import { PostActions } from '../Post/_redux/actions';

// components
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/LoadingSpin';
import CardListItem from 'RAC/CardListItem';
import { Pagination, Empty } from 'antd';
import PostFilter from '../Post/Filter';


const Home = (props) => {
    const { post } = props;

    const [loaded, setLoaded] = useState(false);
    const [queryData, setQueryData] = useState({
        limit: 10,
        page: 1,
        status: 2
    })

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllPosts(queryData);
        }
    }, [loaded])
    
    useEffect(() => {
        props.getAllPosts(queryData);
    }, [queryData])
    
    return <Container>
        <PostFilter queryData={queryData} setQueryData={setQueryData}/>
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>Thông tin trọ</Card.Header>
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
                        pageSizeOptions={[2, 10, 15, 20, 50]}
                        showTotal={total => `Tổng ${total} mục`}
                    />
                </Card.Footer>
            </ Card>
        </Container.Col>
    </Container>
};

const mapStateToProps = state => {
    const { post } = state;
    return { post };
}

const mapDispatchToProps = {
    getAllPosts: PostActions.getAllPosts,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
