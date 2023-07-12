const expense = (future_price, itm_price, itm_quantity, otm_price, otm_quantity) => {

    // console.log("\nFuture Price: ", future_price)
    // console.log("ITM Price: ", itm_price)
    // console.log("ITM Quantity: ", itm_quantity)
    // console.log("OTM Price: ", otm_price)
    // console.log("OTM Quantity: ", otm_quantity)

    // ! Future Margin = Future Price X 0.1 ITM Quantity
    const future_margin = future_price * 0.1 * itm_quantity
    // console.log("Future Margin: ", future_margin)

    // ! Option Premium = ITM Price X ITM Quantity
    const option_premium = itm_price * (itm_quantity / 100)
    // console.log("Option Premium: ", option_premium)

    // ! OTM Option Trade Expense = Minimum of ( 0.0003 X Future Price, 0.125 X OTM Price ) X OTM Quantity
    const otm_option_trade_expense = Math.min(0.0003 * future_price, 0.125 * otm_price) * otm_quantity
    // console.log("OTM Option Trade Expense: ", otm_option_trade_expense)

    // ! ITM Option Trade Expense = Minimum of ( 0.0003 X Future Price, 0.125 X ITM Price ) X ITM Quantity
    const itm_option_trade_expense = Math.min(0.0003 * future_price, 0.125 * itm_price) * itm_quantity
    // console.log("ITM Option Trade Expense: ", itm_option_trade_expense)

    // ! Future Trade Expense = Future Price X ITM Quantity X ( 0.0005 + 0.0005 )
    const future_trade_expense = future_price * itm_quantity * (0.0005 + 0.0005)
    // console.log("Future Trade Expense: ", future_trade_expense)

    // ! Exercise Expense = Minimum of ( 0.0002 X Future Price, 0.125 X ITM Price ) X ITM Quantity
    const exercise_expense = Math.min(0.0002 * future_price, 0.125 * itm_price) * itm_quantity
    // console.log("Exercise Expense: ", exercise_expense)

    // ! Total Expense = OTM Option Trade Expense + ITM Option Trade + Future Trade Expense + Exercise Expense
    const total_expense = otm_option_trade_expense + itm_option_trade_expense + future_trade_expense + exercise_expense
    // console.log("Total Expense: ", total_expense)

    // ! Option Sell Margin = 15% of Future Price X OTM Quantity
    const option_sell_margin = future_price * 0.15 * otm_quantity
    // console.log("Option Sell Margin: ", option_sell_margin)

    // ! Required Margin To Trade = Future Margin + Option Sell Margin + Option Premium
    const required_margin_to_trade = future_margin + option_sell_margin + option_premium
    // console.log("Required To Trade: ", required_margin_to_trade)

    return {
        total_expense,
        required_margin_to_trade
    }
}

module.exports = expense
