import Chart from "chart.js/auto"
import { useEffect } from "react"

export const CustomChart = (props) => {
    const { type, data, title, id } = props
    useEffect(() => {
        const ctx = document.getElementById(id)
        const chart = new Chart(ctx, {
            type,
            data
        })
        return () => {
            chart.destroy()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="chart-container">
            <h2 className="text-center color-white2">{title}</h2>
            <canvas id={id}></canvas>
        </div>
    )
}
