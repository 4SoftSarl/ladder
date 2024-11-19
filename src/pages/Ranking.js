import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUrlImage, spinner } from "../utils"
import { fetchRankings } from "../store/reducers/ranking"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLessThan, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"

function Ranking(props) {
    const dispatch = useDispatch()
    const rankingState = useSelector((state) => state.ranking)

    const rankingComponent = (ranking) => {
        return (
            <div key={`ranking_${ranking.id}`} className="ranking-component">
                <h2>{ranking.label}</h2>
                <img src={getUrlImage(ranking.image)} alt={ranking.label} />
                <div className="elo-line">
                    <span>{ranking.elo_min}</span>
                    <FontAwesomeIcon icon={faLessThanEqual} />
                    <span>{"elo"}</span>
                    <FontAwesomeIcon icon={faLessThan} />
                    <span>{ranking.elo_max}</span>
                </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(fetchRankings())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="container-fluid base-container"
            style={{ minHeight: props.vpHeight }}
        >
            <h1 className="main-title mb-5">Ranking</h1>
            <div className="d-flex flex-row">
                {rankingState.fetchRanking.loading
                    ? spinner()
                    : rankingState.ranking.map((ranking) =>
                          rankingComponent(ranking)
                      )}
            </div>
        </div>
    )
}

export default Ranking
