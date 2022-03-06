import React, {useEffect, useState} from "react";

// redux
import { connect } from "react-redux";
import { PostActions } from '../_redux/actions';

// constants
import { routePath } from 'constants/global';

// styles
import './styles.scss';

// components
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import Loading from 'RAC/LoadingSpin';
import ImageShower from './ImageShower';
import DetailInformation from './DetailInformation';
import GoogleMap from './GoogleMap';
import RateAndFollow from './RateAndFollow';
import Comment from './Comment';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const PostDetail = (props) => {
    const { post, postId = "" } = props;
    const { postDetail = {} } = post;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            const id = props.match?.params?.id;
            props.getPostDetail(id || postId);
        }
    }, [loaded] )

    useEffect(() => {
        if (postId) {
            props.getPostDetail(postId);
        }
    }, [postId])
    
    return <Container>
    {post.isLoading && <Loading />}
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>{postDetail?.title}</Card.Header>
                
            <Card.Body>
                {/* Không có bài viết mới hiện thị mô tả ngắn */}
                {!postDetail.description && <div>
                    {postDetail.metaDescription}
                </div>}

                <div
                    dangerouslySetInnerHTML={{ __html: postDetail.description }}
                    className="scroll-thin"
                    style={{overflowY: "auto", maxHeight: "100vh", marginBottom: "1rem"}}
                />
                <hr />
                
                <DetailInformation postDetail={postDetail}/>

                {!!postDetail.images && !!postDetail.images.length && postDetail.images.length !== 0 &&
                    <React.Fragment>
                        <hr/>
                        <ImageShower images={postDetail.images} />
                    </React.Fragment>
                }
                    
                {postDetail?.location?.lat &&
                    <React.Fragment>
                        <hr/>
                        <GoogleMap location={postDetail.location} />
                    </React.Fragment>}
                
                <div style={{ marginTop: "1.5rem" }}>
                    <hr />        
                    <h3 style={{color: "#0f78da"}}>Danh mục</h3>
                    {Array.isArray(postDetail.categories) && postDetail.categories.map(c => (
                        <span className="badge-info">
                            <Link to={`/${routePath.postCategory}/${c._id || ""}`}>{c.name}</Link>
                        </span>
                    ))}    
                </div>

                <RateAndFollow
                    postDetail={{ ...postDetail }}
                />
                
                <Comment 
                    postDetail={{ ...postDetail }}
                />
            </Card.Body>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Thông tin liên hệ</Card.Header>
            <Card.Body>
                <div className="post-detail-item-header">
                    <span>Thông tin người đăng</span>
                </div>
                
                <div className="post-detail-user-contact">
                    <div>
                        <UserOutlined /> &ensp;
                        <span>{postDetail?.userName}</span>
                    </div>
                        
                    <div>
                        <PhoneOutlined /> &ensp;
                        <span>{postDetail?.userPhone}</span>    
                    </div>
                </div>
            </Card.Body>
        </ Card>
    </Container.Col>
</Container>
};

const mapStateToProps = state => {
    const { post } = state;
    return { post };
}

const mapDispatchToProps = {
    getPostDetail: PostActions.getPostDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);