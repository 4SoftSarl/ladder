import { getUrlImage } from "../utils"

export const EleveCard = (eleve, index = null) => {
    return (
        <div
            className="eleve-card"
            key={`eleve_card_${eleve.id}`}
            style={{ borderColor: eleve.current_rank.color }}
        >
            <div className="title">
                <h2>{index !== null ? `#${index + 1}` : ""}</h2>
                <div className="img-container">
                    <img src={getUrlImage(eleve.current_rank.image)} alt="" />
                </div>
                {/* <h5>Recrue</h5> */}
            </div>
            <h2 style={{ color: eleve.current_rank.color }}>{eleve.pseudo}</h2>
            <div className="rank">
                <h4 className="elo">{`elo ${eleve.elo}`}</h4>
                <h4
                    className="classement"
                    style={{ color: eleve.current_rank.color }}
                >
                    {eleve.current_rank.rank_name}
                </h4>
            </div>
            <div className="eleve-container">
                <div className="image-container">
                    <img src={getUrlImage(eleve.image)} alt="" />
                </div>
                <div className="info-container">
                    <span>{eleve.nom}</span>
                    <span>{eleve.prenom}</span>
                    {/* <span>{eleve.email}</span> */}
                    <span>{eleve.volee_nom}</span>
                    <div className="pushups">
                        <img src="/imgs/pushup.png" alt="pompes" />
                        <span>{eleve.pushup}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const EleveCardSmall = (eleve) => {
    return (
        <div
            className="eleve-card-small"
            key={`eleve_card_small_${eleve.id}`}
            style={{ borderColor: eleve.current_rank.color }}
        >
            <div className="row">
                <img src={getUrlImage(eleve.image)} alt="" />
                <img src={getUrlImage(eleve.current_rank.image)} alt="" />
            </div>
            <h2 style={{ color: eleve.current_rank.color }}>{eleve.pseudo}</h2>
            <h4
                className="classement"
                style={{ color: eleve.current_rank.color }}
            >
                {eleve.current_rank.rank_name}
            </h4>
            <span>{eleve.nom}</span>
            <span>{eleve.prenom}</span>
            <div className="pushups">
                <img src="/imgs/pushup.png" alt="pompes" />
                <span>{eleve.pushup}</span>
            </div>
        </div>
    )
}
