import React from "react";

// redux
import { connect } from "react-redux";

// style
import './styles.scss';

// component
import {  Upload } from 'antd';

const DetailImages = (props) => {
    const { images, setImages } = props;
    
    const onChange = ({ fileList: newFileList }) => {
        setImages(newFileList);
    };
    
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return <React.Fragment>
        <div className="post-add-item-header" style={{marginTop: "1rem"}}>
            <span>Hình ảnh chi tiết</span>
        </div>

        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={images}
            onChange={onChange}
            onPreview={onPreview}
            accept="image/*"
        >
            {images.length < 9 && '+ Chọn ảnh'}
        </Upload>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailImages);