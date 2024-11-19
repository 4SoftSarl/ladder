import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API } from "../../utils"

const initialState = {
    ladder: [],
    fetchLadder: {
        loading: false,
        error: false
    }
}

export const fetchLadders = createAsyncThunk(
    "ladder/fetchLadders",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL_API}ladder/ladder`)
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const ladderSlice = createSlice({
    name: "ladder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLadders.pending, (state) => {
                state.fetchLadder.loading = true
                state.fetchLadder.error = false
            })
            .addCase(fetchLadders.fulfilled, (state, action) => {
                state.fetchLadder = {
                    loading: false,
                    error: false
                }
                state.ladder = action.payload
            })
            .addCase(fetchLadders.rejected, (state, action) => {
                state.fetchLadder = {
                    loading: false,
                    error: action.payload
                }
                state.ladder = []
            })
    }
})

export default ladderSlice.reducer
