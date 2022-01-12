import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header, MainContent, SidebarProfile } from '../../components';
import * as actions from '../../redux/actions';

function Profile() {
    const { uid } = useParams();
    const dispatch = useDispatch();

    //First check
    useEffect(() => {
        dispatch(actions.checkUserToken());
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.getPosts.getPostsRequestWithUid(uid));
        dispatch(actions.userInfo.getUserInfoRequest(uid));
    }, [uid, dispatch]);

    return (
        <>
            <Header />
            <div className='main'>
                <div className='container main-container profile-container'>
                    <SidebarProfile paramId={uid} />
                    <MainContent />
                </div>
            </div>
        </>
    );
}

export default Profile;
