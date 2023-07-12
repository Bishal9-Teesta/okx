const contract_expiry_in_days = symbol => {

    let result = undefined

    if (typeof symbol === "string" && symbol.search("-") === 3) {
        
        const expiry = symbol.split("-")[2]

        const y = 20 + expiry.substring(0, 2)
        const m = parseFloat(expiry.substring(2, 4)) - 1
        const d = expiry.substring(4, 6)

        const expiryDate = new Date(y, m, d, "13", "30", "00")
        const differenceInDays = (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)

        result = Number(differenceInDays.toFixed(2))
    }

    return result
}

module.exports = contract_expiry_in_days
