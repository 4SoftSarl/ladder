import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { spinner } from "../utils"
import { fetchLadders } from "../store/reducers/ladder"

function Ladder(props) {
    const dispatch = useDispatch()
    const ladderState = useSelector((state) => state.ladder)

    const ladderComponent = (ladder) => {
        return (
            <div key={`ladder_${ladder.id}`} className="ladder-component">
                <h2>{ladder.label}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Elo</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ladder.eleves.map((eleve, index) => (
                            <tr key={`eleve_${eleve.id}`}>
                                <td>{index + 1}</td>
                                <td>{eleve.nom}</td>
                                <td>{eleve.prenom}</td>
                                <td>{eleve.elo}</td>
                                <td>{eleve.current_rank.label}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    useEffect(() => {
        dispatch(fetchLadders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="container-fluid base-container"
            style={{ minHeight: props.vpHeight }}
        >
            <h1 className="main-title mb-5">Ladder</h1>
            <div className="d-flex flex-row">
                {ladderState.fetchLadder.loading
                    ? spinner()
                    : ladderState.ladder.map((ladder) =>
                          ladderComponent(ladder)
                      )}
            </div>
        </div>
    )
}

export default Ladder
