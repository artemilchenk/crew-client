import React, {useEffect, useState} from 'react'
import {IUserBody, IUserLoginResponse} from "../../types/user";
import {setForm} from "../../features/form/formSlice";
import {useAppDispatch, useAppSelector} from "../../store";
import {LogForm} from "./Login";
import {logUser} from "../../api/user/user-api";
import styles from "./Form.module.scss";

export const FormikLogin = () => {
    const isForm = useAppSelector(state => state.form.isForm)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IUserLoginResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const dispatch = useAppDispatch()

    const onSubmitHandler = async (formData: IUserBody) => {
        await logUser({setLoading, setData, setError, body: formData, dispatch})
    }

    const onCancelHandler = () => {
        setError(null)
        dispatch(setForm(null))

    }

    const onChangeHandler = () => {
        setError(null)
    }

    if (isForm === 'LOG') return (
        <div className={styles.formik}>
            {error ? <div>{error}</div> : null}
            <LogForm message={'Sign in'} initialEmail={''} onSubmit={onSubmitHandler} onCancel={onCancelHandler}
                     onChange={onChangeHandler}/>
        </div>

    )

    return null
}


