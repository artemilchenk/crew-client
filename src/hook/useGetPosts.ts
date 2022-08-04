import {useEffect, useState} from "react";
import { IGetPosts, IServerUser } from "../types/user";
import axios, {AxiosError} from "axios";
import {ServerURL} from "../domen";


export function useGetPosts (request, query){
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IGetPosts | null>(null)
    const [error, setError] = useState(null)

    async function getPosts(search) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.get(`${ServerURL.PRODUCTION}post/query/${search}`)
            setData(response.data)
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
        getPosts(query || '')
    }, [request, query])

    return {loading, data, error}
}