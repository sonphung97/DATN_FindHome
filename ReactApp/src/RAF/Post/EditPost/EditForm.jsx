import React, {useState, useEffect} from "react";

// redux
import { connect } from "react-redux";
import { CountryActions } from '../../Country/_redux/actions';
import { PostActions } from '../_redux/actions';

// helpers
import { withRouter } from 'react-router-dom';

// constants
import { routePath } from 'constants/global';

// components
import Container from 'RAC/Container';
import Card from 'RAC/Card';

import { Form, Button } from 'antd';


//components
import { Address, DetailImages, GoogleMap, MoreInfo,
    Postage, PreviewImage, RequiredInfo } from '../Form';

const EditForm = (props) => {

    const { post, country } = props;
    const { postForUpdate = {} } = post;
    const { provincesData = [], districtsData = [] } = country;
    
    const [type, setType] = useState(postForUpdate.type);
    const [location, setLocation] = useState(postForUpdate.location);
    const [preview, setPreview] = useState(postForUpdate.preview ? [
        {
          uid: 'previewImage',
          status: 'done',
          url: postForUpdate.preview,
        }
    ] : []);
    const [images, setImages] = useState(
        postForUpdate?.images?.length ?
        postForUpdate.images.map((i) => {
            return {
                uid: i,
                status: 'done',
                url: i,
            }
        }) :
        []
    );

    const [description, setDescription] = useState(postForUpdate.description || "");

    useEffect(() => {
        let provinceInfo = provincesData.find(p => p._id === postForUpdate.province)
        if (provinceInfo) {
            props.getDistricts({ provinceId: provinceInfo.id })
        }
    }, [provincesData]);

    useEffect(() => {
        let districtInfo = districtsData.find(d => d._id === postForUpdate.district)
        if (districtInfo) {
            props.getWards({ districtId: districtInfo.id })
            }
    }, [districtsData])
    
    const onSubmit = async (values) => {
        let imagesUploaded = await uploadImage();
        if (imagesUploaded?.preview?.length) {
            values.preview = imagesUploaded.avatar[0];
        } else if (!preview?.length) {
            //Trong trường hợp ảnh bị xóa
            values.preview = undefined;
        } else {
            values.preview = preview[0].url;
        }

        if (imagesUploaded?.images?.length) {
            let imagesAdded = images.filter(i => !i.originFileObj) || [];
            
            values.images = imagesAdded.map(i => i.url).concat(imagesUploaded.images);
        } else {
            let imagesAdded = images.filter(i => !i.originFileObj) || [];

            //Filter đi các hình ảnh bị xóa
            values.images = imagesAdded.map(i => i.url);
        }
            
        values.location = location;
        values.description = description;

        console.log("v", values)
        await props.updatePost( postForUpdate._id, values);

        if (post.postForUpdate._id && !post.isLoading) props.history.push(`/${routePath.postsOwner}`);
    };

    const uploadImage = async (values) => {
        let previewUpload = new FormData();
        let imagesUpload = new FormData();
        let hasUpload = false;

        if (images?.length) {
            images.forEach((e) => {
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
    
    return <Container>
    <Container.Col colSpan={9}>
        <Card >
            <Card.Header>Chỉnh sửa bài đăng</Card.Header>
                
            <Form
                layout="vertical"
                name="post"
                onFinish={onSubmit}
                initialValues={postForUpdate}
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
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Card.Footer>
            </Form>
        </ Card>
    </Container.Col>
    <Container.Col colSpan={3}>
        <Card >
            <Card.Header style={{backgroundColor: "#0090b5", color: "white"}}>Chỉnh sửa ảnh</Card.Header>
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
    const { post, country } = state
    return { post, country };
}

const mapDispatchToProps = {
    updatePost: PostActions.updatePost,
    requestUploading: PostActions.requestUploading,
    getDistricts: CountryActions.getDistricts,
    getWards: CountryActions.getWards
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm));