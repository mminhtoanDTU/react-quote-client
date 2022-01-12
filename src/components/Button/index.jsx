import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './button.scss';

function Button(props) {
    const { name = 'Button', className, to, type, onClick, disabled, children } = props;
    let Component = 'button';

    if (to) {
        Component = Link;
    }

    return (
        <Component
            className={`btn ${className ? className : ''} ${type ? `btn-${type}` : ''}`}
            onClick={onClick}
            disabled={disabled}
            to={to}
        >
            {children || name}
        </Component>
    );
}

Button.propTypes = {};

export default memo(Button);
