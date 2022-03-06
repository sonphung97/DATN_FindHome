import React, { useState, useEffect } from "react";

// styles
import "./style.scss";

// redux
import { connect, useSelector } from "react-redux";
import { AuthActions } from 'RAF/Authentication/_redux/actions';
import { CategoryActions } from 'RAF/Category/_redux/actions';

// components
import { Link } from "react-router-dom";
import { Layout, Button, Avatar } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
import Login from 'RAF/Authentication';
import Register from 'RAF/User/Register';
import DropdownList from 'RAC/DropdownList';

// constants
import { dropdownManageData, dropdownPersonalData } from 'constants/dropdownConfig';
import { routePath } from 'constants/global';

// images
import userImage from 'images/user.png';

const { Header } = Layout;

const Headers = (props) => {
    const { listCategoriesNoPagination = [] } = props.category;
    const { isAuth = false, user, currentRole } = useSelector(state => state.auth);
    const { isnewRegister = false } = useSelector(state => state.user)
    const [state, setState] = useState({
        visibleLogin: false,
        visibleRegister: false,
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(
        () => {
            if (isAuth && state.visibleLogin) {
                setState({visibleLogin: false})
            }
        }, [isAuth, state])
    
    useEffect(
        () => {
            if (isnewRegister && state.visibleRegister) {
                setState({visibleRegister: false})
            }
        }, [isnewRegister])

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getAllCategoriesNoPagination()
        }
    }, [ loaded ])
    
    return <Header className="header" style={{ lineHeight: "55px", height: "55px" }}>
        <div className="header-left">
            <Link to="/" >
                <BankOutlined />
                <span>Find Home</span>
            </Link>
        </div>
        <div className="header-center">
            <div className="header-center-menu">
                <Link to="/">
                    <div className="header-center-item">Trang chủ</div>
                </Link>
                <DropdownList
                    title="Phòng trọ"
                    items={listCategoriesNoPagination.filter(c => c.type === 1)}
                />
                 <DropdownList
                    title="Nhà trọ"
                    items={listCategoriesNoPagination.filter(c => c.type === 2)}
                />
                { [2, 3].includes(currentRole) &&<Link to={`/${routePath.createPost}`}>
                    <div className="header-center-item">Đăng bài</div>
                </Link>}
                {/* <Link to="/">
                    <div className="header-center-item">Thống kê</div>
                </Link> */}
                {[3].includes(currentRole) && <DropdownList
                    title="Quản lý"
                    items={dropdownManageData}
                    columns={1}
                    isManage
                />}
                {[2, 3].includes(currentRole) && <DropdownList
                    title="Tài khoản cá nhân"
                    items={dropdownPersonalData}
                    columns={1}
                    isManage
                />}
            </div>
         </div>
        <div className="header-right">
            {isAuth ? (
                <div>
                    <Avatar
                        style={{
                            backgroundColor: '#87d068',
                        }}
                        icon={<UserOutlined />}
                        src={user?.avatar || userImage}
                    />
                    <span style={{ color: "#000", marginLeft: '0.25rem', fontWeight: "600" }}>{user.name}</span>
                    <span style={{color: "#68294c", cursor: "pointer"}} onClick={() => AuthActions.logOut()}> (đăng xuất)</span>
                </div>
            ) : (
                <React.Fragment>
                    <Button
                        onClick={() => setState({...state, visibleRegister: true})}
                        type="primary"
                        className="button-color"
                    >
                        Đăng ký
                    </Button>
                        
                    <Button
                        onClick={() => setState({...state, visibleLogin: true})}
                        type="primary"
                        style={{
                            marginLeft: '0.5rem',
                        }}
                        className="button-color"
                    >
                        Đăng nhập
                    </Button>
                </React.Fragment>
            )}
            
            <Login visibleLogin={state.visibleLogin} setState={setState} />
            <Register visibleRegister={state.visibleRegister} setState={setState}/>
        </div>
    </Header>;
};

const mapStateToProps = state => {
    const { category } = state;
    return { category };
}

const mapDispatchToProps = {
    getAllCategoriesNoPagination: CategoryActions.getAllCategoriesNoPagination
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
