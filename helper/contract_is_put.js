
const contract_is_put = (contract_symbol) => {

    return contract_symbol.includes("-P")
}

module.exports = contract_is_put
