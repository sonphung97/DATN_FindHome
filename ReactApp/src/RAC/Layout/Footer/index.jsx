import React from "react";

// styles
import "./styles.scss";

// components
import { Row, Col } from "antd";
import { PhoneOutlined, FacebookOutlined, MailOutlined } from "@ant-design/icons";

const Footer = () => {
    return (
        <Row type="flex" gutter={[20, 20]} className="app-footer">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h1 style={{ color: "#00000099", fontSize: "24px" }}>
                    <strong>Ứng dụng tìm trọ - Find Home</strong>
                </h1>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <h3>{"Hỗ trợ tìm trọ theo khu vực"}</h3>
                <h3>{"Đăng tin dễ dàng - tiện lợi"}</h3>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="right-footer">
                <div>
                    <h3>
                        <PhoneOutlined theme="filled" />
                        {" Mọi thắc mắc vui lòng liên hệ"}: 012.345.6789
                    </h3>
                </div>
                <div>
                    <h3>
                        <a href="https://www.facebook.com">
                            <FacebookOutlined theme="filled" style={{ background: "white", color: "#4267B2" }} />
                            {" Theo dõi fanpage"}
                        </a>
                    </h3>
                </div>
                <div>
                    <h3>
                        <MailOutlined style={{ background: "white", color: "#c71610" }} /> Email: son.phunghong97@gmail.com
                    </h3>
                </div>
            </Col>
        </Row>
    );
};

export default Footer;
