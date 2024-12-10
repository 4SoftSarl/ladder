import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API } from "../../utils"

const initialState = {
    categories: [],
    sousCategories: [],
    difficultes: [],
    ranks: [],
    fetchBases: {
        loading: false,
        initialLoad: false,
        error: false
    }
}

export const fetchBases = createAsyncThunk(
    "examen/fetchBases",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL_API}ladder/base`)
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const baseSlice = createSlice({
    name: "base",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBases.pending, (state) => {
                state.fetchBases.loading = true
                state.fetchBases.error = false
            })
            .addCase(fetchBases.fulfilled, (state, action) => {
                state.fetchBases = {
                    loading: false,
                    error: false,
                    initialLoad: true
                }
                state.categories = action.payload.categories
                state.sousCategories = action.payload.sousCategories
                state.difficultes = action.payload.difficultes
                state.ranks = action.payload.ranks
            })
            .addCase(fetchBases.rejected, (state, action) => {
                state.fetchBases = {
                    loading: false,
                    error: action.payload
                }
            })
    }
})

export default baseSlice.reducer
