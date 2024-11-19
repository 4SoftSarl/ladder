import { getUrlImage } from "../utils"

export const EleveCard = (eleve) => {
    return (
        <div
            key={`eleve_card_${eleve.id}`}
            className="eleve-card"
            style={{ borderColor: eleve.current_rank.color }}
        >
            <div className="elo">
                <span>{`elo ${eleve.elo}`}</span>
            </div>
            <div className="eleve-container">
                <div className="image-container">
                    <img src={getUrlImage(eleve.image)} alt="" />
                </div>
                <div className="info-container">
                    <span>{eleve.prenom}</span>
                    <span>{eleve.volee_nom}</span>
                    <div className="rank">
                        <img
                            src={getUrlImage(eleve.current_rank.image)}
                            alt=""
                        />
                        <span style={{ color: eleve.current_rank.color }}>
                            {eleve.current_rank.label}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
