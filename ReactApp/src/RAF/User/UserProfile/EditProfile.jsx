import React, {useState} from "react";

// redux
import { connect } from "react-redux";
import { UserActions } from '../_redux/actions';

// constants
import { layout, tailLayout } from 'constants/createFormLayoutConfig';

// styles
import './styles.scss';

// components
import { Button, Form, Input } from "antd";
import Avatar from './Avatar';
import { UploadHelpers } from 'helpers/upload';

const EditProfile = (props) => {
    const { auth, user } = props;
    const { userDetail = {} } = user;

    const [avatar, setAvatar] = useState( userDetail.avatar ? [
        {
          uid: '123456789',
          status: 'done',
          url: userDetail.avatar,
        }
    ] : []);

    const updateUser = async (values) => {
        let avatarLink = await uploadImage();
        values.avatar = avatarLink;
        if (avatar.length && !avatar[0].originFileObj) {
            values.avatar = avatar[0].url;
        }
        props.updateUser(auth.user._id, values);
    }

    const uploadImage = async () => {
        let avatarUpload = new FormData();
        let hasUpload = false;

        if (avatar?.length) {
            if (avatar[0].originFileObj) {
                avatarUpload.append("file", avatar[0].originFileObj);
                if (!hasUpload) hasUpload = true;
            }
        }

        if (hasUpload) {
            const data = await UploadHelpers.uploadSingleImage(avatarUpload);
            if (data && data.length) return data[0];
            return data;
        }

        return undefined;
    }
    
    return <React.Fragment>
        <div className="profile-avatar">
            <Avatar
                avatar={avatar}
                setAvatar={setAvatar}
            />    
        </div>
                    
        <Form
            {...layout}
            name="basic"
            initialValues={userDetail.name ? userDetail : undefined}
            onFinish={ updateUser}
        >
            <Form.Item
                name="name"
                label="Tên hiển thị"
                rules={[
                    {
                        required: true,
                        message: 'Tên không được bỏ trống',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Email không được bỏ trống',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                    {
                        required: true,
                        message: 'Số điện thoại không được bỏ trống',
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={user.isLoading}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    </React.Fragment>
            
};

const mapStateToProps = state => {
    const { user, auth } = state;
    return { user, auth };
}

const mapDispatchToProps = {
    updateUser: UserActions.updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);