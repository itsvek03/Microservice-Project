import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { signup } from '../../apis/signup.api'
import { useHistory } from 'react-router-dom'

import { useLoginContext } from '../../contexts/Login.Provider'

const formSchema = Yup.object().shape({

    userName: Yup.string()
        .required('This field is required'),

    email: Yup.string()
        .email('Invalid Email address format')
        .required('This field is required'),

    password: Yup.string()
        .min(8, "Password must be 8 chararcters atleast")
        .required('This field is required'),
})


export default function Signup(props) {
    const history = useHistory();
    //const { setDetails } = useLoginContext();
    const onSubmitHandler = async (values) => {
        try {
           const { data: { message } } = await signup(values);
            alert(message);
            history.push('/login')
        } catch (err) {
            const message = (err.response.data && err.response.data.message) ? err.response.data.message : err.message;
            alert(message);
        }
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow-lg">
                            <div className="card-body">

                            </div>

                            <Formik
                                initialValues={
                                    {
                                        userName: '',
                                        email: '',
                                        password: '',
                                    }
                                }
                                validationSchema={formSchema}
                                onSubmit={(values, actions) => {
                                    onSubmitHandler(values)
                                    setTimeout(() => {
                                        //alert(JSON.stringify(values, null, 3));
                                        actions.setSubmitting(false)
                                        actions.resetForm()
                                    }, 1000)
                                }}>

                                {({ isSubmitting, touched, errors }) => (
                                    <Form >

                                        <div className="m-3">
                                            <Field
                                                id="name"
                                                type="text"
                                                name="userName"
                                                placeholder="Enter your Name"
                                                autoComplete="off"
                                                className={`form-control  ${(touched.name && errors.name) ? 'border border-danger' : ''}`}
                                            />
                                            <ErrorMessage name="userName" />

                                        </div>



                                        <div className="m-3">
                                            <Field
                                                id="email"
                                                type="text"
                                                name="email"
                                                placeholder="Enter your email"
                                                autoComplete="off"
                                                className={`form-control  ${(touched.email && errors.email) ? 'border border-danger' : ''}`}
                                            />
                                            <ErrorMessage name="email" />

                                        </div>

                                        <div className="m-3">
                                            <Field
                                                id="pass"
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                autoComplete="off"
                                                className={`form-control ${(touched.password && errors.password) ? 'border border-danger' : ''}`}
                                            />
                                            <ErrorMessage name="password" />
                                        </div>


                                        <div className="d-flex justify-content-center m-3">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg col-6"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? "Please Wait" : "Submit"}
                                            </button >
                                        </div>


                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
