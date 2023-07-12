const zero_quantity_checker = book => {

    let should_consider = true
    if (book.length > 0) {

        book.forEach(pq_pair => {
            iterated = true
            if (Number(pq_pair[0]) !== 0 && Number(pq_pair[1]) !== 0 && should_consider === true) {
                should_consider = true
            } else {
                should_consider = false
            }
        })
    }

    return should_consider
}

// const a = [
//     ["0.0", "90.0"],
//     ["8.0", "70.0"],
// ]

// console.log("Should Consider: ", zero_quantity_checker(a))

module.exports = zero_quantity_checker
