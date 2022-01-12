import React, { useEffect } from 'react'
import { isDesktop, } from 'react-device-detect';

function ModalConfirm(props) {
    const { closeModal, submitModal } = props;

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        if (isDesktop) {
            document.body.style.paddingRight = '15px';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
        }
    }, [])

    return (
        <div className="modal__container">
            <div className="modal__boxed">
                <h3 className="modal__title">Delete Post</h3>
                <p className="modal__sub-title">
                    Are you sure to delete this post?
                </p>
                <div className="modal__action">
                    <button
                        className="btn btn-text"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={submitModal}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm
