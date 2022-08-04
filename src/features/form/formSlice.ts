import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type IsFormType = null | undefined | 'REG' | 'LOG' | 'CTR'
type FormResponseType = string
type RequestType = Date | null

export interface IFormSlice {
    isForm: IsFormType,
    formResponse: string
}

const initialState: IFormSlice = {
    isForm: null,
    formResponse: ''
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm: (state= initialState, action: PayloadAction<IsFormType>) => {
            state.isForm = action.payload
        },
        setFormResponse: (state= initialState, action: PayloadAction<FormResponseType>) => {
            state.formResponse = action.payload
        }
    }
})

export const {setForm, setFormResponse} = formSlice.actions



