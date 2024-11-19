import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const BASE_URL = "http://localhost:8000"
export const BASE_URL_API = `${BASE_URL}/api/`

export const spinner = (color = "#fff") => {
    return <FontAwesomeIcon spin icon={faSync} style={{ color }} />
}
