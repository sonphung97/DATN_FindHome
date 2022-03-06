import React from "react";

// redux
import { connect } from "react-redux";

// helpers 
import { formatCurrency, getFullAddress } from 'helpers/formatter';

// constants
import { directionTypes } from 'constants/global';

const DetailInformation = (props) => {
    const { postDetail } = props;

    
    return <React.Fragment>
        <h3 style={{color: "#0f78da"}}>Thông tin nhà trọ, phòng trọ</h3>

        <div className="post-detail-info">
            <div>
                <span>Giá:</span> &ensp;
                <span>{formatCurrency(postDetail.price)}</span>
            </div>

            <div>
                <span>Diện tích:</span> &ensp;
                <span>{postDetail.acreage} m<sup>2</sup></span>
            </div>

            <div>
                <span>Địa chỉ tài sản:</span> &ensp;
                 <span>{getFullAddress(postDetail?.address, postDetail.ward, postDetail.district, postDetail.province)}</span>
            </div>
        </div>

        <div className="post-detail-other-info">
            <div className="post-detail-other-info-title">
                <span>Các thông tin khác</span>
            </div>

            <div className="post-detail-other-info-table">
                <table>
                    <tbody>
                        <tr>
                            <td><span>Chiều ngang</span></td>
                            <td><span>{postDetail.width ? postDetail.width + " m" : "--"}</span></td>
                            <td><span>Chiều dài</span></td>
                            <td><span>{postDetail.length ? postDetail.length + " m" : "--"}</span></td>
                            <td><span>Hướng</span></td>
                            <td><span>{postDetail.direction ? directionTypes[postDetail.direction] : "--"}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </React.Fragment>
};

const mapStateToProps = state => {
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailInformation);