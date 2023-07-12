
const contract_to_call = (contract_symbol) => {

    return contract_symbol.substring(0, contract_symbol.length - 1) + "C"
}

module.exports = contract_to_call
