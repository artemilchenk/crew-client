import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IServerUser} from "../../types/user";


type RequestType = Date | null

export interface IUserSlice {
    user: null | IServerUser,
    requestPostDelete: RequestType,
    requestUpdate: RequestType
}

const initialState: IUserSlice = {
    user: null,
    requestPostDelete: null,
    requestUpdate: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state = initialState, action: PayloadAction<IServerUser | null>) => {
            state.user = action.payload
        },
        setRequestCreateDeleteUser: (state = initialState, action: PayloadAction<RequestType>) => {
            state.requestPostDelete = action.payload
        },
        setRequestUpdateUser: (state = initialState, action: PayloadAction<RequestType>) => {
            state.requestUpdate = action.payload
        }
    }
})

export const {setUser, setRequestCreateDeleteUser, setRequestUpdateUser} = userSlice.actions



