import React from 'react';
import { Button, Col, Input, Modal, Row, Select } from "antd";
import { Typography } from 'antd';
import { allUser, createChatGroup, createUser, initialGroupUserList } from "../../api/api";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
const { Text } = Typography;
const initialValues = {
    groupName: '',
    memberList: []
}
export const ModalCreateChatGroup = ({ show, close, createSuccess }) => {
    let [userList, setUserList] = useState()
    useEffect(() => {
        const fetchdata = async () => {
            let rawData = await initialGroupUserList({
                id: window.localStorage.getItem('userId')
            })
            if (rawData) {
                let temp = _.map(rawData.data, e => {
                    return {
                        value: e.id,
                        label: e.name
                    }
                })
                setUserList(temp)
            }
        }
        fetchdata()
    }, [])
    const save = async (e, resetForm) => {
        console.log('aaa')
        e.hostId = window.localStorage.getItem('userId')
        let result = await createChatGroup(e)
        if (result.status === 'OK') {
            createSuccess()
            resetForm()
        } else {
            toast(result.message);
        }

    }
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
        >
            {({ values, errors, touched, handleSubmit, resetForm, handleChange, setFieldValue }) => (
                <Modal
                    open={show}
                    title="Create chat"
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
                            <Col span={7} ><Text strong> Group Name:</Text></Col>
                            <Col span={17} >
                                <Input value={values.groupName} name='groupName' onChange={handleChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Member List:</Text></Col>
                            <Col span={17} >
                                <Field name={'memberList'}>
                                    {({ field }) => (
                                        <Select
                                            {...field}
                                            mode="multiple"
                                            placeholder="Inserted are removed"
                                            onChange={(value, entire) => setFieldValue('memberList', value)}
                                            style={{ width: '100%' }}
                                            options={userList}
                                        />
                                    )}
                                </Field>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            )}
        </Formik>
    )
}