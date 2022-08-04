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

export const commentSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setRequestCreateDeleteComment: (state = initialState, action: PayloadAction<RequestType>) => {
      state.requestPostDelete = action.payload
    },
    setRequestUpdateComment: (state = initialState, action: PayloadAction<RequestType>) => {
      state.requestUpdate = action.payload
    }
  }
})

export const {setRequestCreateDeleteComment, setRequestUpdateComment} = commentSlice.actions



