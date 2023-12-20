import { useFormik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Form, Image } from 'semantic-ui-react';
import juju from './assets/juju_face.png';

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required';
    }

    if (!values.email) {
        errors.email = 'One of email or user_id is Required';
    } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            values.email
        )
    ) {
        errors.email = 'Invalid email';
    }

    return errors;
};

export default function SignUp() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            phone_number: '',
            login_id: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            fetch(`http://localhost:5555/customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(res => {
                    return res.json();
                })
                .then(() => {
                    navigate(`/home`);
                });
        },
    });

    return (
        <div className='max-w-5xl mx-auto mt-8'>
            <div>
                <Image
                    src={juju}
                    alt='alt'
                    className='logo'
                    size='small'
                    centered
                />
            </div>
            <h1 className='font-extrabold text-4xl text-center text-stone-600'>
                Sign Up
            </h1>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Field>
                    <label>email</label>
                    <input
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    ></input>
                    {formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </Form.Field>

                <Form.Field>
                    <label>password</label>
                    <input
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    ></input>
                    {formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </Form.Field>
                <Form.Field>
                    <label>name</label>
                    <input
                        name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    ></input>
                    {formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </Form.Field>
                <Form.Field>
                    <label>phone_number</label>
                    <input
                        name='phone_number'
                        onChange={formik.handleChange}
                        value={formik.values.phone_number}
                    ></input>
                    {formik.errors.phone_number ? (
                        <div>{formik.errors.phone_number}</div>
                    ) : null}
                </Form.Field>
                <Form.Field>
                    <label>login_id</label>
                    <input
                        name='login_id'
                        onChange={formik.handleChange}
                        value={formik.values.login_id}
                    ></input>
                    {formik.errors.login_id ? (
                        <div>{formik.errors.login_id}</div>
                    ) : null}
                </Form.Field>
                <div className='flex place-content-between'>
                    <NavLink to='/login' className='underline'>
                        {' '}
                        {`I already have an account`}
                    </NavLink>
                    <Button type='submit'>Sign Up</Button>
                </div>
            </Form>
        </div>
    );
}
