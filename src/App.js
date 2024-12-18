import "./App.css"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from "react-router-dom"
import Home from "./pages/Home"
import { useState, useEffect } from "react"
import Ladder from "./pages/Ladder"
import Examen from "./pages/Examen"
import Reglement from "./pages/Reglement"

function App() {
    const NAV_HEIGHT = 73
    const [vpHeight, setVpHeight] = useState(window.innerHeight - NAV_HEIGHT)
    useEffect(() => {
        const handleResize = () => {
            setVpHeight(window.innerHeight - NAV_HEIGHT)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    return (
        <Router
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}
        >
            <nav id="nav" className="navbar border-bottom border-body">
                <ul className="container-fluid d-flex flex-row navbar-nav nav justify-content-center">
                    <li className="nav-item p-2">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item p-2">
                        <NavLink to="/reglement" className="nav-link">
                            Règlement
                        </NavLink>
                    </li>
                    <li className="nav-item p-2">
                        <NavLink to="/ladder" className="nav-link">
                            Ladder
                        </NavLink>
                    </li>
                    <li className="nav-item p-2">
                        <NavLink to="/examen" className="nav-link">
                            Examen
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home vpHeight={vpHeight} />} />
                <Route
                    path="/reglement"
                    element={<Reglement vpHeight={vpHeight} />}
                />
                <Route
                    path="/ladder"
                    element={<Ladder vpHeight={vpHeight} />}
                />
                <Route
                    path="/examen"
                    element={<Examen vpHeight={vpHeight} />}
                />
            </Routes>
        </Router>
    )
}

export default App
