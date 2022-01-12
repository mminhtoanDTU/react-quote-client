import React, { memo } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import "./avatar.scss";

function getSortName(name) {
    let sortName = "";
    const res = name.split(" ");
    res.forEach((word) => {
        sortName += word.charAt(0).toUpperCase();
    });

    return sortName;
}

function Avatar({ url, photoId, name, size, to, className, onEdit }) {
    let Component = "div";

    if (to) {
        Component = Link;
    }

    return (
        <>
            {url ? (
                <div className={`avatar avatar-text avatar-${size} ${className ? className : ""}`}>
                    <img src={url} alt={name} />
                    {onEdit && (
                        <div className="avatar-editable">
                            <label htmlFor="image">Updated</label>
                            <input id="image" type="file" accept="image/*" onChange={onEdit} hidden />
                        </div>
                    )}
                </div>
            ) : photoId ? (
                <Component className="" to={to ? `/me/${to}` : ""}>
                    <div className={`avatar avatar-image avatar-${size} ${className ? className : ""}`}>
                        <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={photoId} crop="scale" alt={name} />
                        {onEdit && (
                            <div className="avatar-editable">
                                <label htmlFor="image">Updated</label>
                                <input id="image" type="file" accept="image/*" onChange={onEdit} hidden />
                            </div>
                        )}
                    </div>
                </Component>
            ) : (
                <div className={`avatar avatar-text avatar-${size} ${className ? className : ""}`}>
                    <span>{getSortName(name)}</span>
                    {onEdit && (
                        <div className="avatar-editable">
                            <label htmlFor="image">Updated</label>
                            <input id="image" type="file" accept="image/*" onChange={onEdit} hidden />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default memo(Avatar);
