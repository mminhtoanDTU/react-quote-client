import React, { memo, useCallback, useEffect, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Avatar, Button } from '..';
import * as actions from '../../redux/actions';

function ModalEditProfile(props) {
    const { userName, photoId, userId, bio } = props;
    const [fileUpload, setFileUpload] = useState();
    const [userInput, setUserInput] = useState({ name: userName, bio: bio });
    const dispatch = useDispatch();

    //Prevent Page Scrolling When a Modal is Open
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        if (isBrowser) {
            document.body.style.paddingRight = '15px';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
        };
    }, []);

    //Preview Image Uploaded
    useEffect(() => {
        return () => {
            fileUpload && URL.revokeObjectURL(fileUpload.preview);
        };
    }, [fileUpload]);

    const hanldeUploadAvatar = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setFileUpload(file);
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        const userData = { ...userInput };
        if (fileUpload) {
            const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
            const formData = new FormData();
            formData.append('file', fileUpload);
            formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const photoId = await res.json();
            userData.photoId = photoId.public_id;
        }

        dispatch(
            actions.updateUser.updateUserRequest({
                userId: userId,
                ...userData,
            })
        );
        dispatch(actions.modalProfile.closeModalProfile());
    }, [userId, userInput, fileUpload, dispatch]);

    const handleUserInput = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    return (
        <div className='modal__container'>
            <div className='modal__boxed'>
                <h3 className='modal__title'>Update info</h3>
                <IoClose
                    className='modal__btn-close'
                    onClick={() => dispatch(actions.modalProfile.closeModalProfile())}
                />
                <div className='modal__body'>
                    <div className='modal__update'>
                        <Avatar
                            url={fileUpload ? fileUpload.preview : null}
                            photoId={photoId}
                            name={userName}
                            size='large'
                            className='modal__update-avatar'
                            onEdit={hanldeUploadAvatar}
                        />
                        <input
                            type='text'
                            name='name'
                            className='modal__input'
                            placeholder='Name'
                            value={userInput.name}
                            onChange={handleUserInput}
                        />
                        <input
                            type='text'
                            name='bio'
                            className='modal__input'
                            placeholder='Bio'
                            value={userInput.bio}
                            onChange={handleUserInput}
                        />
                    </div>
                </div>
                <div className='modal__footer'>
                    <Button name='Update' type='primary' disabled={false} onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default memo(ModalEditProfile);
