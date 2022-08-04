
import axios, { AxiosError } from "axios";
import {ServerURL} from "../../domen";

export async function createComment({dispatch, targetId, value, target}) {

  try {

    if (localStorage.getItem('token')) {
      const tokenObj = JSON.parse(localStorage.getItem('token') || '')
      const token = tokenObj.token
      const name = tokenObj.user.name

      const response = await axios.post(`${ServerURL.PRODUCTION}comment/create`, {
        targetId,
        text: value,
        owner: name,
        target,
      }, {
        headers: {Authorization: `Bearer ${token}`}
      });
      console.log(response);
    }

  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        console.log(err.response.data.message)
      }
    }
  }
}