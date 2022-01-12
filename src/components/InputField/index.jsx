import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";
import "./inputField.scss";

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: "text",
    label: "",
    placeholder: "",
    disabled: false,
};

function InputField(props) {
    const { field, form, type, label, placeholder, disabled } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    return (
        <div className="input__group">
            {label && (
                <label htmlFor={name} className="label">
                    {label}
                </label>
            )}
            <input id={name} {...field} className={`input ${showError && "error"}`} placeholder={placeholder} type={type} disabled={disabled} />
            {showError && <p className="message message-error">{errors[name]}</p>}
        </div>
    );
}

export default memo(InputField);
