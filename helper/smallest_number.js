const smallest_number = (one, two, three) => {
    if (one <= two && one <= three) {
        return one
    } else if (two <= one && two <= three) {
        return two
    } else {
        return three
    }
}

module.exports = smallest_number
