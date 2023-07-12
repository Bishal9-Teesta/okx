
const helper = require("../helper")

const moneyness = (option_symbol, future_price) => {

    let itm = undefined
    let otm = undefined
    let itm_symbol = undefined
    let otm_symbol = undefined
    let itm_array = []
    let otm_array = []
    const put_symbol = helper.contract_to_put(option_symbol)
    const call_symbol = helper.contract_to_call(option_symbol)
    const strike = helper.contract_strike(option_symbol)
    const contract_type = helper.contract_type(option_symbol)

    // console.log("Put Symbol: ", put_symbol)
    // console.log("Call Symbol: ", call_symbol)
    // console.log("Strike: ", strike)
    // console.log("Future Price: ", future_price)
    // console.log("Contract Type: ", contract_type)
    // console.log("Put Book: ", global.OPTION.book[put_symbol])
    // console.log("Call Book: ", global.OPTION.book[call_symbol])

    if (contract_type === "P" && strike > future_price) {
        itm = "P"
        otm = "C"
        itm_symbol = put_symbol
        otm_symbol = call_symbol
        itm_array = global.OPTION.book[put_symbol]?.a
        otm_array = global.OPTION.book[call_symbol]?.b
    } else if (contract_type === "C" && strike < future_price) {
        itm = "C"
        otm = "P"
        itm_symbol = call_symbol
        otm_symbol = put_symbol
        itm_array = global.OPTION.book[call_symbol]?.a
        otm_array = global.OPTION.book[put_symbol]?.b
    } else if (contract_type === "C" && strike === future_price) {
        itm = "P"
        otm = "C"
        itm_symbol = put_symbol
        otm_symbol = call_symbol
        itm_array = global.OPTION.book[put_symbol]?.a
        otm_array = global.OPTION.book[call_symbol]?.b
    } else if (contract_type === "P" && strike === future_price) {
        itm = "P"
        otm = "C"
        itm_symbol = put_symbol
        otm_symbol = call_symbol
        itm_array = global.OPTION.book[put_symbol]?.a
        otm_array = global.OPTION.book[call_symbol]?.b
    }

    return {
        itm,
        otm,
        itm_symbol,
        otm_symbol,
        itm_array,
        otm_array
    }
}

module.exports = moneyness
