import {configureStore} from "@reduxjs/toolkit";
import {formSlice} from "../features/form/formSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {userSlice} from "../features/user/userSlice";
import {postSlice} from "../features/post/postSlice";
import { commentSlice } from "../features/comment/commentSlice";

export const store = configureStore({
    reducer:{
        form: formSlice.reducer,
        user: userSlice.reducer,
        post: postSlice.reducer,
        comment: commentSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
