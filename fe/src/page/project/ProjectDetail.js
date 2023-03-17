import { Breadcrumb, Button, Col, Input, Row } from "antd";
import './projectDetail.scss'
import { Formik, Form, Field } from 'formik';
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as Yup from 'yup';
const { TextArea } = Input;

export default function ProjectDetail() {
    const initialValues = {
        title: '',
        startTime: '',
        endTime: '',
        category: '',
        img: '',
        description: ''
    }
    const [breadcrumbItems, setBreadCrumbItems] = useState([
        { key: 'home', breadcrumbName: 'Home' },
        { key: 'project', breadcrumbName: 'Project' },
        { key: 'detail', breadcrumbName: '' }
    ])
    const changeTitle = (f, setFieldValue) => {
        breadcrumbItems.forEach(e => {
            if (e.key === 'detail') {
                e.breadcrumbName = f.target.value
            }
        })
        setBreadCrumbItems([...breadcrumbItems])
        setFieldValue('title', f.target.value)

    }
    const handleSubmit = (values, param1, param2) => {
        // do something with values
        // call setSubmitting to update the Formik state

        console.log(param1, param2);
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is mandatory field')
    })

    return (<Formik
        initialValues={initialValues}
        onSubmit={(e) => {
            const button = e.nativeEvent.submitter.name;
            handleSubmit(e, button);
        }}
        validationSchema={validationSchema}
    >
        {({ values, handleChange, setFieldValue, errors, touched, handleSubmit }) => (
            <Form
                // onSubmit={(e) => {
                //     const button = e.nativeEvent.submitter.name;
                //     handleSubmit(e, button);
                // }}
            >
                <div className="project-container">
                    <div className="project-header">
                        <Input className="project-title" placeholder="Project Title" name='title'
                            values={values.title} onChange={(e) => changeTitle(e, setFieldValue)} />
                        {errors.title && touched.title && (
                            <div className="input-feedback" style={{ color: 'red' }}>{errors.title}</div>
                        )}
                        <Breadcrumb separator=">" className="breadcrumb">
                            {breadcrumbItems.map(item => (
                                <Breadcrumb.Item key={item.key}>{item.breadcrumbName}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    </div>
                    <div>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={4}>
                                Start Date
                            </Col>
                            <Col span={4}>
                                End Date
                            </Col>
                            <Col span={4}>
                                Category
                            </Col>
                            <Col span={4}>
                                Social Link
                            </Col>
                            <Col span={4}></Col>
                        </Row>
                        <Row>
                            <Col span={4}></Col>
                            <Col span={16}>
                                <img className="img" src="http://ghdc.vn//uploads/images/product/2022/06/17/sp13.png" />
                                <TextArea className="description" rows={8} name='description' value={values.description} onChange={handleChange} />
                                <Button onClick={handleSubmit}>Save</Button>
                                <Button onClick={handleSubmit}>Other</Button>
                            </Col>
                            <Col span={4}></Col>
                        </Row>
                    </div>
                </div>
            </Form>
        )}
    </Formik>)
}

