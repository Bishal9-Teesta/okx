
const axios = require("axios")

const PRODUCTION_PUBLIC_WEBSOCKET = "wss://ws.okx.com:8443/ws/v5/public"
const PRODUCTION_PRIVATE_WEBSOCKET = "wss://ws.okx.com:8443/ws/v5/private"

const PRODUCTION_REST = "https://www.okx.com/"

const public_instance = new axios.create({
    baseURL: PRODUCTION_REST,
    timeout: 5000,
})

module.exports = {
    public_instance,
    PRODUCTION_REST,
    PRODUCTION_PUBLIC_WEBSOCKET,
    PRODUCTION_PRIVATE_WEBSOCKET
}
