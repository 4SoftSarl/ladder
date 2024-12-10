import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL_API, setUrlParams } from "../../utils"

const initialState = {
    ladder: {},
    fetchLadder: {
        loading: false,
        loaded: false,
        error: false
    },
    eleve: {},
    eleve_res: [],
    fetchEleveAndResultats: {
        loading: false,
        error: false
    }
}

export const fetchEleveAndResultats = createAsyncThunk(
    "ladder/fetchEleveAndResultat",
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

export const fetchLadders = createAsyncThunk(
    "ladder/fetchLadders",
    async (params, thunkAPI) => {
        let url = setUrlParams(`${BASE_URL_API}ladder/ladder`, params)
        try {
            const response = await fetch(url)
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
                    loaded: true,
                    error: false
                }
                state.ladder = action.payload
            })
            .addCase(fetchLadders.rejected, (state, action) => {
                state.fetchLadder = {
                    loading: false,
                    error: action.payload
                }
                state.ladder = {}
            })
            .addCase(fetchEleveAndResultats.pending, (state) => {
                state.fetchEleveAndResultats.loading = true
                state.fetchEleveAndResultats.error = false
            })
            .addCase(fetchEleveAndResultats.fulfilled, (state, action) => {
                state.fetchEleveAndResultats = {
                    loading: false,
                    error: false
                }
                state.eleve = action.payload.eleve
                state.eleve_res = action.payload.eleve_res
            })
            .addCase(fetchEleveAndResultats.rejected, (state, action) => {
                state.fetchEleveAndResultats = {
                    loading: false,
                    error: action.payload
                }
                state.eleve = {}
                state.eleve_res = []
            })
    }
})

export default ladderSlice.reducer
