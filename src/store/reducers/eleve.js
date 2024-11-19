import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API, setUrlParams } from "../../utils"

const initialState = {
    eleve: [],
    fetchEleve: {
        loading: false,
        error: false
    }
}

export const fetchEleves = createAsyncThunk(
    "eleve/fetchEleves",
    async (params, thunkAPI) => {
        let url = setUrlParams(`${BASE_URL_API}ladder/eleve`, params)
        try {
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const eleveSlice = createSlice({
    name: "eleve",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEleves.pending, (state) => {
                state.fetchEleve.loading = true
                state.fetchEleve.error = false
            })
            .addCase(fetchEleves.fulfilled, (state, action) => {
                state.fetchEleve = {
                    loading: false,
                    error: false
                }
                state.eleve = action.payload
            })
            .addCase(fetchEleves.rejected, (state, action) => {
                state.fetchEleve = {
                    loading: false,
                    error: action.payload
                }
                state.eleve = []
            })
    }
})

export default eleveSlice.reducer
