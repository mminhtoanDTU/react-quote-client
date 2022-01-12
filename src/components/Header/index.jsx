import React, { useCallback, useRef, useState } from 'react';
import { IoCaretDown, IoLogOutOutline, IoPersonOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import * as actions from '../../redux/actions';
import { authState$ } from '../../redux/selectors';
import Avatar from '../Avatar';
import Button from '../Button';
import './header.scss';

function Header(props) {
    const [isPopup, setIsPopup] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(authState$);
    const { userId, photoId, currentUser } = auth;
    const popRef = useRef();

    useOnClickOutside(popRef, () => setIsPopup(false));

    const handleLogout = useCallback(() => {
        localStorage.removeItem('_token');
        dispatch(actions.logoutUser());
    }, [dispatch]);

    const handleOpenPopup = () => {
        setIsPopup(!isPopup);
    };

    return (
        <header className='header'>
            <div className='header__container container'>
                <Link to='/' className='header__logo'>
                    Sweet Quotes
                </Link>
                <ul className='header__list'>
                    {currentUser ? (
                        <li className='header__item'>
                            <div
                                onClick={handleOpenPopup}
                                className={`header__item-info ${isPopup ? 'active' : ''}`}
                                ref={popRef}
                            >
                                <Avatar photoId={photoId} name={auth.currentUser} size='small' />
                                <span className='name'>{currentUser}</span>
                                <IoCaretDown />

                                {isPopup && (
                                    <ul className='header__popup-list'>
                                        <li className='header__popup-item'>
                                            <Link to={`/me/${userId}`} className='link'>
                                                <IoPersonOutline className='icon' />
                                                Profile
                                            </Link>
                                        </li>
                                        <li className='header__popup-item'>
                                            <span onClick={handleLogout} className='logout'>
                                                <IoLogOutOutline className='icon' />
                                                Sign out
                                            </span>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                    ) : (
                        <>
                            <li className='header__item'>
                                <Button to='/login' type='text'>
                                    Login
                                </Button>
                            </li>
                            <li className='header__item'>
                                <Button to='/register' type='primary'>
                                    Sign up
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;
