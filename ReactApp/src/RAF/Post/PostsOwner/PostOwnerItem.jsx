import React from "react";

// redux
import { connect } from "react-redux";
import { PostActions } from '../_redux/actions';

// constants
import { postStatusTypes, routePath } from 'constants/global';

// helpers
import { getFullAddress, formatCurrency } from 'helpers/formatter';

// components
import noImage from 'images/no-image.png';
import { DeleteOutlined, EnvironmentOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Modal} from 'antd';

const { confirm } = Modal;

const PostOwnerItem = (props) => {
    const { postItem, index } = props;

    const showConfirmDelete = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa bài đăng hay không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Xóa",
            cancelText: "Hủy",
            
            onOk() {
                props.deletePost(postItem._id)
            },
            onCancel() {},
        });
    }

    return <tr>
        <td>{index}</td>

        <td className="user-post-item-avatar">
            <img src={postItem.preview || noImage} alt="Ảnh"/>
        </td>

        <td>
            <div className="user-post-item-title">
                <Link to={`/${routePath.postEdit}/${postItem._id}`}>{ postItem.title }</Link>
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

        <td className="user-post-list-delete">
            <DeleteOutlined title="Xóa" onClick={showConfirmDelete} />
        </td>
    </tr>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
    deletePost: PostActions.deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOwnerItem);