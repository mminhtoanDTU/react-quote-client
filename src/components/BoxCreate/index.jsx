import React, { useCallback } from 'react';
import { FcAddImage } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { ModalForm } from '..';
import * as actions from '../../redux/actions';
import { modalState$ } from '../../redux/selectors';
import './boxcreate.scss';

function BoxCreate() {
    const dispatch = useDispatch();
    const { isShow } = useSelector(modalState$);

    const openPostModal = useCallback(() => {
        dispatch(actions.showModal());
    }, [dispatch]);

    return (
        <>
            <div className="box__create">
                <div className="box__create-open" onClick={openPostModal}>
                    <span>What's your quote today?</span>
                </div>
                <FcAddImage className="box__create-icon" onClick={openPostModal} />
            </div>
            {isShow && <ModalForm />}
        </>
    )
}

export default BoxCreate
