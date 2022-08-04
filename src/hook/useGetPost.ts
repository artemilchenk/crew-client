import { useEffect, useState } from "react";
import { IGetPost, IServerPost } from "../types/user";
import axios, { AxiosError } from "axios";
import {ServerURL} from "../domen";

export function useGetPost(id) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IGetPost | null>(null);
  const [error, setError] = useState(null);

  async function getPost() {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`${ServerURL.PRODUCTION}post/${id}`);
      setData(response.data);
      setLoading(false);

    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          setError(err.response.data.message);
          setLoading(false);
        }
      }
    }
  }

  useEffect(() => {
    getPost();
  }, []);

  return { loading, data, error };
}