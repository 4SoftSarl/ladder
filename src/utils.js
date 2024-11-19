import { faSync } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const BASE_URL = "http://localhost:8000"
export const BASE_URL_API = `${BASE_URL}/api/`

export const spinner = (color = "#fff") => {
    return <FontAwesomeIcon spin icon={faSync} style={{ color }} />
}

export const getUrlImage = (src) => {
    return BASE_URL + src
}

export const setUrlParams = (_url, params) => {
    let url = new URL(_url)
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value)
    }
    return url
}
