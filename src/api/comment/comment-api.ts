
import axios, { AxiosError } from "axios";

export async function createComment({dispatch, targetId, value, target}) {

  try {

    if (localStorage.getItem('token')) {
      const tokenObj = JSON.parse(localStorage.getItem('token') || '')
      const token = tokenObj.token
      const name = tokenObj.user.name

      const response = await axios.post(`http://localhost:5001/comment/create`, {
        targetId,
        text: value,
        owner: name,
        target,
      }, {
        headers: {Authorization: `Bearer ${token}`}
      });
      console.log(response);

      /*dispatch(setRequestUpdateUser(new Date()))*/
    }

  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        console.log(err.response.data.message)
      }
    }
  }
}