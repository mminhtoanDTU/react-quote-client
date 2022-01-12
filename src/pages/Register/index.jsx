import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Loading } from '../../components';
import AuthContainer from '../../components/AuthContainer';
import InputField from '../../components/InputField';
import * as actions from '../../redux/actions';
import { authState$ } from '../../redux/selectors';

function RegisterPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, errors, isLoading } = useSelector(authState$);

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        }
    }, [currentUser, history])

    const handleOnSubmit = (values) => {
        dispatch(actions.authUser.registerRequest(values));
    }


    return (
        <AuthContainer>
            <h3 className="auth__title">Sign Up</h3>
            {isLoading && <Loading />}
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .min(6, 'Must be at least 6 character')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    name: Yup.string()
                        .required('Required')
                        .max(45, 'Name is too long')
                })}
                onSubmit={handleOnSubmit}
            >
                {formikProps => {
                    return (
                        <Form className="auth__form">
                            <Field
                                name="name"
                                component={InputField}
                                label="Name"
                                type="text"
                                placeholder="Enter your name"
                            />
                            <Field
                                name="email"
                                component={InputField}
                                label="Your e-mail"
                                type="text"
                                placeholder="name@domain.com"
                            />
                            <Field
                                name="password"
                                component={InputField}
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                            />
                            {errors && <p className="message message-error">{errors}</p>}
                            <button
                                type="submit"
                                className="btn-submit"
                            >
                                Log In
                            </button>
                            <p className="redirect">
                                Already have an account?
                                <Link to="/login"> Log in</Link>
                            </p>
                        </Form>
                    )
                }}
            </Formik>
        </AuthContainer>
    )
}

export default RegisterPage
