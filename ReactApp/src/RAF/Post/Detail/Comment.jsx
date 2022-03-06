import React, {useState} from "react";

// redux
import { PostActions } from '../_redux/actions';
import { connect } from "react-redux";

// helpers
import { createItemKey } from 'helpers/global';

// images
import userImage from 'images/user.png';

// styles
import './styles.scss';

// Components
import CommentItem from './CommentItem';
import { Input, Avatar } from 'antd';
import { UserOutlined, SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Interaction = (props) => {
    const { postDetail } = props;
    const { auth } = props;
    const { isAuth, user } = auth;

    const [commentText, setCommentText] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const [commentEditId, setCommentEditId] = useState("");

    const _comment = async (data) => {
        let dataFormat = {
            comments: data.comments.map(c => {
                return {
                    user: c.user._id,
                    comment: c.comment,
                    date: c.date
                }
            })
        }

        props.comment(postDetail._id, dataFormat);
    }

    const addComment = () => {
        if (!commentText.length) return;
        const newComment = {
            comment: commentText,
            user: { _id: user._id },
            date: new Date()
        };

        let data = {
            comments: [...[newComment], ...postDetail.comments]
        }
        _comment(data);
        
        setCommentText("");
    }

    const deleteComment = (_id) => {
        let data = {
            comments:  postDetail.comments.filter(c => c._id !== _id)
        }
        _comment(data)
    }

    //Đưa data cần sửa vào ô input, chuyển trạng thành đang chỉnh sửa
    const setEditInfo = (com) => {
        if (!isEditing) {
            setIsEditing(true);
            setCommentText(com.comment);
            setCommentEditId(com._id)
            document.getElementById(`post-comment-input`)?.focus();
        } else {
            setIsEditing(false);
            setCommentText("");
        }
    }

    const updateComment = () => {
        let data = {
            comments: postDetail.comments.map(c => {
                if (c._id !== commentEditId) {
                    return c;
                } else {
                    return {
                        ...c,
                        comment: commentText
                    }
                }
            })
        }
        _comment(data)

        setCommentEditId("")
        setCommentText("")
        setIsEditing(false)
    }

    const onChangeCommnent = (e) => {
        const { value } = e.target;
        setCommentText(value);
    }

    return  <div className="post-comment">
        {isAuth ?
            (<div className="post-comment-input">
                <Avatar
                    style={{
                        backgroundColor: '#87d068',
                    }}
                    icon={<UserOutlined />}
                    src={user.avatar || userImage}
                    size={40}
                />
                <TextArea rows={2} value={commentText} onChange={onChangeCommnent} id="post-comment-input" placeholder="Viết bình luận..." />
                <div onClick={isEditing ? updateComment : addComment}>
                    <SendOutlined style={{ fontSize: "2rem", color: "green" }} />
                </div>
            </div>)
            :
            (<p style={{ color: "red" }}>Đăng nhập để có thể bình luận</p>)}
        
        <div className="post-list-comment">
            {Array.isArray(postDetail.comments) && postDetail.comments.map((c, index) => {
                return <CommentItem
                    key={createItemKey()}
                    item={c}
                    deleteComment={deleteComment}
                    setEditInfo={setEditInfo}
                    updateComment={updateComment}
                />
            })}
        </div>
    </div>
}

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
}

const mapDispatchToProps = {
    comment: PostActions.comment
}

export default connect(mapStateToProps, mapDispatchToProps)(Interaction);