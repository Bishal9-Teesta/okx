
const WebSocket = require("ws")
const config = require("../config")
const calculator = require("../calculator")
const utility = require("../utility")
const algorithm = require("../algorithm")

const orderbook = () => {

    let pinger

    const socket_client = new WebSocket(config.PRODUCTION_PUBLIC_WEBSOCKET)

    socket_client.once("open", () => {
        console.log("Future Stream Socket connected!")

        socket_client.send(JSON.stringify({
            "op": "subscribe",
            "args": [
                {
                    "channel": "books5",
                    "instId": `${process.argv[2]}-USD-SWAP`
                }
            ]
        }))

        pinger = setTimeout(() => {
            socket_client.send("ping")
            // console.log("Sent Ping request!")
        }, 20 * 1000)
    })

    socket_client.once("error", (error) => {
        console.log("Future Stream Error: ", error)

        socket_client.close()
    })

    socket_client.once("close", (code, reason) => {
        console.log("Future Stream Close Code: ", code)
        console.log("Future Stream Close Reason: ", Buffer.from(reason).toString())

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
        // console.log("Future Stream Message Data: ", JSON.stringify(data, null, 4))
        // console.log("Future Stream Message Is Binary: ", isBinary)

        const future_symbol = data?.arg?.instId

        // TODO: For book - Depth of 400
        // if (data?.action === "snapshot" && data?.data?.length > 0) {

        //     data.data.forEach(asset => {

        //         if (Number(asset.prevSeqId) === -1) {
        //             global.FUTURE.book_sequence_id[future_symbol] = Number(asset.seqId)
        //             global.FUTURE.book[future_symbol] = {
        //                 a: asset.asks,
        //                 b: asset.bids
        //             }
        //         }
        //     })
        // } else if (data?.action === "update" && data?.data?.length > 0) {

        //     data.data.forEach(asset => {

        //         if (Number(asset.prevSeqId) === global.FUTURE.book_sequence_id[future_symbol]) {

        //             if (global.FUTURE.book[future_symbol] === undefined) {

        //                 console.log("\n\nDid not have stored book.\n\n")
        //             } else {

        //                 const new_book = { a: asset.asks, b: asset.bids }
        //                 let { a, b } = utility.book_maintainer(global.FUTURE.book[future_symbol], new_book)

        //                 global.FUTURE.book[future_symbol].a = a
        //                 global.FUTURE.book[future_symbol].b = b

        //                 global.FUTURE.book_sequence_id[future_symbol] = Number(asset.seqId)
        //             }
        //         } else {
        //             console.log("\nSequence Id did not matched!")
        //             console.log("Stored ID: ", global.FUTURE.book_sequence_id[future_symbol])
        //             console.log("Socket ID: ", Number(asset.prevSeqId))
        //         }
        //     })
        // }

        // TODO: For book5 - Depth of 5
        if (data?.data?.length > 0) {

            data.data.forEach(single_book => {

                const ask = calculator.future_quantity(single_book.asks)
                const bid = calculator.future_quantity(single_book.bids)

                global.FUTURE.book[future_symbol] = {
                    a: ask, b: bid
                }
            })
        }

        if (future_symbol) {

            // console.clear()
            // console.log(global.FUTURE.book[`${process.argv[2]}-USD-SWAP`])

            for (const option_symbol of Object.keys(global.OPTION.book)) {

                if (option_symbol.split("-")[0] === future_symbol.split("-")[0]) {

                    algorithm.flow_manager(option_symbol)
                }
            }
        }
    })

    socket_client.on("unexpected-response", (request, response) => {
        // console.log("Future Stream Unexpected Response Request: ", request)
        console.log("Future Stream Unexpected Response Response: ", response.read())
    })
}

module.exports = orderbook
