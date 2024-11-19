import { useDispatch, useSelector } from "react-redux"
import { fetchVolees } from "../store/reducers/volee"
import { useEffect } from "react"
import { spinner } from "../utils"

function Home(props) {
    const dispatch = useDispatch()
    const voleeState = useSelector((state) => state.volee)

    const voleeComponent = (volee) => {
        return (
            <div key={`volee_${volee.id}`} className="volee-component">
                <span>{`${volee.label} - ${volee.date_debut} à ${volee.date_fin}`}</span>
            </div>
        )
    }

    useEffect(() => {
        dispatch(fetchVolees())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="container-fluid base-container"
            style={{ minHeight: props.vpHeight, paddingTop: 300 }}
        >
            <h1 className="main-title mb-5">ICT-Start Ladder</h1>
            {voleeState.fetchVolee.loading
                ? spinner()
                : voleeState.volee.map((volee) => voleeComponent(volee))}
        </div>
    )
}

export default Home
