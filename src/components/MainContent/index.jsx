import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxCreate, Loading, PostItem } from '..';
import * as actions from '../../redux/actions';
import { authState$, postsState$ } from '../../redux/selectors';
import './mainContent.scss';


function MainContent() {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector(postsState$);
    const { userId } = useSelector(authState$);



    const handleUpdatePost = useCallback((postId, contentEdit, setIsEdit) => {
        dispatch(actions.updatePost.updatePostRequest({
            _id: postId,
            content: contentEdit
        }));
        setIsEdit(false);
    }, [dispatch]);

    const handleDeletePost = useCallback((_id, setIsDelete) => {
        dispatch(actions.deletePost.deletePostRequest(_id));
        setIsDelete(false);
    }, [dispatch])

    const handleLikePost = useCallback((postId, userId, currentLike) => {
        if (userId) {
            let newLike;

            if (currentLike.includes(userId)) {
                newLike = currentLike.filter(item => item !== userId);
            } else {
                newLike = [...currentLike, userId];
            }

            dispatch(actions.updatePost.updatePostRequest({
                _id: postId,
                likeCount: newLike
            }))
        }
    }, [dispatch]);

    return (
        <>
            <section className="content">
                <BoxCreate />
                <div className="content__list">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        data.length > 0 ? (
                            data.map(post => (
                                <PostItem
                                    key={post._id}
                                    data={post}
                                    userId={userId}
                                    onUpdatePost={handleUpdatePost}
                                    onDeletePost={handleDeletePost}
                                    onLike={handleLikePost}
                                />
                            ))
                        ) : (
                            <p className="content__nothing">You don't have any posts yet.</p>
                        )
                    )}
                </div>
            </section>
        </>
    )
}

export default MainContent
