import React from 'react'
import * as yup from 'yup'
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik'
import styles from '../Form/Form.module.scss'
import {IUserBody} from "../../types/user";

interface FormValues {
    name: string;
    password: string;
    onSubmit: (value: IUserBody) => void
    onCancel: () => void
    onChange: () => void;
}

interface OtherProps {
    message: string;
    onSubmit:(value: IUserBody) => void;
    onCancel: () => void;
    onChange: () => void;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {touched, errors, isSubmitting, message, onCancel, onChange, handleChange} = props

    return (
        <Form>
            <h1>{message}</h1>

            <div className={styles.form__fields}>

                <div>Name</div>
                <Field type='name' name='name' placeholder={'your name...'} onChange={(e)=>{
                    onChange()
                    handleChange(e)
                }}/>
                {touched.name && errors.name && <div>{errors.name}</div>}

                <div>Password</div>
                <Field type='password' name='password' placeholder={'your password...'}/>
                {errors.password && <div>{errors.password}</div>}

            </div>

            <button type='submit' disabled={isSubmitting}>
                Submit
            </button>

            <button type='button' disabled={isSubmitting} onClick={()=>{
                onCancel()
            }}>
                Cancel
            </button>
        </Form>
    )
}


interface MyFormProps {
    initialEmail?: string;
    message: string;
    onSubmit: (value: IUserBody) => void
    onCancel: () => void
    onChange: () => void;
}


let schema = yup.object().shape({
    name: yup.string().min(3),
    password: yup.string().required().min(6),
})

export const LogForm = withFormik<MyFormProps, FormValues>({

    mapPropsToValues: props => ({
        name: '',
        password: '',
        onSubmit: props.onSubmit,
        onCancel: props.onCancel,
        onChange: props.onChange

    }),


    validate: async (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {}

        const {name, password} = values
        const formData = {name, password}

        await schema
            .validate(formData)
            .catch((error) => {
                let key: keyof FormValues = error.message.split(' ')[0]
                errors[key] = error.message
            })

        return errors
    },

    handleSubmit: async values => {
        const {name, password} = values
        const formData = {name, password}
        values.onSubmit(formData)
    },
})(InnerForm)