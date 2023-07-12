const to_decimal = (number, to_digits) => {

    return Number(Number(number).toFixed(to_digits))
}

module.exports = to_decimal
