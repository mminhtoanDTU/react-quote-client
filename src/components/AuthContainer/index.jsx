import React from 'react';
import { Link } from 'react-router-dom';
import './_auth.scss';

function AuthContainer({ children }) {
    return (
        <section className='auth__section'>
            <div className='auth__container'>
                <Link to='/' className='header__logo auth__logo'>
                    Sweet Quotes
                </Link>
                <div className='auth__main'>{children}</div>
                <p className='copy-right'>
                    Copyright © 2021{' '}
                    <a rel='noreferrer' href='https://toandev.tk' target='_blank'>
                        toandev.tk
                    </a>
                </p>
            </div>
            <div className='auth__quotes'>
                <p>“Life is what happens when you’re busy making other plans.” </p>
                <span>John Lennon</span>
            </div>
        </section>
    );
}

export default AuthContainer;
