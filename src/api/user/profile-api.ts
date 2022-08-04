import {IUpdateProfile } from "../../types/user";
import axios, { AxiosError } from "axios";
import { setRequestUpdateUser } from "../../features/user/userSlice";

export async function updateProfile({dispatch, id, body}: IUpdateProfile) {

  try {

    if (localStorage.getItem('token')) {
      const tokenObj = JSON.parse(localStorage.getItem('token') || '')
      const token = tokenObj.token
      const name = tokenObj.user.name

      const response = await axios.post(`${process.env.REACT_APP_API}profile/update/${id}`, {...body}, {
        headers: {Authorization: `Bearer ${token}`}
      })
      dispatch(setRequestUpdateUser(new Date()))
    }

  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response) {
        console.log(err.response.data.message)
      }
    }
  }
}