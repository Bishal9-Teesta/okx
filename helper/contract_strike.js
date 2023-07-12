
const contract_strike = option_symbol => {

    return Number(option_symbol.split("-")[3])
}

module.exports = contract_strike
