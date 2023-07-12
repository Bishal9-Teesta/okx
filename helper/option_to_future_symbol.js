
const option_to_future_symbol = option_symbol => {

    return option_symbol.split("-")[0] + "-USD-SWAP"
}

module.exports = option_to_future_symbol
