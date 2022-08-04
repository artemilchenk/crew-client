import {useEffect, useState} from "react";
import { IGetComments, IGetPosts, IServerUser } from "../types/user";
import axios, {AxiosError} from "axios";

export function useGetComments (request, targetId){
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IGetComments | null>(null)
  const [error, setError] = useState(null)

  async function getComments() {
    try {
      setError(null)
      setLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_API}comment/all/${targetId}`)
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
    getComments()
  }, [request])

  return {loadingCom: loading, dataCom: data, errorCom: error}
}