import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API, setUrlParams } from "../../utils"

const initialState = {
    examen: [],
    fetchExamen: {
        loading: false,
        error: false
    }
}

export const fetchExamens = createAsyncThunk(
    "examen/fetchExamens",
    async (params, thunkAPI) => {
        let url = setUrlParams(`${BASE_URL_API}ladder/examen`, params)
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const examenSlice = createSlice({
    name: "examen",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamens.pending, (state) => {
                state.fetchExamen.loading = true
                state.fetchExamen.error = false
            })
            .addCase(fetchExamens.fulfilled, (state, action) => {
                state.fetchExamen = {
                    loading: false,
                    error: false
                }
                state.examen = action.payload
            })
            .addCase(fetchExamens.rejected, (state, action) => {
                state.fetchExamen = {
                    loading: false,
                    error: action.payload
                }
                state.examen = []
            })
    }
})

export default examenSlice.reducer
