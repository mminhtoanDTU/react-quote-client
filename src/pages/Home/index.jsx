import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, MainContent, SidebarQuote } from '../../components';
import * as actions from '../../redux/actions';



function HomePage(props) {
    const dispatch = useDispatch();
    //First check
    useEffect(() => {
        dispatch(actions.checkUserToken());
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.getPosts.getPostsRequest());
    }, [dispatch]);

    return (
        <>
            <Header />
            <div className="main">
                <div className="container main-container">
                    <MainContent />
                    <SidebarQuote />
                </div>
            </div>

        </>
    );
}

export default HomePage;