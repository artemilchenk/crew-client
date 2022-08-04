import {createSlice, PayloadAction} from "@reduxjs/toolkit";


type RequestType = Date | null

export interface IUserSlice {
    requestPostDelete: RequestType,
    requestUpdate: RequestType
}

const initialState: IUserSlice = {
    requestPostDelete: null,
    requestUpdate: null
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setRequestCreateDeletePost: (state = initialState, action: PayloadAction<RequestType>) => {
            state.requestPostDelete = action.payload
        },
        setRequestUpdatePost: (state = initialState, action: PayloadAction<RequestType>) => {
            state.requestUpdate = action.payload
        }
    }
})

export const {setRequestCreateDeletePost, setRequestUpdatePost} = postSlice.actions



