import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { spinner } from "../utils"
import { fetchEleves } from "../store/reducers/eleve"
import { EleveCard } from "../components/eleve"

function Home(props) {
    const dispatch = useDispatch()
    const eleveState = useSelector((state) => state.eleve)

    const drawEleveListe = () => {
        if (eleveState.fetchEleve.loading) return spinner()
        let elemPerRow = 3
        let nbLoop = Math.floor(eleveState.eleve.length / elemPerRow)
        let l = Array.from({ length: nbLoop }, (_, i) => i)
        return l.map((i) => (
            <div key={`liste_eleve_${i}`} className="d-flex flex-row">
                {eleveState.eleve
                    .slice(i * elemPerRow, (i + 1) * elemPerRow)
                    .map((eleve) => EleveCard(eleve))}
            </div>
        ))
    }

    useEffect(() => {
        dispatch(fetchEleves({ type: "top6" }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className="container-fluid base-container"
            style={{ minHeight: props.vpHeight }}
        >
            <h1 className="main-title mb-5">ICT-Start Ladder</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente, sequi. Quae voluptatibus numquam ratione esse ea rem
                id culpa exercitationem maxime. Facere distinctio aspernatur
                harum. Aliquid necessitatibus ipsum natus. Officiis, quas?
                Molestiae esse voluptatem repellat! Explicabo ullam numquam
                fugiat eius iste doloribus distinctio quos dicta libero est
                iusto deserunt, cumque facilis quidem ex voluptate reiciendis
                voluptatibus, totam laborum ut accusamus at expedita nam iure?
                Eveniet tenetur vitae magni dolore molestiae dignissimos facere
                repellat quidem mollitia nam fugit odit quia magnam quisquam
                nostrum, omnis ipsa eos illo velit nulla quos. Sed modi itaque
                corrupti ab dicta quas a fugiat ipsum eligendi.
            </p>
            <h2>Top students</h2>
            {drawEleveListe()}
        </div>
    )
}

export default Home
