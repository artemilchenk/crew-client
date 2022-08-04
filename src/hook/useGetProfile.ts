import { useEffect, useState } from "react";
import { IProfileResponse, IServerUser } from "../types/user";
import axios, { AxiosError } from "axios";
import {ServerURL} from "../domen";

export function useGetProfile(id, request) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IProfileResponse | null>(null);
  const [error, setError] = useState(null);

  async function getProfile() {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`${ServerURL.PRODUCTION}profile/${id}`);
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
    getProfile();
  }, [id, request]);

  return { loading, data, error };
}