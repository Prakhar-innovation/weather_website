export const API_KEY = "YOUR_OPENWEATHER_API_KEY"
export const APIURL = "https://api.openweathermap.org/data/2.5/weather"

export async function callApi(reqMethod, url, data, responseHandler) {
    let options = {
        method: reqMethod,
        headers: { "Content-Type": "application/json" }
    }

    if (reqMethod !== "GET" && reqMethod !== "DELETE") {
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error("City not found")
        }

        const res = await response.json()
        responseHandler(res)

    } catch (err) {
        responseHandler({ error: err.message })
    }
}
