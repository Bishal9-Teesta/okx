
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

    require("fs").writeFileSync(`Opportunity-${process.argv[2]}.csv`, "ITM Symbol, Future Symbol, Future Price, ITM Floor Price, OTM Floor Price, Total Quantity, Total Expense, Total Profit, Total Required Margin To Trade, Profit In Points, Expiry In Days, Trade ROI, Future Book, ITM Book, OTM Book", { encoding: "utf-8" })

    future.orderbook()
    option.orderbook()

    // await option.get_instruments()
}
main()
