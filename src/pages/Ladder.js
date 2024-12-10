import { useDispatch, useSelector } from "react-redux"
import { memo, useEffect, useState } from "react"
import { spinner } from "../utils"
import { fetchEleveAndResultats, fetchLadders } from "../store/reducers/ladder"
import { fetchVolees, getVolee, getVoleeName } from "../store/reducers/volee"
import { EleveCardSmall } from "../components/eleve"
import { CustomChart } from "../components/charts"

function Ladder(props) {
    const dispatch = useDispatch()
    const [selectEleve, setSelectEleve] = useState(0)
    const ladderState = useSelector((state) => state.ladder)
    const voleeState = useSelector((state) => state.volee)
    const voleeName = useSelector(getVoleeName)
    const volee = useSelector(getVolee)

    const clickEleveCard = (id) => {
        setSelectEleve(id)
    }

    const voleePie = () => {
        if (!volee) return null
        let data = {}
        volee.eleves.forEach((eleve) => {
            if (!Object.keys(data).includes(eleve.current_rank.label)) {
                data[eleve.current_rank.label] = {
                    nb: 0,
                    color: eleve.current_rank.color,
                    label: eleve.current_rank.label
                }
            }
            data[eleve.current_rank.label].nb += 1
        })
        let final_data = {
            labels: Object.values(data).map((d) => d.label),
            datasets: [
                {
                    label: "Elèves",
                    data: Object.values(data).map((d) => d.nb),
                    backgroundColor: Object.values(data).map((d) => d.color),
                    hoverOffset: 4
                }
            ]
        }
        return (
            <CustomChart
                type="pie"
                data={final_data}
                title={"Répartition rangs"}
                id="pie_rangs"
            />
        )
    }

    const averageElo = () => {
        const { average_elo } = ladderState.ladder
        if (!average_elo) return null
        let data = {
            labels: average_elo.labels,
            datasets: [
                {
                    label: "Elo moyen",
                    data: average_elo.data,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 1
                }
            ]
        }
        return (
            <CustomChart
                type="line"
                data={data}
                title={"Elo moyen"}
                id="line_elo_moyen"
            />
        )
    }

    const pompes = () => {
        const { pushups } = ladderState.ladder
        if (!pushups.total) return null
        return <CountingInfo title="Total Pompes" value={pushups.total} />
    }

    const bestPompeur = () => {
        const { pushups } = ladderState.ladder
        if (!pushups.top) return null
        return (
            <CountingInfo
                title="Best Pompeur"
                value={pushups.top}
                subtitle={pushups.top_name}
            />
        )
    }

    const CountingInfo = memo(({ title, value, subtitle }) => {
        const [displayValue, setDisplayValue] = useState(0)
        const animateSmooth = (duration) => {
            const startTime = performance.now()

            const step = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)

                setDisplayValue(Math.round(value * progress))

                if (progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
        }

        useEffect(() => {
            console.log(`${title} mounted`)
            animateSmooth(1000)

            return () => {
                console.log(`${title} unmounted`)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        return (
            <div className="chart-container">
                <h2 className="text-center color-white2">{title}</h2>
                {subtitle && <h4 className="text-center mt-5">{subtitle}</h4>}
                <div className="info mt-5">
                    <img
                        src="/imgs/pushup.png"
                        alt="pompes"
                        style={{ width: 40, height: 40 }}
                    />
                    <h4 className="text-center">{displayValue}</h4>
                </div>
            </div>
        )
    })

    useEffect(() => {
        if (voleeState.selectedVolee !== -1)
            dispatch(fetchLadders({ volee: volee.id }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voleeState.selectedVolee])

    // useEffect(() => {
    // if (selectEleve !== 0)
    //     dispatch(fetchEleveAndResultats({ id: selectEleve }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectEleve])

    useEffect(() => {
        dispatch(fetchVolees())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="container-fluid base-container"
            style={{ minHeight: props.vpHeight }}
        >
            <h1 className="main-title mb-5">{voleeName}</h1>
            <h2 className="mb-5">Statistiques</h2>
            {ladderState.fetchLadder.loading ||
            !ladderState.fetchLadder.loaded ? (
                spinner()
            ) : (
                <div className="d-flex flex-row mb-5">
                    {voleePie()}
                    {averageElo()}
                    {pompes()}
                    {bestPompeur()}
                </div>
            )}
            <h2 className="mb-5">Élèves</h2>
            <div className="d-flex flex-row mb-5">
                {voleeState.fetchVolee.loading
                    ? spinner()
                    : voleeState.selectedVolee === -1
                    ? null
                    : volee.eleves.map((eleve) => (
                          <div
                              key={`eleve_clickable_${eleve.id}`}
                              className={`clickable ${
                                  eleve.id === selectEleve ? "clicked" : ""
                              }`}
                              onClick={() => clickEleveCard(eleve.id)}
                          >
                              {EleveCardSmall(eleve)}
                          </div>
                      ))}
            </div>
        </div>
    )
}

export default Ladder
