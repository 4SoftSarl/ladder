import { getUrlImage } from "../utils"

export const EleveCard = (eleve) => {
    console.log(eleve)
    return (
        <div key={`eleve_card_${eleve.id}`} className="eleve-card">
            <div className="elo">
                <span>{`elo ${eleve.elo}`}</span>
            </div>
            <div className="eleve-container">
                <div className="image-container">
                    <img src={getUrlImage(eleve.current_rank.image)} alt="" />
                </div>
                <div className="info-container">
                    <span>{eleve.prenom}</span>
                    <span>{eleve.volee_nom}</span>
                    <div className="rank">
                        <img
                            src={getUrlImage(eleve.current_rank.image)}
                            alt=""
                        />
                        <span>{eleve.current_rank.label}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
