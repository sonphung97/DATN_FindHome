import React from "react";

// redux
import { connect } from "react-redux";

// style
import './styles.scss';

// component
import {  Upload } from 'antd';

const PreviewImage = (props) => {
    const { preview, setPreview } = props;
    
    const onChange = ({ fileList: newFileList }) => {
        setPreview(newFileList);
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
            <span>Ảnh xem trước</span>
        </div>

        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={preview}
            onChange={onChange}
            onPreview={onPreview}
            accept="image/*"
        >
            {preview.length < 1 && '+ Chọn ảnh'}
        </Upload>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(PreviewImage);