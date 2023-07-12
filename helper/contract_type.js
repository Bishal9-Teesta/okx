
const contract_type = option_symbol => {

    return option_symbol.split("-")[4]
}

module.exports = contract_type
