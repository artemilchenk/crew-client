import React, {useEffect, useState} from 'react'
import * as yup from 'yup'
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik'
import styles from '../Form/Form.module.scss'
import {IUserBody} from "../../types/user";


interface FormValues {
    name: string;
    email: string;
    password: string;
    onSubmit: (value: IUserBody) => void;
    onCancel: () => void;
    onChange: () => void;

}

interface OtherProps {
    message: string;
    onSubmit: (value: IUserBody) => void;
    onCancel: () => void;
    onChange: () => void;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {touched, errors, isSubmitting, message, onCancel, handleChange, onChange, resetForm, onSubmit, values} = props

    return (
        <Form>
            <h1>{message}</h1>

            <div className={styles.form__fields}>
                <div>Name</div>
                <Field type='name' name='name' placeholder={'your name...'} onChange={(e) => {
                    onChange()
                    handleChange(e)
                }}/>
                {touched.name && errors.name && <div>{errors.name}</div>}

                <div>Email</div>
                <Field type='email' name='email' placeholder={'your email...'} onChange={(e) => {
                    onChange()
                    handleChange(e)
                }}/>
                {touched.email && errors.email && <div>{errors.email}</div>}

                <div>Password</div>
                <Field type='password' name='password' placeholder={'your password...'} onChange={(e) => {
                    onChange()
                    handleChange(e)
                }}/>
                {errors.password && <div>{errors.password}</div>}

            </div>

            <button type='submit' disabled={isSubmitting} onClick={()=>{
                onSubmit(values)
                resetForm()
            }}>
                Submit
            </button>

            <button type='button' disabled={isSubmitting} onClick={() => {
                onCancel()
            }}>
                Cancel
            </button>
        </Form>
    )
    return null
}


interface MyFormProps {
    initialEmail?: string;
    message: string;
    onSubmit: (value: IUserBody) => void;
    onCancel: () => void;
    onChange: () => void;
}


let schema = yup.object().shape({
    name: yup.string().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

export const RegForm = withFormik<MyFormProps, FormValues>({

    mapPropsToValues: props => ({
        name: '',
        email: props.initialEmail || '',
        password: '',
        onSubmit: props.onSubmit,
        onCancel: props.onCancel,
        onChange: props.onChange
    }),

    validate: async (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {}
        const {name, password, email} = values
        const formData = {name, password, email}

        await schema
            .validate(formData)
            .catch((error) => {
                let key: keyof FormValues = error.message.split(' ')[0]
                errors[key] = error.message
            })

        return errors
    },

    handleSubmit: async values => {
        const {name, password, email} = values
        const formData = {name, password, email}
        await values.onSubmit(formData)
    }


})(InnerForm)