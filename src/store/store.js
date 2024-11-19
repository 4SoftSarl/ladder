import { configureStore } from "@reduxjs/toolkit"
import voleeReducer from "./reducers/volee"
import rankingReducer from "./reducers/ranking"
import ladderReducer from "./reducers/ladder"
import eleveReducer from "./reducers/eleve"

const store = configureStore({
    reducer: {
        volee: voleeReducer,
        ranking: rankingReducer,
        ladder: ladderReducer,
        eleve: eleveReducer
    }
})

export default store
