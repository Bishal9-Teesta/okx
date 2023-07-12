
process.env.TZ = "Asia/Kolkata"

console.log("OKX Application started at", new Date().toLocaleDateString(), new Date().toLocaleTimeString())

global.FUTURE = {
    book: {},
    book_sequence_id: {}
}
global.OPTION = {
    book: {}
}
global.ONGOING = []

const future = require("./future")
const option = require("./option")

const main = async () => {
    future.orderbook()
    option.orderbook()

    // await option.get_instruments()
}
main()
