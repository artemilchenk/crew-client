import React, {useState} from 'react'
import {RegForm} from "./Register";
import {IUserBody, IUserRegisterResponse} from "../../types/user";
import axios, {AxiosError} from "axios";
import {setForm, setFormResponse} from "../../features/form/formSlice";
import {useAppDispatch, useAppSelector} from "../../store";
import styles from '../Form/Form.module.scss'
import {setRequestCreateDeleteUser} from "../../features/user/userSlice";

export const FormikRegister = () => {
    const isForm = useAppSelector(state => state.form.isForm)
    const formResponse = useAppSelector(state => state.form.formResponse)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IUserRegisterResponse | null>(null)
    const [error, setError] = useState(null)
    const dispatch = useAppDispatch()

    async function createUser(body: IUserBody) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_API}user/register`, {...body})
            setData(response.data)
            setLoading(false)
            dispatch(setFormResponse(response.data.message))
            dispatch(setRequestCreateDeleteUser(new Date()))


        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response) {
                    setError(err.response.data.message)
                    setLoading(false)
                }
            }
        }
    }

    const onSubmitHandler = async (formData: IUserBody) => {
        await createUser(formData)
    }

    const onCancelHandler = () => {
        setError(null)
        dispatch(setForm(null))
        dispatch(setFormResponse(''))
    }

    const onChangeHandler = () => {
        setError(null)
        dispatch(setFormResponse(''))
    }

    if (isForm === 'REG')   return (
        <div className={styles.formik}>
            {error ? <div style={{color: "red"}}>{error}</div> : null}
            {formResponse ? <div className={styles.formik__text}>
                <h3>{formResponse}</h3>
                <h5>Go to <span style={{borderBottom: '1px solid white'}}>Sign In </span>button!</h5>
            </div> : null}
            <RegForm message={'Sign up'} initialEmail={''} onSubmit={onSubmitHandler} onChange={onChangeHandler}
                     onCancel={onCancelHandler}/>
        </div>

    )

    return null
}


