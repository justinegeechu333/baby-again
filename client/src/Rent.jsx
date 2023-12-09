import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Checkbox, Form } from "semantic-ui-react";

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Required";
    } else if (values.name.length < 2) {
        errors.name = "Must be at least 2 characters or more";
    }

    if (!values.phonenumber) {
        errors.phonenumber = "Required";
    } else if (
        !/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i.test(values.phonenumber)
    ) {
        errors.phonenumber = "Invalid phone number";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            values.email
        )
    ) {
        errors.email = "Invalid email";
    }

    return errors;
};

export default function Rent({ baby_products = [], setbaby_products }) {
    const { id } = useParams() ?? {};
    const selectedBabyProuducts = id
        ? babyproducts.find((babyproducts) => baby_products.id === Number(id))
        : {};
    const naviate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
        },
        validate,
        onSubmit: (values) => {
            fetch(`http://localhost:3000/baby_products/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("data==>", data);
                    naviate(`/rent/${data.id}`);
                });
        },
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Field>
                    <label>name</label>
                    <input
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    ></input>
                    {formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </Form.Field>
                <Form.Field>
                    <label>phone number</label>
                    <input
                        name="phonenumber"
                        onChange={formik.handleChange}
                        value={formik.values.phonenumber}
                    ></input>
                    {formik.errors.phonenumber ? (
                        <div>{formik.errors.phonenumber}</div>
                    ) : null}
                </Form.Field>
                <Form.Field>
                    <label>email</label>
                    <input
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.phonenumber}
                    ></input>
                    {formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </Form.Field>
                <div>
                    <Button type="submit">Rent</Button>
                </div>
            </Form>
        </div>
    );
}

Rent.propTypes = {
    baby_products: PropTypes.array,
    setbaby_products: PropTypes.func,
};
