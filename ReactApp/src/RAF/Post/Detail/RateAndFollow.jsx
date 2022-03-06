import React from "react";

// redux
import { connect } from "react-redux";

// helpers
import { averageRating } from 'helpers/global';

// styles
import './styles.scss';

// components
import { PostActions } from '../_redux/actions';
import { Rate, Button } from 'antd';

const RateAndFollow = (props) => {
    const { postDetail } = props;
    const { auth } = props;
    const { isAuth, user } = auth;

    const hasFollow = () => {
        if (!isAuth) return false;
        return postDetail?.follows?.includes(user._id)
    }

    const followChange = () => {
        if (hasFollow()) {
            let data = {
                follows: postDetail?.follows?.filter(f => f !== user._id)
            }
            props.follow(postDetail._id, data);
        } else {
            let data = {
                follows: [...postDetail.follows,...[user._id]]
            }
            props.follow(postDetail._id, data);
        }
    }

    const isDisableRate = () => {
        if (!isAuth) return true;
        for (let i = 0; i < postDetail.rates?.length; ++i) {
            if (postDetail.rates[i].user === user._id) return true;
        }
        return false;
    }

    const changeRate = (value) => {
        let data = {
            rates: [...postDetail.rates, ...[{
                rate: value,
                user: user._id
            }]]
        }
        props.rate(postDetail._id, data);
    }

    return (
        <div style={{ marginTop: "1.5rem" }}>
            <hr />
            <h3 style={{ color: "#0f78da" }}>Đánh giá bài viết</h3>
            
            <div className="post-detail-rate-and-follow">
                <Rate className="sale-item-rate" onChange={changeRate} disabled={isDisableRate()} value={averageRating(postDetail?.rates)} />
                {isAuth && !hasFollow() && <Button type="dashed" onClick={followChange}>Theo dõi</Button>}
                {isAuth && hasFollow() && <Button type="primary" onClick={followChange}>Đang theo dõi</Button>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
    rate: PostActions.rate,
    follow: PostActions.follow,
}

export default connect(mapStateToProps, mapDispatchToProps)(RateAndFollow);