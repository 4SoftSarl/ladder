import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchVolees } from "../store/reducers/volee"
import { fetchExamens } from "../store/reducers/examen"
import { examenCard } from "../components/rank"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCirclePlay,
    faCircleStop,
    faFile
} from "@fortawesome/free-solid-svg-icons"
import { getUrlImage } from "../utils"

function Examen(props) {
    const dispatch = useDispatch()
    const [selectVolee, setSelectVolee] = useState(0)
    const voleeState = useSelector((state) => state.volee)
    const { volee } = voleeState
    const examenState = useSelector((state) => state.examen)
    const { examen } = examenState

    const loadExamens = (voleeId) => {
        dispatch(fetchExamens({ volee: voleeId }))
    }

    const displayExamen = (examen) => {
        return (
            <div
                key={examen.id}
                className="examen-details"
                style={{ borderColor: examen.difficulte.color }}
            >
                <div className="left-col">
                    <h3 style={{ color: examen.difficulte.color }}>
                        {examen.titre}
                    </h3>
                    <span>{examen.description}</span>
                    <span className="color-white2">
                        Rang{" "}
                        <span style={{ color: examen.difficulte.color }}>
                            {examen.difficulte.label}
                        </span>
                    </span>
                    <span className="color-white2">{`${examen.difficulte.elo} elo`}</span>
                    <div className="icon-span">
                        <FontAwesomeIcon
                            className="color-green1"
                            icon={faCirclePlay}
                        />
                        <span className="color-white2">{examen.dt_debut}</span>
                    </div>
                    <div className="icon-span">
                        <FontAwesomeIcon
                            className="color-red1"
                            icon={faCircleStop}
                        />
                        <span className="color-white2">{examen.dt_fin}</span>
                    </div>
                </div>
                <div className="right-col">
                    {examenCard(examen.difficulte, examen.sous_categorie, {
                        style: { width: 100, height: 100 }
                    })}
                    {examen.fichier && (
                        <a
                            className="file"
                            href={getUrlImage(examen.fichier)}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <FontAwesomeIcon
                                style={{ color: examen.difficulte.color }}
                                icon={faFile}
                            />
                        </a>
                    )}
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (selectVolee !== 0) loadExamens(selectVolee)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectVolee])

    useEffect(() => {
        if (volee.length > 0) setSelectVolee(volee[0].id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [volee.length])

    useEffect(() => {
        dispatch(fetchVolees())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="container-fluid base-container"
            style={{ minHeight: props.vpHeight }}
        >
            <h1 className="main-title mb-5">Examens</h1>
            <select
                className="mb-5"
                value={selectVolee}
                onChange={(e) => setSelectVolee(e.target.value)}
            >
                {volee.map((v) => (
                    <option key={`sel_${v.id}`} value={v.id}>
                        {v.label}
                    </option>
                ))}
            </select>
            {examen.map((ex) => displayExamen(ex))}
        </div>
    )
}

export default Examen
