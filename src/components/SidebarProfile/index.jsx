import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Loading } from '..';
import { authState$, modalState$, userState$ } from '../../redux/selectors';
import './sidebarProfile.scss';
import * as actions from '../../redux/actions';
import ModalEditProfile from '../ModalEditProfile';
import { memo } from 'react';

function SidebarProfile({ paramId }) {
    const dispatch = useDispatch();
    const { isShowProfile } = useSelector(modalState$);
    const { name, photoId, isLoading, id, bio } = useSelector(userState$);
    const { userId } = useSelector(authState$);

    return (
        <section className='sidebar'>
            <div className='sidebar__container'>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className='sidebar__profile'>
                        <Avatar
                            photoId={photoId}
                            name={name}
                            size='large'
                            className='sidebar__profile-avatar'
                        />
                        <h2 className='sidebar__profile-title'>{name}</h2>
                        <p className='sidebar__profile-bio'>{bio}</p>
                        {userId === paramId && (
                            <Button
                                type='secondary'
                                name='Edit profile'
                                onClick={() => dispatch(actions.modalProfile.openModalProfile())}
                            />
                        )}
                    </div>
                )}
            </div>
            {isShowProfile && (
                <ModalEditProfile userName={name} userId={id} photoId={photoId} bio={bio} />
            )}
        </section>
    );
}

export default memo(SidebarProfile);
