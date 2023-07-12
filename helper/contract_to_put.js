
const contract_to_put = (contract_symbol) => {

    return contract_symbol.substring(0, contract_symbol.length - 1) + "P"
}

module.exports = contract_to_put
