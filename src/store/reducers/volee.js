import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API } from "../../utils"

const initialState = {
    volee: [],
    selectedVolee: -1,
    fetchVolee: {
        loading: false,
        error: false
    }
}

export const fetchVolees = createAsyncThunk(
    "volee/fetchVolees",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL_API}ladder/volee`)
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const voleeSlice = createSlice({
    name: "volee",
    initialState,
    reducers: {
        setSelectedVolee: (state, action) => {
            state.selectedVolee = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVolees.pending, (state) => {
                state.fetchVolee.loading = true
                state.fetchVolee.error = false
            })
            .addCase(fetchVolees.fulfilled, (state, action) => {
                state.fetchVolee = {
                    loading: false,
                    error: false
                }
                state.volee = action.payload
                if (action.payload.length > 0) state.selectedVolee = 0
            })
            .addCase(fetchVolees.rejected, (state, action) => {
                state.fetchVolee = {
                    loading: false,
                    error: action.payload
                }
                state.volee = []
                state.selectedVolee = -1
            })
    }
})

export const { setSelectedVolee } = voleeSlice.actions

export default voleeSlice.reducer

export const getVoleeName = (state) =>
    state.volee.selectedVolee !== -1
        ? state.volee.volee[state.volee.selectedVolee].label
        : ""

export const getVolee = (state) =>
    state.volee.selectedVolee !== -1
        ? state.volee.volee[state.volee.selectedVolee]
        : false
