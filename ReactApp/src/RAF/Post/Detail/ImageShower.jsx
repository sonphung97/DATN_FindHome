import React, {useState} from "react";
import { connect } from "react-redux";

const ImageShower = (props) => {
    const { images } = props;

    const [currentImage, setCurrentImage] = useState(images[0]);
    
    return <React.Fragment>
        <h3 style={{color: "#0f78da"}}>Hình ảnh chi tiết</h3>
        <div className="post-image-detail-show">
            <img src={currentImage} alt="Ảnh"/>
        </div>

        <div className="post-image-detail-list">
            {images.map((i) => <div onClick={() => setCurrentImage(i)}>
                <img src={i} alt="Ảnh" />
                </div>)}
        </div>
    </React.Fragment>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageShower);