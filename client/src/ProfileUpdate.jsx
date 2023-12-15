import { useFormik } from "formik";
import { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { UserContext } from "./UserContext";

const validate = (values) => {
    const errors = {};
    if (!values.password) {
        errors.password = "Required";
    }

    if (!values.email) {
        errors.email = "One of email or user_id is Required";
    } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            values.email
        )
    ) {
        errors.email = "Invalid email";
    }

    return errors;
};

export function ProfileUpdate() {
    const { user, setUser } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            name: user.name,
            phone_number: user.phone_number,
            login_id: user.login_id,
            email: user.email,
            password: "",
        },
        validate,
        onSubmit: (values) => {
            fetch(`http://localhost:5555/customer`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("customer data==>", data);
                    setUser(data);
                    // navigate(`/home`);
                });
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Field disabled>
                <label>email</label>
                <input
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                ></input>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </Form.Field>

            <Form.Field>
                <label>password</label>
                <input
                    name="password"
                    type="password"
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
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                ></input>
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </Form.Field>
            <Form.Field>
                <label>phone_number</label>
                <input
                    name="phone_number"
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
                    name="login_id"
                    onChange={formik.handleChange}
                    value={formik.values.login_id}
                ></input>
                {formik.errors.login_id ? (
                    <div>{formik.errors.login_id}</div>
                ) : null}
            </Form.Field>
            <div className="flex place-content-between">
                <Button type="submit">Update</Button>
            </div>
        </Form>
    );
}
