import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { spinner } from "../utils"
import { examenCard, rankingComponent } from "../components/rank"
import { fetchBases } from "../store/reducers/base"

function Reglement(props) {
    const dispatch = useDispatch()
    const baseState = useSelector((state) => state.base)
    const { difficultes, sousCategories } = baseState

    const getRandomExamenCards = () => {
        if (difficultes.length === 0 || sousCategories.length === 0) return null
        let elems = []
        difficultes.forEach((difficulte, index) => {
            elems.push({
                difficulte,
                sousCategorie: sousCategories[index]
            })
        })
        return elems.map((elem) => (
            <div className="examen-card-row">
                <h2
                    className="examen-card-row-label"
                    style={{ color: elem.difficulte.color }}
                >
                    {elem.difficulte.label}
                </h2>
                <h2 className="examen-card-row-elo">{`${elem.difficulte.elo} elo`}</h2>
                {examenCard(elem.difficulte, elem.sousCategorie)}
            </div>
        ))
    }

    useEffect(() => {
        if (!baseState.fetchBases.initialLoad) dispatch(fetchBases())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="container-fluid base-container"
            style={{ minHeight: props.vpHeight }}
        >
            <h1 className="main-title mb-5">Montre ta valeur</h1>
            <p className="mb-5 text-justify color-white2">
                Tu viens d'entrer dans le collisée de l'informatique où tu seras
                confronté à des quêtes touchants différents domaines. Tu veux
                devenir un maître de l'informatique ? Prépare toi à démontrer
                ton savoir dans une multitude de sujets passionnants et gagner
                des points ELO afin de monter en classement.
            </p>
            <h2 className="mb-5">Classements</h2>
            <p className="mb-5 text-justify color-white2">
                Le système de classement se définit selon les rangs suivants:
                bronze, argent, or, platine et diamant. Il y a deux rangs
                cachés, seras-tu le premier à les dévoiler ?
            </p>
            <div className="d-flex flex-row mb-5">
                {baseState.fetchBases.loading
                    ? spinner()
                    : baseState.ranks
                          .slice(0, 3)
                          .map((rank) => rankingComponent(rank))}
            </div>
            <div className="d-flex flex-row mb-5">
                {baseState.fetchBases.loading
                    ? spinner()
                    : [...baseState.ranks.slice(3)].map((rank) =>
                          rankingComponent(rank)
                      )}
            </div>
            <h2 className="mb-5">Quêtes</h2>
            <p className="mb-5 text-justify color-white2">
                Il y a quatre rangs de quête: rare, épique, mythique et
                légendaire. Chacun d'entre eux te permet de gagner un certain
                nombre d'ELO, dépendant évidemment de tes résultats.
            </p>
            <div className="d-flex flex-column mb-5">
                {baseState.fetchBases.loading
                    ? spinner()
                    : getRandomExamenCards()}
            </div>
        </div>
    )
}

export default Reglement
