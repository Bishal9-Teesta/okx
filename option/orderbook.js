
const get_instruments = require("./instrument")
const WebSocket = require("ws")
const { PRODUCTION_PUBLIC_WEBSOCKET } = require("../config")
const helper = require("../helper")
const algorithm = require("../algorithm")

const orderbook = async () => {

    let pinger
    let arguments_to_subscribe = []
    const instruments_list = await get_instruments()
    if (instruments_list?.data?.length > 0) {
        instruments_list.data.forEach(asset => {
            arguments_to_subscribe.push({
                "channel": "books5",
                "instId": asset.instId
            })
        })
    }
    // console.log("Args to subscribe: ", arguments_to_subscribe)

    const socket_client = new WebSocket(PRODUCTION_PUBLIC_WEBSOCKET)

    socket_client.once("open", () => {
        console.log("Option Stream Socket connected!")

        socket_client.send(JSON.stringify({
            "op": "subscribe",
            "args": arguments_to_subscribe
        }))

        pinger = setTimeout(() => {
            socket_client.send("ping")
            // console.log("Sent Ping request!")
        }, 20 * 1000)
    })

    socket_client.once("error", (error) => {
        console.log("Option Stream Socket Error: ", error)

        socket_client.close()
    })

    socket_client.once("close", (code, reason) => {
        console.log("Option Stream Socket Close Code: ", code)
        console.log("Option Stream Socket Close Reason: ", Buffer.from(reason).toString())

        socket_client.removeAllListeners()

        orderbook()
    })

    socket_client.on("message", (data, isBinary) => {
        data = Buffer.from(data).toString()

        if (data !== "pong") {
            data = JSON.parse(data)
        }

        if (pinger) {
            pinger.refresh()
            // console.log("Ping Timeout Refreshed!!")
        }

        // console.clear()
        // console.log("Option Stream Message Data: ", JSON.stringify(data, null, 4))
        // console.log("Option Stream Message Is Binary: ", isBinary)

        if (data?.data?.length > 0) {

            data.data.forEach(contract => {
                
                const option_symbol = contract.instId
                const future_symbol = helper.option_to_future_symbol(option_symbol)
                const future_top_ask = Number(global.FUTURE.book[future_symbol]?.a?.[0]?.[0])
                const future_top_bid = Number(global.FUTURE.book[future_symbol]?.b?.[0]?.[0])

                let asks = []
                let bids = []

                contract.asks.forEach(a => {
                    asks.push([Number(a[0]) * future_top_ask, Number(a[1]) * 0.01, a[2], a[3]])
                })
                contract.bids.forEach(b => {
                    bids.push([Number(b[0]) * future_top_bid, Number(b[1]) * 0.01, b[2], b[3]])
                })

                global.OPTION.book[option_symbol] = {
                    a: asks,
                    b: bids
                }

                algorithm.flow_manager(option_symbol)
            })
        }

        // console.log("Local Store: ", JSON.stringify(global.OPTION.book))
    })
}

module.exports = orderbook
