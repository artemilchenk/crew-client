import {useEffect, useState} from "react";
import {IServerUser} from "../types/user";
import axios, {AxiosError} from "axios";
import {ServerURL} from "../domen";

export function useGetUsers (request){
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Array<IServerUser>>([])
    const [error, setError] = useState(null)

    async function getUsers() {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.get(`${ServerURL.PRODUCTION}user/all`)
            setData(response.data.users)
            setLoading(false)

        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response) {
                    setError(err.response.data.message)
                    setLoading(false)
                }
            }
        }
    }

    useEffect(() => {
        getUsers()
    }, [request])

    return {loading, data, error}
}