import { Image } from 'cloudinary-react';
import moment from 'moment';
import React, { memo, useCallback, useRef, useState } from 'react';
import { IoMdShareAlt } from 'react-icons/io';
import { IoEllipsisHorizontal, IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import Avatar from '../Avatar';
import ModalConfirm from '../ModalConfirm';
import './postItem.scss';

function PostItem(props) {
    const { data: { _id, content, attachment, author, likeCount, createdAt },
        userId, onUpdatePost, onDeletePost, onLike } = props;
    const [isShow, setIsShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [contentEdit, setContentEdit] = useState(content);

    const btnMoreRef = useRef(null);

    useOnClickOutside(btnMoreRef, () => setIsShow(false));

    const handleOpenMore = useCallback(() => {
        setIsShow(!isShow);
    }, [isShow]);


    const handleCancelEdit = useCallback(() => {
        setIsEdit(false);
        setContentEdit(content);
    }, [content]);

    const handleTime = (time) => {
        return moment(time).startOf('minute').fromNow();
    }

    return (
        <article className="post-item">
            <div className="post__head">
                <div className="post__head-infors">
                    <Avatar name={author.name} photoId={author.photoId} to={author._id} />
                    <div className="info">
                        <Link to={`/me/${author._id}`} className="name">
                            {author.name}
                        </Link>
                        <span className="times">{handleTime(createdAt)}</span>
                    </div>
                </div>

                {userId === author._id && (
                    <div
                        className="post__head-more"
                        onClick={handleOpenMore}
                        ref={btnMoreRef}
                    >
                        <IoEllipsisHorizontal className="icon" />
                        {isShow && (
                            <div className="post__head-popup">
                                <p
                                    className="post__head-pop_item"
                                    onClick={() => setIsEdit(true)}
                                >
                                    Edit
                                </p>
                                <p
                                    className="post__head-pop_item"
                                    onClick={() => setIsDelete(true)}
                                >
                                    Delete
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {isDelete &&
                <ModalConfirm
                    closeModal={() => setIsDelete(false)}
                    submitModal={() => onDeletePost(_id, setIsDelete)}
                />
            }

            <div className="post__content">
                {!isEdit ? (
                    content && <p className="text">{content}</p>
                ) : (
                    <>
                        <TextareaAutosize
                            minRows="3"
                            name="content"
                            className="post__edit"
                            value={contentEdit}
                            placeholder="What's up!"
                            onChange={e => setContentEdit(e.target.value)}
                            autoFocus
                        />
                        <div className="post__edit-action">
                            <button
                                className="btn btn-outline"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => onUpdatePost(_id, contentEdit, setIsEdit)}
                            >
                                Update
                            </button>

                        </div>
                    </>
                )}
            </div>
            {attachment && <div className="post__attachment">
                <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    publicId={attachment}
                    crop="scale"
                    onDoubleClick={() => onLike(_id, userId, likeCount)}
                    alt={content}
                />
            </div>}
            <div className="post__footer">
                <div
                    className="post__footer-action"
                    onClick={() => onLike(_id, userId, likeCount)}
                >
                    {likeCount.includes(userId) ? (
                        <IoHeart
                            className="icon liked" />
                    ) : (
                        <IoHeartOutline
                            className="icon"
                        />
                    )}
                    <span>{likeCount.length}</span>
                </div>
                <div className="post__footer-action">
                    <IoMdShareAlt className="icon" />
                    <span>Share</span>
                </div>
            </div>

        </article>
    )
}

export default memo(PostItem)
