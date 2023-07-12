
const future_quantity = pair_array => {

    if (pair_array.length > 0) {

        pair_array.forEach(pair => {

            const real_quantity = ( Number(pair[1]) * 100 ) / Number(pair[0])
            pair[0] = Number(pair[0])
            pair[1] = real_quantity
        })
    }

    return pair_array
}

module.exports = future_quantity
