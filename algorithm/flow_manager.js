
const fs = require('fs')
const path = require('path')
const helper = require("../helper")
const future_best_price = require("./future_best_price")
const moneyness = require("./moneyness")
const opportunity_checker = require("./opportunity_checker")

const opportunity_book_path = path.resolve(__dirname, `../Opportunity-${process.argv[2]}.csv`)

const flow_manager = (option_symbol) => {

    // console.log("\n\n\n\n\nAlgo Flow")
    if (global.ONGOING.includes(option_symbol)) return

    let total_profit = 0
    let total_quantity = 0
    let itm_floor_price = 0
    let otm_floor_price = 0
    let total_expense = 0
    let profit_in_points = 0
    let total_required_margin_to_trade = 0
    const put_symbol = helper.contract_to_put(option_symbol)
    const call_symbol = option_symbol
    const future_symbol = helper.option_to_future_symbol(option_symbol)
    const { future_array, future_price } = future_best_price(option_symbol, future_symbol)

    if (
        !future_price ||
        !global.OPTION.book?.[put_symbol]?.a ||
        !global.OPTION.book?.[put_symbol]?.b ||
        !global.OPTION.book?.[call_symbol]?.a ||
        !global.OPTION.book?.[call_symbol]?.b ||
        !global.OPTION.book?.[put_symbol]?.a?.length ||
        !global.OPTION.book?.[put_symbol]?.a?.length ||
        !global.OPTION.book?.[call_symbol]?.a?.length ||
        !global.OPTION.book?.[call_symbol]?.b?.length
    ) return

    const { itm, otm, itm_symbol, otm_symbol, itm_array, otm_array } = moneyness(option_symbol, future_price)
    // console.log("itm_array", itm_array)
    // console.log("otm_array", otm_array)
    // console.log("itm", itm)
    // console.log("otm", otm)
    // console.log("itm_symbol", itm_symbol)
    // console.log("otm_symbol", otm_symbol)
    if (
        itm_array?.length === 0 ||
        otm_array?.length === 0 ||
        itm === undefined ||
        otm === undefined ||
        itm_symbol === undefined ||
        otm_symbol === undefined
    ) return

    const final = opportunity_checker(itm_symbol, future_array, itm_array, otm_array)
    // console.log("Final: ", final)

    if (final?.length > 0) {

        final.forEach(_opportunity => {

            if (itm === "C") {

                itm_floor_price = _opportunity.itm_option_price
                otm_floor_price = _opportunity.otm_option_price
                profit_in_points = _opportunity.reversion_in_points
                total_quantity = total_quantity + _opportunity.quantity
                total_expense = total_expense + _opportunity.total_expense
                total_profit = total_profit + _opportunity.reversion_profit_in_usdt
                total_required_margin_to_trade = total_required_margin_to_trade + _opportunity.required_margin_to_trade
            } else if (itm === "P") {

                itm_floor_price = _opportunity.itm_option_price
                otm_floor_price = _opportunity.otm_option_price
                profit_in_points = _opportunity.conversion_in_points
                total_quantity = total_quantity + _opportunity.quantity
                total_expense = total_expense + _opportunity.total_expense
                total_profit = total_profit + _opportunity.conversion_profit_in_usdt
                total_required_margin_to_trade = total_required_margin_to_trade + _opportunity.required_margin_to_trade
            }
        })

        if (total_profit > 10) {

            let future_price_to_print = '['
            future_array.forEach(pair => {
                future_price_to_print = future_price_to_print + `[${pair[0]}-${pair[1]}]`
            })
            future_price_to_print = future_price_to_print + ']'

            let itm_array_to_print = '['
            itm_array.forEach(pair => {
                itm_array_to_print = itm_array_to_print + `[${pair[0]}-${pair[1]}]`
            })
            itm_array_to_print = itm_array_to_print + "]"

            let otm_array_to_print = '['
            otm_array.forEach(pair => {
                otm_array_to_print = otm_array_to_print + `[${pair[0]}-${pair[1]}]`
            })
            otm_array_to_print = otm_array_to_print + ']'

            const expiry = helper.contract_expiry_in_days(itm_symbol)
            const trade_roi = ( total_profit / total_required_margin_to_trade ) * 100

            if (expiry > 30) return

            // ITM Symbol, Future Symbol, Future Price, ITM Floor Price, OTM Floor Price, Total Quantity, Total Expense, Total Profit, Total Required Margin To Trade, Profit In Points, Expiry In Days, Trade ROI, Future Book, ITM Book, OTM Book
            const data_to_log = `${itm_symbol}, ${future_symbol}, ${future_price}, ${itm_floor_price}, ${otm_floor_price}, ${total_quantity}, ${total_expense}, ${total_profit}, ${total_required_margin_to_trade}, ${profit_in_points}, ${expiry}, ${trade_roi}, ${future_price_to_print}, ${itm_array_to_print}, ${otm_array_to_print}\n`
            console.log(data_to_log)

            fs.appendFileSync(opportunity_book_path, data_to_log, { encoding: 'utf-8' })

            global.ONGOING.push(itm_symbol)
            setTimeout(() => {
                global.ONGOING = global.ONGOING.filter(symbol => symbol !== itm_symbol)
            }, 5 * 1000)
        }
    }
}

module.exports = flow_manager
