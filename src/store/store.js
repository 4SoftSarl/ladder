import { configureStore } from "@reduxjs/toolkit"
import voleeReducer from "./reducers/volee"
import rankingReducer from "./reducers/ranking"
import ladderReducer from "./reducers/ladder"
import eleveReducer from "./reducers/eleve"
import examenReducer from "./reducers/examen"
import baseReducer from "./reducers/base"

const store = configureStore({
    reducer: {
        volee: voleeReducer,
        ranking: rankingReducer,
        ladder: ladderReducer,
        eleve: eleveReducer,
        examen: examenReducer,
        base: baseReducer
    }
})

export default store
