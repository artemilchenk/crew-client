import React, {useEffect, useState} from 'react'
import * as yup from 'yup'
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik'
import styles from '../Form/Form.module.scss'
import {IPostBody} from "../../types/user";


interface FormValues {
    name: string;
    job: string;
    about: string;
    onSubmit: (value: IPostBody) => void;
    onCancel: () => void;
    onChange: () => void;

}

interface OtherProps {
    message: string;
    onSubmit: (value: IPostBody) => void;
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
                <Field type='name' name='name' placeholder={'name...'} onChange={(e) => {
                    onChange()
                    handleChange(e)
                }}/>
                {touched.name && errors.name && <div>{errors.name}</div>}

                <div>Job</div>
                <Field type='name' name='job' placeholder={'job...'} onChange={(e) => {
                    onChange()
                    handleChange(e)
                }}/>
                {touched.job && errors.job && <div>{errors.job}</div>}

                <div>About</div>
                <Field as={'textarea'} type='name' name='about' placeholder={'about...'} onChange={(e) => {
                    onChange()
                    handleChange(e)
                }}/>
                {errors.about && <div>{errors.about}</div>}

            </div>

            <button type='submit' disabled={isSubmitting} onClick={()=>{
                if(Object.keys(errors).length < 1){
                    onSubmit(values)
                    resetForm()
                }
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
}


interface MyFormProps {
    initialEmail?: string;
    message: string;
    onSubmit: (value: IPostBody) => void;
    onCancel: () => void;
    onChange: () => void;
}


let schema = yup.object().shape({
    name: yup.string().required().min(3),
    job: yup.string().required().min(6),
    about: yup.string()
})

export const CreateForm = withFormik<MyFormProps, FormValues>({

    mapPropsToValues: props => ({
        name: '',
        job: '',
        about: '',
        onSubmit: props.onSubmit,
        onCancel: props.onCancel,
        onChange: props.onChange
    }),

    validate: async (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {}
        const {name, job, about} = values
        const formData = {name, job, about}

        await schema
            .validate(formData)
            .catch((error) => {
                let key: keyof FormValues = error.message.split(' ')[0]
                errors[key] = error.message
            })

        return errors
    },

    handleSubmit: async values => {
        const {name, about, job} = values
        const formData = {name, job, about}
        await values.onSubmit(formData)
    }


})(InnerForm)