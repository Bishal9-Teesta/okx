
const contract_is_call = (contract_symbol) => {

    return contract_symbol.includes("-C")
}

module.exports = contract_is_call
