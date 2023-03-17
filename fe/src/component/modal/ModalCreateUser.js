import React from 'react';
import { Button, Col, Input, Modal, Row } from "antd";
import { Typography } from 'antd';
import { createUser } from "../../api/api";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Text } = Typography;
const initialValues = {
    name: '',
    username: '',
    password: '',
}
export const ModalCreateUser = ({ show, close, addSuccess }) => {

    const save = async (e, resetForm) => {
        let result = await createUser(e)
        if (result.status === 'OK') {
            resetForm()
            addSuccess()
        } else {
            toast("Error");
        }
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
        // validationSchema={Yup.object().shape({
        //     email: Yup.string()
        //         .email()
        //         .required("Email not blank"),
        //     password: Yup.string()
        //         .required("Password not blank"),
        //     firstName: Yup.string()
        //         .required("First name not blank")
        // })
        // }
        >
            {({ values, setFieldValue, errors, touched, handleSubmit, resetForm, handleChange }) => (
                <Modal
                    open={show}
                    title="Create user"
                    keyboard={false}
                    closable={false}
                    footer={[
                        <Button onClick={e => {
                            handleSubmit()
                            if (!_.isEmpty(errors)) {
                                toast("Validation error");
                                return;
                            }
                            save(values, resetForm)
                        }} type="primary">
                            Save
                        </Button>,
                        <Button
                            onClick={() => {
                                resetForm()
                                close()
                            }}
                            type="primary">
                            Cancel
                        </Button>
                    ]}
                    width={650}
                >

                    <Form>

                        <Row>
                            <Col span={7} ><Text strong> Name:</Text></Col>
                            <Col span={17} >
                                <Input
                                    name='name'
                                    onChange={handleChange}
                                    value={values?.name}
                                // onChange={e => setFieldValue('email', e.currentTarget.value)}
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback" style={{ color: 'red' }}>{errors.email}</div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Username:</Text></Col>
                            <Col span={17} >
                                <Input
                                    name='username'
                                    value={values?.username}
                                    onChange={handleChange}
                                />
                                {errors.username && touched.username && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Password:</Text></Col>
                            <Col span={17} >
                                <Input
                                    name='password'
                                    value={values?.password}
                                    onChange={handleChange}
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.firstName}</div>
                                )}
                            </Col>
                        </Row>
                    </Form>

                </Modal>
            )}
        </Formik>
    )
}