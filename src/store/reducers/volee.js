import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API } from "../../utils"

const initialState = {
    volee: [],
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
    reducers: {},
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
            })
            .addCase(fetchVolees.rejected, (state, action) => {
                state.fetchVolee = {
                    loading: false,
                    error: action.payload
                }
                state.volee = []
            })
    }
})

export default voleeSlice.reducer
