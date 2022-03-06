import React, {useEffect, useState} from "react";

// redux
import { connect } from "react-redux";
import { UserActions } from '../_redux/actions';

// styles
import './styles.scss';

// components
import Loading from 'RAC/LoadingSpin';
import Container from 'RAC/Container';
import Card from 'RAC/Card';
import EditProfile from './EditProfile';

const UserProfile = (props) => {
    const { auth, user } = props;
    const { userDetail = {} } = user;

    // state
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getUserDetail(auth.user._id)
        }
    })

    return <Container>
        {user.isLoading && <Loading />}
        <Container.Col colSpan={12}>
            <Card >
                <Card.Header>Thay đổi thông tin cá nhân</Card.Header>
                <Card.Body>
                    {userDetail._id && <EditProfile />}
                </Card.Body>
            </ Card>
        </Container.Col>
    </Container>
};

const mapStateToProps = state => {
    const { user, auth } = state;
    return {user, auth};
}

const mapDispatchToProps = {
    getUserDetail: UserActions.getUserDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);