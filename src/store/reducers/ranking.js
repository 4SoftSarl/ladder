import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API } from "../../utils"

const initialState = {
    ranking: [],
    fetchRanking: {
        loading: false,
        error: false
    }
}

export const fetchRankings = createAsyncThunk(
    "ranking/fetchRankings",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL_API}ladder/ranking`)
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const rankingSlice = createSlice({
    name: "ranking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRankings.pending, (state) => {
                state.fetchRanking.loading = true
                state.fetchRanking.error = false
            })
            .addCase(fetchRankings.fulfilled, (state, action) => {
                state.fetchRanking = {
                    loading: false,
                    error: false
                }
                state.ranking = action.payload
            })
            .addCase(fetchRankings.rejected, (state, action) => {
                state.fetchRanking = {
                    loading: false,
                    error: action.payload
                }
                state.ranking = []
            })
    }
})

export default rankingSlice.reducer
