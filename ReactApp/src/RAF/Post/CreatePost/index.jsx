import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import { Form, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//helpers
import { formatCurrency } from 'helpers/formatter';

//actions
import { PostActions } from '../_redux/actions';
import { UserActions } from '../../User/_redux/actions';

// constants 
import { routePath } from 'constants/global';

//components
import { Address, DetailImages, GoogleMap, MoreInfo,
    Postage, PreviewImage, RequiredInfo } from '../Form';

const { confirm } = Modal;

const CreatePost = (props) => {

    const { post, auth, user, postage } = props;
    const { listPostages = [] } = postage;
    const { userDetail = { balance: 0 } } = user;
    const { postCreated = {}} = post;

    const [loaded, setLoaded] = useState(false);

    const [location, setLocation] = useState(null);

    const [preview, setPreview] = useState([]);

    const [images, setImages] = useState([]);

    const [description, setDescription] = useState("");

    const [type, setType] = useState(0);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true)
            props.getUserDetail(auth?.user?._id)
        }
    })
    
    const onSubmit = async (values) => {
        let imagesUploaded = await uploadImage();
        if (imagesUploaded?.preview?.length) {
            values.preview = imagesUploaded.preview[0];
        }

        if (imagesUploaded?.images?.length) {
            values.images = imagesUploaded.images;
        }
        values.location = location;
        values.description = description;
        await props.createPost(values);
    };

    const uploadImage = async () => {
        let previewUpload = new FormData();
        let imagesUpload = new FormData();
        let hasUpload = false;

        if (images?.length) {
            await images.forEach((e) => {
                if (e.originFileObj) {
                    imagesUpload.append("file", e.originFileObj);
                    imagesUpload.folder = "images";
                    if (!hasUpload) hasUpload = true;
                }
            })
        }

        if (preview?.length) {
            if (preview[0].originFileObj) {
                previewUpload.append("file", preview[0].originFileObj);
                previewUpload.folder = "preview";
                if (!hasUpload) hasUpload = true;
            }
        }

        if (hasUpload) {
            await props.requestUploading()
            const data = await PostActions.uploadAvatarAndImage(previewUpload, imagesUpload);
            return data;
        }

        return undefined;
    }

    const checkPayment = (values) => {
        if (!values.postageId) {
            onSubmit(values)
        } else {
            const postageInfo = listPostages.find(f => values.postageId === f._id)
            if (postageInfo) {
                values.postage = postageInfo.postage;
                values.postagePoint = postageInfo.point;

                if (postageInfo.postage <= userDetail.balance) {
                    confirmPayment(values)
                } else {
                    confirmRecharge(values)
                }
            }
        }
    }

    const confirmPayment = (values) => {
        confirm({
            title: `Xác nhận thanh toán ${formatCurrency(values.postage)} (vnđ) cho bài đăng`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Thanh toán",
            cancelText: "Hủy",
            onOk() { onSubmit(values) },
            onCancel() {},
        });
    }

    const confirmRecharge = (values) => {
        confirm({
            title: `Số dư tài khoản không đủ, vui lòng nạp thêm tiền vào tài khoản!`,
            icon: <ExclamationCircleOutlined />,
            content: 'Vui lòng xác nhận',
            okText: "Nạp tiền",
            cancelText: "Hủy",
            onOk() { props.history.push(`/${routePath.recharge}`) },
            onCancel() {},
        });
    }

    if (postCreated?._id) window.location.href = `/${routePath.postEdit}/${postCreated?._id}`;
    
    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Đăng tin </Card.Header>
                
            <Form
                layout="vertical"
                name="post"
                onFinish={checkPayment}
            >
                <Card.Body>
                    <RequiredInfo
                        onChangeDescription={setDescription}
                        description={description}
                        type={type}
                        setType={setType}
                    />
                    
                    <Address />

                    <MoreInfo />

                    <GoogleMap
                        onChangeLocation={setLocation}
                        location={location}
                    />
                        
                    <Postage />

                </Card.Body>
                <Card.Footer styles={{textAlign: "right"}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={post.isLoading}>
                            Đăng bài
                        </Button>
                    </Form.Item>
                </Card.Footer>
            </Form>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Thêm ảnh cho bài đăng</Card.Header>
            <Card.Body>
                    
                <PreviewImage
                    preview={preview}
                    setPreview={setPreview}
                />
                    
                <DetailImages
                    images={images}
                    setImages={setImages}
                />
                    
            </Card.Body>
        </ Card>
    </Container.Col>
</Container>
};

const mapStateToProps = state => {
    const { post, auth, user, postage } = state
    return { post, auth, user, postage };
}

const mapDispatchToProps = {
    createPost: PostActions.createPost,
    requestUploading: PostActions.requestUploading,
    getUserDetail: UserActions.getUserDetail
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost));