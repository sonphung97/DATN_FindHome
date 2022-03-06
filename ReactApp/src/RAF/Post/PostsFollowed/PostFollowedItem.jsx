import React from "react";

// redux
import { connect } from "react-redux";
// import { PostActions } from '../_redux/actions';

// constants
import { postStatusTypes, routePath } from 'constants/global';

// helpers
import { getFullAddress, formatCurrency, slugRoute } from 'helpers/formatter';

// components
import noImage from 'images/no-image.png';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const PostItem = (props) => {
    const { auth } = props;
    const { postItem, index } = props;

    const unFollow = async () => {
        let data = {
            rates: postItem.rates,
            follows: postItem?.follows?.filter(f => f !== auth?.user?._id),
            comments: postItem.comments
        }
        // await props.interaction(postItem._id, data);
        // await props.reLoadAfterUnFollow();
    }

    return <tr>
        <td>{index}</td>

        <td className="user-post-item-avatar">
            <img src={postItem.preview || noImage} alt="Ảnh"/>
        </td>

        <td>
            <div className="user-post-item-title">
                <Link to={`/${routePath.postDetail}/${slugRoute(postItem.title)}.${postItem._id}.net`}>{ postItem.title }</Link>
            </div>
            <div>
                <EnvironmentOutlined style={{color: "green"}}/> &ensp;
                <span style={{ fontStyle: "italic" }}>
                    {getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}
                </span>
            </div>
        </td>

        <td>
            {formatCurrency(postItem.price)}
        </td>

        <td style={{ color: `${postItem.status ? postStatusTypes[postItem.status].color : "black"}` }}>
            {postItem.status ? postStatusTypes[postItem.status].title : "--"}
        </td>

        <td>
            <Button type="secondary" onClick={unFollow}>
                Bỏ theo dõi
            </Button>
        </td>
    </tr>
};

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
    // interaction: PostActions.interaction
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);