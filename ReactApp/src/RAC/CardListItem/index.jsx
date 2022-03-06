import React from 'react';

// styles
import './styles.scss';

// helpers
import { averageRating } from 'helpers/global';
import { slugRoute, getFullAddress, formatCurrency } from 'helpers/formatter';
import 'moment/locale/vi';
import moment from 'moment';

// constants
import { directionTypes, routePath } from 'constants/global';

// components
import { Link } from 'react-router-dom';
import noImage from 'images/no-image.png';
import { Rate } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

moment.locale('vi');

const CardListItem = (props) => {
    const { postItem = {} } = props;

    return (
        <div className="sale-item">
            <div className="sale-item-title">
                <div>
                    <Link to={`/${routePath.postDetail}/${slugRoute(postItem.title)}.${postItem._id}.net`}>{ postItem.title }</Link>
                </div>
                <div>
                    <span>{moment(postItem.createdAt).fromNow()}</span>
                </div>
            </div>
            
            <div>
                <Rate className="sale-item-rate" allowHalf disabled value={averageRating(postItem?.rates)} />
            </div>

            <div className="sale-item-info">
                <div className="sale-item-avatar">
                    <img src={postItem.preview ? postItem.preview : noImage} alt=""/> 
                </div>
                
                <div className="sale-item-content">
                    <div>{ postItem.metaDescription }</div>
                    
                    <div className="sale-item-other-info">
                        <div>
                            <span>Diện tích:</span> &ensp;
                            <span >{postItem.acreage} m<sup>2</sup></span>
                        </div>

                        <div>
                            <span>Kích thước:</span> &ensp;
                            <span>
                                {(postItem.width && postItem.length) ? `${postItem.width} x ${postItem.length} m` : "--"}
                            </span>
                        </div>
                        
                        <div>
                            <span>Hướng:</span> &ensp;
                            <span>{postItem.direction !== undefined ? directionTypes[postItem.direction] : "--"}</span>
                        </div>

                        <div>
                            <span>Giá:</span> &ensp;
                            <span>{formatCurrency(postItem.price)} / tháng</span>
                        </div>

                        <div>
                            <EnvironmentOutlined style={{color: "green"}}/> &ensp;
                            <span style={{fontStyle: "italic"}}>{getFullAddress(postItem?.address, postItem.ward, postItem.district, postItem.province)}</span>
                        </div>

                        {/* {postItem.floorNumber && <div>
                            <span>Số lầu:</span> &ensp;
                            <span>{postItem.floorNumber}</span>
                        </div>}
                        
                        {postItem.bedroomNumber && <div>
                            <span>Số phòng ngủ:</span> &ensp;
                            <span>{postItem.bedroomNumber}</span>
                        </div>}

                        {postItem.roadAhead && <div>
                            <span>Đường trước nhà:</span> &ensp;
                            <span>{postItem.roadAhead} m</span>
                        </div>} */}

                    </div>
                </div>
            </div>
        </div>
  );
};

export default CardListItem;
