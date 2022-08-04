import React, {useState} from 'react'
import {RegForm} from "./Register";
import {IPostBody, IUserRegisterResponse} from "../../types/user";
import axios, {AxiosError} from "axios";
import {setForm, setFormResponse} from "../../features/form/formSlice";
import {useAppDispatch, useAppSelector} from "../../store";
import styles from '../Form/Form.module.scss'
import {setRequestCreateDeletePost} from "../../features/post/postSlice";
import {CreateForm} from "./Create";

export const FormikCreate = () => {
    const isForm = useAppSelector(state => state.form.isForm)
    const formResponse = useAppSelector(state => state.form.formResponse)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IUserRegisterResponse | null>(null)
    const [error, setError] = useState(null)
    const dispatch = useAppDispatch()

    async function createPost(body: IPostBody) {
        try {

            if (localStorage.getItem('token')) {
                const tokenObj = JSON.parse(localStorage.getItem('token') || '')
                const token = tokenObj.token
                const name = tokenObj.user.name
                setError(null)
                setLoading(true)
                const response = await axios.post(`${process.env.REACT_APP_API}post/create`, {...body, owner: name}, {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setData(response.data)
                setLoading(false)
                dispatch(setRequestCreateDeletePost(new Date()))

            }

        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response) {
                    setError(err.response.data.message)
                    setLoading(false)
                }
            }
        }
    }

    const onSubmitHandler = async (formData: IPostBody) => {
        await createPost(formData)
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

    if (isForm === 'CTR') return (
        <div className={styles.formik}>
            {error ? <div style={{color: "red"}}>{error}</div> : null}
            {formResponse ? <div className={styles.formik__text}>
                <h3>{formResponse}</h3>
                <h5>Go to <span style={{borderBottom: '1px solid white'}}>Create! </span>button!</h5>
            </div> : null}
            <CreateForm message={'Create!'} initialEmail={''} onSubmit={onSubmitHandler} onChange={onChangeHandler}
                        onCancel={onCancelHandler}/>
        </div>

    )

    return null
}


