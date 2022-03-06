import React, {useState, useEffect} from "react";

// redux
import { connect } from "react-redux";
import { PostActions } from '../_redux/actions';

// helpers
import { withRouter } from 'react-router-dom';

// components
import Loading from 'RAC/LoadingSpin';
import EditForm from './EditForm';
import { Empty } from 'antd';

const EditPost = (props) => {
    const { post } = props;
    const { postForUpdate = {} } = post;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);

            const { id } = props.match.params;
            props.getPostDetailForUpdate(id);
        }
    })

    return <React.Fragment>
        {post.isLoading && (<Loading />)}
        {postForUpdate._id && !post.isLoading && <EditForm />}
        {!postForUpdate._id && !post.isLoading && <Empty description="Không có dữ liệu" style={{marginTop: "10px"}}/>}
    </React.Fragment>
};

const mapStateToProps = state => {
    const { post } = state
    return { post };
}

const mapDispatchToProps = {
    getPostDetailForUpdate: PostActions.getPostDetailForUpdate
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));