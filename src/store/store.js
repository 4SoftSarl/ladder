import { configureStore } from "@reduxjs/toolkit"
import voleeReducer from "./reducers/volee"
import rankingReducer from "./reducers/ranking"
import ladderReducer from "./reducers/ladder"

const store = configureStore({
    reducer: {
        volee: voleeReducer,
        ranking: rankingReducer,
        ladder: ladderReducer
    }
})

export default store
