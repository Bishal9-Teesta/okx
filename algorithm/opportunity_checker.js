
const helper = require("../helper")
const calculator = require("../calculator")

const opportunity_checker = (itm_symbol, future_array, itm_array, otm_array) => {
    // console.log("Opportunity Checker: ")

    const final = [];

    const strike = helper.contract_strike(itm_symbol)
    const contract_type = helper.contract_type(itm_symbol)

    if (!future_array || !itm_array || !otm_array) return;

    // Maintain the record of remaining quantity
    let future_remaining_quantity = 0;
    let itm_remaining_quantity = 0;
    let otm_remaining_quantity = 0;

    // Book pointer
    let future_pointer = 0,
        itm_pointer = 0,
        otm_pointer = 0;

    let should_continue = true;

    while (should_continue) {
        if (
            (future_pointer >= future_array.length || !future_array[future_pointer]) ||
            (itm_pointer >= itm_array.length || !itm_array[itm_pointer]) ||
            (otm_pointer >= otm_array.length || !otm_array[otm_pointer])
        ) break;

        // Take three variables for each book and convert them to number
        let future_quantity = future_remaining_quantity === 0 ? Number(future_array[future_pointer][1]) : future_remaining_quantity;
        let itm_quantity = itm_remaining_quantity === 0 ? Number(itm_array[itm_pointer][1]) : itm_remaining_quantity;
        let otm_quantity = otm_remaining_quantity === 0 ? Number(otm_array[otm_pointer][1]) : otm_remaining_quantity;

        future_quantity = Number(future_quantity.toFixed(4))
        itm_quantity = Number(itm_quantity.toFixed(4))
        otm_quantity = Number(otm_quantity.toFixed(4))

        // Print the remaining quantity and min qty and price
        let min_qty = helper.smallest_number(future_quantity, itm_quantity, otm_quantity);

        // Calculate and break according to margin check
        const option_symbol_type = helper.contract_type(itm_symbol);
        const future_price = Number(future_array[future_pointer][0]);
        const itm_price = Number(itm_array[itm_pointer][0]);
        const otm_price = Number(otm_array[otm_pointer][0]);

        // console.log("\n\n\nITM Symbol: ", itm_symbol)
        // console.log(`FQ: ${future_quantity} IQ: ${itm_quantity} OQ: ${otm_quantity}`)
        // console.log("Min Quantity: ", min_qty)
        // console.log("Future Price: ", future_price)
        // console.log("ITM Price: ", itm_price)
        // console.log("OTM Price: ", otm_price)
        const { conversion_in_points, reversion_in_points } = calculator.opportunity_in_points(future_price, itm_price, otm_price, contract_type, strike);

        // console.log("Conversion In Points: ", conversion_in_points)
        // console.log("Reversion In Points: ", reversion_in_points)

        if (option_symbol_type === "C" && reversion_in_points < 30) {
            should_continue = false;
            break;
        } else if (option_symbol_type === "P" && conversion_in_points < 30) {
            should_continue = false;
            break;
        }

        // Expense Calculate
        const { total_expense, required_margin_to_trade } = calculator.expense(future_price, itm_price, min_qty, otm_price, min_qty);

        // ! Profit in USDT = Opportunity In Points X Quantity - Expense
        const reversion_profit_in_usdt = (reversion_in_points * min_qty) - total_expense;
        const conversion_profit_in_usdt = (conversion_in_points * min_qty) - total_expense;

        // ! Conversion / Reversion in PerCent after deducting Expense (kinda Trade ROI)
        const reversion_in_percent = reversion_profit_in_usdt / required_margin_to_trade * 100;
        const conversion_in_percent = conversion_profit_in_usdt / required_margin_to_trade * 100;

        final.push({
            future_price: helper.to_decimal(future_array[future_pointer][0], 4),
            itm_option_price: helper.to_decimal(itm_array[itm_pointer][0], 4),
            otm_option_price: helper.to_decimal(otm_array[otm_pointer][0], 4),
            quantity: helper.to_decimal(min_qty, 4),
            total_expense: total_expense,
            required_margin_to_trade: required_margin_to_trade,
            reversion_profit_in_usdt: reversion_profit_in_usdt,
            conversion_profit_in_usdt: conversion_profit_in_usdt,
            reversion_in_percent: reversion_in_percent,
            conversion_in_percent: conversion_in_percent,
            reversion_in_points: reversion_in_points,
            conversion_in_points: conversion_in_points
        });

        // Update the remaining quantity
        future_remaining_quantity = future_quantity - min_qty;
        itm_remaining_quantity = itm_quantity - min_qty;
        otm_remaining_quantity = otm_quantity - min_qty;

        // Update the book pointer
        if (future_remaining_quantity === 0) future_pointer++;
        if (itm_remaining_quantity === 0) itm_pointer++;
        if (otm_remaining_quantity === 0) otm_pointer++;
    }

    // console.log("Final: ", final)
    return final;
}

module.exports = opportunity_checker
