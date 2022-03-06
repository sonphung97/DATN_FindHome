import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import "./styles.scss";

// constants
import { routePath } from 'constants/global';

// components
import { Result } from 'antd';
const Home = loadable(() => import('RAF/Home'));
const Category = loadable(() => import('RAF/Category'));
const Postage = loadable(() => import('RAF/Postage'));
const UserProfile = loadable(() => import('RAF/User/UserProfile'));
const UserPassword = loadable(() => import('RAF/User/UserPassword'));
const RechargeList = loadable(() => import('RAF/RechargeAndPayment/RechargeList'));
const PaymentHistory = loadable(() => import('RAF/RechargeAndPayment/PaymentHistory'));
const UserManagement = loadable(() => import('RAF/User/UserManagement'));
const CreatePost = loadable(() => import('RAF/Post/CreatePost'));
const PostDetail = loadable(() => import('RAF/Post/Detail'));
const PostManagement = loadable(() => import('RAF/Post/ListManagement'));
const PostsOwner = loadable(() => import('RAF/Post/PostsOwner'));
const PostsFollowed = loadable(() => import('RAF/Post/PostsFollowed'));
const EditPost = loadable(() => import('RAF/Post/EditPost'));
const PostsCategory = loadable(() => import('RAF/Post/PostsCategory'));

//Roles access
// 1: guest, 2: user system, 3: admin

export const routes = [
  {
    path: "/",
    exact: true,
    component: ({ match }) => <Home match={match} />
  }, 
  {
    path: `/${routePath.manageCategory}`,
    exact: true,
    roles: [3],
    component: ({ match }) => <Category match={match} />
  },
  {
    path: `/${routePath.managePostage}`,
    exact: true,
    roles: [3],
    component: ({ match }) => <Postage match={match} />
  },
  {
    path: `/${routePath.profile}`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <UserProfile match={match} />
  },
  {
    path: `/${routePath.password}`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <UserPassword match={match} />
  },
  {
    path: `/${routePath.recharge}`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <RechargeList match={match} />
  },
  {
    path: `/${routePath.payment}`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <PaymentHistory match={match} />
  },
  {
    path: `/${routePath.manageUser}`,
    exact: true,
    roles: [3],
    component: ({ match }) => <UserManagement match={match} />
  },
  {
    path: `/${routePath.createPost}`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <CreatePost match={match} />
  },
  {
    path: `/${routePath.postDetail}/:slug.:id.net`,
    exact: true,
    component: ({ match }) => <PostDetail match={match} />
  },
  {
    path: `/${routePath.postManageList}`,
    exact: true,
    roles: [3],
    component: ({ match }) => <PostManagement match={match} />
  },
  {
    path: `/${routePath.postsOwner}`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <PostsOwner match={match} />
  },
  {
    path: `/${routePath.postEdit}/:id`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <EditPost match={match} />
  },
  {
    path: `/${routePath.postFollowed}`,
    exact: true,
    roles: [2, 3],
    component: ({ match }) => <PostsFollowed match={match} />
  },
  {
    path: `/${routePath.postCategory}/:catId`,
    exact: true,
    component: ({ match }) => <PostsCategory match={match} />
  },
  {
    path: "*",
    component: class NotFound extends React.PureComponent {
      static propTypes = {
        staticContext: PropTypes.object
      };

      constructor(props, context) {
        super(props, context);

        if (this.props.staticContext) {
          this.props.staticContext.code = 404;
        }
      }

      render() {
        return (
          <Result
            status="404"
            title="Lỗi 404 | Trang không tồn tại!"
          />
        );
      }
    }
  }
];

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Switch>
    {routes.map(
      ({ path, exact = false, roles = false, component }, index) => {
        if (roles) {
          return (
            <PrivateRoute
              key={index}
              exact={exact}
              path={path}
              roles={roles}
              component={component}
            />
          );
        }
        return (
          <Route key={index} exact={exact} path={path} component={component} />
        );
      }
    )}
  </Switch>
);
