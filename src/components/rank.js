import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getUrlImage } from "../utils"
import { faLessThan, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"

export const rankingComponent = (ranking) => {
    return (
        <div
            key={`ranking_${ranking.id}`}
            className="ranking-component"
            style={{ borderColor: ranking.color }}
        >
            <h2 style={{ color: ranking.color }}>{ranking.label}</h2>
            <img src={getUrlImage(ranking.image)} alt={ranking.label} />
            <div className="elo-line">
                <span>{ranking.elo_min}</span>
                <FontAwesomeIcon icon={faLessThanEqual} />
                <span style={{ color: ranking.color }}>{"elo"}</span>
                <FontAwesomeIcon icon={faLessThan} />
                <span>{ranking.elo_max}</span>
            </div>
        </div>
    )
}

export const examenCard = (difficulte, sousCategorie, params = {}) => {
    const getStyle = () => {
        if (params.style) {
            return params.style
        }
        return {}
    }
    return (
        <div
            key={`ex-card_${difficulte.id}_${sousCategorie.id}`}
            className="examen-card"
            style={getStyle()}
        >
            <img
                className="img-difficulte"
                src={getUrlImage(difficulte.image)}
                alt="Difficulté"
            />
            <img
                className="img-sous-categorie"
                src={getUrlImage(sousCategorie.image)}
                alt="Sous-catégorie"
            />
        </div>
    )
}
