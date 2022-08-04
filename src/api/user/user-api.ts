import {IGetUser, ILogUser} from "../../types/user";
import axios, {AxiosError} from "axios";
import {setUser} from "../../features/user/userSlice";
import {setForm} from "../../features/form/formSlice";

export async function logUser({body, setLoading, setData, setError, dispatch}: ILogUser) {

    try {
        setError(null)
        setLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API}user/login`, {...body})
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', JSON.stringify({
                token: response?.data?.token || '',
                user: response?.data?.user
            } || null))
        }
        dispatch(setUser(response?.data?.user))
        setLoading(false)
        dispatch(setForm(null))

    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response) {
                setError(err.response.data.message)
                setLoading(false)
            }
        }
    }
}

export async function getUser({dispatch}: IGetUser) {

    try {

        if (localStorage.getItem('token')) {
            const tokenObj = JSON.parse(localStorage.getItem('token') || '')
            const token = tokenObj.token
            const name = tokenObj.user.name

            const response = await axios.post(`${process.env.REACT_APP_API}user`, {name}, {
                headers: {Authorization: `Bearer ${token}`}
            })
            dispatch(setUser(response?.data?.user))
            dispatch(setForm(null))

        }

    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response) {
               if(localStorage.getItem('token')){
                   localStorage.removeItem('token')
                   dispatch(setUser(null))
               }
            }
        }
    }
}
