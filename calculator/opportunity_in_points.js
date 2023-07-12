
const opportunity_in_points = (future_price, itm_price, otm_price, contract_type, strike) => {

    // console.log("Opportunity In Points: ", future_price, itm_price, otm_price, contract_type, strike)

    let reversion_in_points = 0
    let conversion_in_points = 0

    // // TODO: For Testing purpose only
    // future_price = future_price - 0.02

    if (contract_type === "P") {
        reversion_in_points = future_price + itm_price - otm_price - strike
        conversion_in_points = (future_price + itm_price - otm_price - strike) * -1
    } else if (contract_type === "C") {
        reversion_in_points = future_price + otm_price - itm_price - strike
        conversion_in_points = (future_price + otm_price - itm_price - strike) * -1
    }

    // if (contract_type === "C" && reversion_in_points > 0) {
    //     console.log(`Reversion In Points: ${reversion_in_points}`)
    // } else if (contract_type === "P" && conversion_in_points > 0) {
    //     console.log(`Conversion In Points: ${conversion_in_points}`)
    // }

    return {
        reversion_in_points,
        conversion_in_points
    }
}

module.exports = opportunity_in_points
