import { useFormik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Image } from 'semantic-ui-react';
import { UserContext } from './UserContext';
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

export default function AdminLogin() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            console.log('login');

            fetch(`http://localhost:5555/admin/sign_in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log('data==>', data);
                    data.isAdmin = true;
                    setUser(data);
                    navigate(`/admin/home`);
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
                <div className='flex place-content-between'>
                    <Button type='submit'>Login as Admin</Button>
                </div>
            </Form>
        </div>
    );
}
