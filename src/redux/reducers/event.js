import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    event: null,
    isSuccess: false,
    isError: false
}


const EventCreateRequest = createAction("EventCreateRequest")
const EventCreateSuccess = createAction("EventCreateSuccess")
const EventCreateFail = createAction("EventCreateFail")
const resetEventState = createAction("resetEventState")
const AllEvents = createAction("AllEvents")


export const eventReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(EventCreateRequest, (state) => (
            {
                ...state,
                isLoading: true
            }
        ))
        .addCase(EventCreateSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            isSuccess: true,
            event: action.payload
        }))
        .addCase(EventCreateFail, (state) => ({
            ...state,
            isLoading: false,
            isError: true,
        }))
        .addCase(AllEvents, (state,action) => ({
            ...state,
            isLoading: false,
            isSuccess:true,
            event:action.payload
        }))
        .addCase(resetEventState, (state) => {
            state.isError = false,
                state.isLoading = false,
                state.isSuccess = false
        })

})

