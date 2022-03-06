import { routePath } from './global';

export const dropdownManageData = [{
    name: "Quản lý người dùng",
    path: `${routePath.manageUser}`
},{
    name: "Quản lý danh mục",
    path: `${routePath.manageCategory}`
},{
    name: "Quản lý phí bài đăng",
    path: `${routePath.managePostage}`
},{
    name: "Quản lý bài đăng",
    path: `${routePath.managePost}`
}]

export const dropdownPersonalData = [{
    name: "Thông tin cá nhân",
    path: `${routePath.profile}`
},{
    name: "Đổi mật khẩu",
    path: `${routePath.password}`
},{
    name: "Lịch sử nạp tiền",
    path: `${routePath.recharge}`
},{
    name: "Lịch sử thanh toán",
    path: `${routePath.payment}`
},{
    name: "Bài đăng cá nhân",
    path: `${routePath.postsOwner}`
},{
    name: "Bài đăng đang theo dõi",
    path: `${routePath.postFollowed}`
}]