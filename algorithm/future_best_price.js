
const helper = require("../helper")

const future_best_price = (option_symbol, future_symbol) => {

    let future_price = 0
    let future_array = []
    // console.log("Option Symbol: ", option_symbol)
    // console.log("Future Symbol: ", future_symbol)
    const future_best_bid = Number(global.FUTURE.book[future_symbol]?.b?.[0]?.[0]) || 0
    const future_best_ask = Number(global.FUTURE.book[future_symbol]?.a?.[0]?.[0]) || 0

    if (helper.contract_is_call(option_symbol)) {
        future_price = future_best_bid
        future_array = global.FUTURE.book[future_symbol]?.b || []
    } else if (helper.contract_is_put(option_symbol)) {
        future_price = future_best_ask
        future_array = global.FUTURE.book[future_symbol]?.a || []
    }

    // console.log("Future Price: ", future_price)
    // console.log("Future Book: ", global.FUTURE.book[future_symbol])
    // console.log("Future Array: ", future_array)

    return {
        future_array,
        future_price
    }
}

module.exports = future_best_price
