import React, { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { FcAddImage } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "..";
import { createPost, hideModal } from "../../redux/actions";

function FormModal(props) {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [fileUpload, setFileUpload] = useState();

    //Prevent Page Scrolling When a Modal is Open
    useEffect(() => {
        document.body.style.overflow = "hidden";

        if (!isMobile) {
            document.body.style.paddingRight = "15px";
        }

        return () => {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0";
        };
    }, []);

    //Preview Image Uploaded
    useEffect(() => {
        return () => {
            fileUpload && URL.revokeObjectURL(fileUpload.preview);
        };
    }, [fileUpload]);

    const closePostModal = useCallback(() => {
        dispatch(hideModal());
    }, [dispatch]);

    const hanleUploadImage = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setFileUpload(file);
        }
    }, []);

    const onSubmit = useCallback(async () => {
        if (fileUpload || content) {
            let postData = {};

            if (content) {
                postData.content = content;
            }

            if (fileUpload) {
                const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
                const formData = new FormData();
                formData.append("file", fileUpload);
                formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

                const res = await fetch(url, {
                    method: "POST",
                    body: formData,
                });
                const result = await res.json();
                postData.attachment = result.public_id;
            }

            dispatch(createPost.createPostRequest(postData));
            dispatch(hideModal());
        }
    }, [content, fileUpload, dispatch]);

    return (
        <div className="modal__container">
            <div className="modal__boxed">
                <h3 className="modal__title text-center">Create post</h3>
                <IoClose className="modal__btn-close" onClick={closePostModal} />
                <div className="modal__body">
                    <TextareaAutosize
                        id="content"
                        minRows="2"
                        name="content"
                        className="modal__textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's your favorite quote?"
                        autoFocus
                        cacheMeasurements
                    />
                    {fileUpload && (
                        <div className="modal__preview-img">
                            <img src={fileUpload.preview} alt="upload_preview" />
                            <IoClose onClick={() => setFileUpload()} className="btn-close" />
                        </div>
                    )}
                </div>
                <div className="modal__footer">
                    <div className="modal__footer-upload">
                        <label htmlFor="file-input">
                            <FcAddImage />
                        </label>

                        <input id="file-input" type="file" accept="image/*" onChange={hanleUploadImage} hidden />
                    </div>
                    <Button name="Post" type="primary" onClick={onSubmit} disabled={!content ? (!fileUpload ? true : false) : false} />
                </div>
            </div>
        </div>
    );
}

export default FormModal;
