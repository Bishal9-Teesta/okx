
const calculator = require("../calculator")

const book_maintainer = (local_book, new_book) => {
    // let p = performance.now();
    let maintainable_book = {
        a: new Array(400),
        b: new Array(400)
    }

    let bid_order = 'DESC';
    // first check book bid order is correct or not
    if ((new_book.b.length) > 1 && Number(new_book.b[0][0]) > Number(new_book.b[1][0])) {
        bid_order = 'DESC'
    } else {
        bid_order = 'ASC'
    }

    if (bid_order === 'DESC') {
        let local_ask_pointer = 0, local_bid_pointer = 0, new_ask_pointer = 0, new_bid_pointer = 0;
        let ask_insert = 0, bid_insert = 0;
        for (let cursor = 0; cursor < 400; cursor++) {
            let local_ask_price = Number(local_book?.a?.[local_ask_pointer]?.[0]);
            let local_bid_price = Number(local_book?.b?.[local_bid_pointer]?.[0]);
            let new_ask_price = Number(new_book.a?.[new_ask_pointer]?.[0]);
            let new_bid_price = Number(new_book.b?.[new_bid_pointer]?.[0]);

            let local_ask_quantity = Number(local_book.a?.[local_ask_pointer]?.[1] || 0);
            let local_bid_quantity = Number(local_book.b?.[local_bid_pointer]?.[1] || 0);
            let new_ask_quantity = Number(new_book.a?.[new_ask_pointer]?.[1] || 0);
            let new_bid_quantity = Number(new_book.b?.[new_bid_pointer]?.[1] || 0);

            let ask_consider = true, bid_consider = true;

            // Ask section
            /* This code block is comparing the prices and quantities of the asks in the `local_book` and
            `new_book` objects to determine which asks should be included in the updated order book. */
            if (new_ask_price < local_ask_price) {
                ask_consider = false;
                if (new_ask_quantity > 0) {
                    maintainable_book.a[ask_insert] = [new_ask_price, new_ask_quantity];
                    ask_insert++;
                }
                new_ask_pointer++;
            }
            else if (local_ask_price < new_ask_price) {
                ask_consider = false;
                if (local_ask_quantity > 0) {
                    maintainable_book.a[ask_insert] = [local_ask_price, local_ask_quantity];
                    ask_insert++;
                }
                local_ask_pointer++;
            }
            else if (local_ask_price === new_ask_price) {
                ask_consider = false;
                if (new_ask_quantity > 0) {
                    maintainable_book.a[ask_insert] = [new_ask_price, new_ask_quantity];
                    ask_insert++;
                }
                new_ask_pointer++;
                local_ask_pointer++;
            }
            else if (ask_consider && local_ask_price && local_ask_quantity > 0) {
                maintainable_book.a[ask_insert] = [local_ask_price, local_ask_quantity];
                ask_insert++;
                local_ask_pointer++;
            }
            else if (ask_consider && new_ask_price && new_ask_quantity > 0) {
                maintainable_book.a[ask_insert] = [new_ask_price, new_ask_quantity];
                ask_insert++;
                new_ask_pointer++;
            }

            // Bid section
            /* This code block is comparing the prices and quantities of the b in the `local_book` and
            `new_book` objects to determine which b should be included in the updated order book. */

            if (new_bid_price > local_bid_price) {
                bid_consider = false;
                if (new_bid_quantity > 0) {
                    maintainable_book.b[bid_insert] = [new_bid_price, new_bid_quantity];
                    bid_insert++;
                }
                new_bid_pointer++;
            }
            else if (local_bid_price > new_bid_price) {
                bid_consider = false;
                if (local_bid_quantity > 0) {
                    maintainable_book.b[bid_insert] = [local_bid_price, local_bid_quantity];
                    bid_insert++;
                }
                local_bid_pointer++;
            }
            else if (local_bid_price === new_bid_price) {
                bid_consider = false;
                if (new_bid_quantity > 0) {
                    maintainable_book.b[bid_insert] = [new_bid_price, new_bid_quantity];
                    bid_insert++;
                }
                new_bid_pointer++;
                local_bid_pointer++;
            }
            else if (bid_consider && local_bid_price && local_bid_quantity > 0) {
                maintainable_book.b[bid_insert] = [local_bid_price, local_bid_quantity];
                bid_insert++;
                local_bid_pointer++;
            }
            else if (bid_consider && new_bid_price && new_bid_quantity > 0) {
                maintainable_book.b[bid_insert] = [new_bid_price, new_bid_quantity];
                bid_insert++;
                new_bid_pointer++;
            }
        }
    } else {
        let local_ask_pointer = 0, local_bid_pointer = 0, new_ask_pointer = 0, new_bid_pointer = new_book.b.length - 1;
        let ask_insert = 0, bid_insert = 0;
        for (let cursor = 0; cursor < 400; cursor++) {
            let local_ask_price = Number(local_book?.a?.[local_ask_pointer]?.[0]);
            let local_bid_price = Number(local_book?.b?.[local_bid_pointer]?.[0]);
            let new_ask_price = Number(new_book.a?.[new_ask_pointer]?.[0]);
            let new_bid_price = Number(new_book.b?.[new_bid_pointer]?.[0]);

            let local_ask_quantity = Number(local_book.a?.[local_ask_pointer]?.[1] || 0);
            let local_bid_quantity = Number(local_book.b?.[local_bid_pointer]?.[1] || 0);
            let new_ask_quantity = Number(new_book.a?.[new_ask_pointer]?.[1] || 0);
            let new_bid_quantity = Number(new_book.b?.[new_bid_pointer]?.[1] || 0);

            let ask_consider = true, bid_consider = true;

            // Ask section
            /* This code block is comparing the prices and quantities of the asks in the `local_book` and
            `new_book` objects to determine which asks should be included in the updated order book. */
            if (new_ask_price < local_ask_price) {
                ask_consider = false;
                if (new_ask_quantity > 0) {
                    maintainable_book.a[ask_insert] = [new_ask_price, new_ask_quantity];
                    ask_insert++;
                }
                new_ask_pointer++;
            }
            else if (local_ask_price < new_ask_price) {
                ask_consider = false;
                if (local_ask_quantity > 0) {
                    maintainable_book.a[ask_insert] = [local_ask_price, local_ask_quantity];
                    ask_insert++;
                }
                local_ask_pointer++;
            }
            else if (local_ask_price === new_ask_price) {
                ask_consider = false;
                if (new_ask_quantity > 0) {
                    maintainable_book.a[ask_insert] = [new_ask_price, new_ask_quantity];
                    ask_insert++;
                }
                new_ask_pointer++;
                local_ask_pointer++;
            }
            else if (ask_consider && local_ask_price && local_ask_quantity > 0) {
                maintainable_book.a[ask_insert] = [local_ask_price, local_ask_quantity];
                ask_insert++;
                local_ask_pointer++;
            }
            else if (ask_consider && new_ask_price && new_ask_quantity > 0) {
                maintainable_book.a[ask_insert] = [new_ask_price, new_ask_quantity];
                ask_insert++;
                new_ask_pointer++;
            }

            // Bid section
            /* This code block is comparing the prices and quantities of the b in the `local_book` and
            `new_book` objects to determine which b should be included in the updated order book. */
            if (new_bid_price > local_bid_price) {
                bid_consider = false;
                if (new_bid_quantity > 0) {
                    maintainable_book.b[bid_insert] = [new_bid_price, new_bid_quantity];
                    bid_insert++;
                }
                new_bid_pointer--;
            }
            else if (local_bid_price > new_bid_price) {
                bid_consider = false;
                if (local_bid_quantity > 0) {
                    maintainable_book.b[bid_insert] = [local_bid_price, local_bid_quantity];
                    bid_insert++;
                }
                local_bid_pointer++;
            }
            else if (local_bid_price === new_bid_price) {
                bid_consider = false;
                if (new_bid_quantity > 0) {
                    maintainable_book.b[bid_insert] = [new_bid_price, new_bid_quantity];
                    bid_insert++;
                }
                new_bid_pointer--;
                local_bid_pointer++;
            }
            else if (bid_consider && local_bid_price && local_bid_quantity > 0) {
                maintainable_book.b[bid_insert] = [local_bid_price, local_bid_quantity];
                bid_insert++;
                local_bid_pointer++;
            }
            else if (bid_consider && new_bid_price && new_bid_quantity > 0) {
                maintainable_book.b[bid_insert] = [new_bid_price, new_bid_quantity];
                bid_insert++;
                new_bid_pointer--;
            }
        }
    }

    // TODO: Remove for book5
    // const ask = calculator.future_quantity(maintainable_book.a)
    // const bid = calculator.future_quantity(maintainable_book.b)
    // maintainable_book = {
    //     a: ask,
    //     b: bid
    // }

    // // TODO: For Testing purpose
    // const zero_checker = require("../zero_quantity_checker")
    // if (zero_checker(maintainable_book.a) === false) {
    //     console.log("\nCannot accept this...")
    //     console.log("Old: ", local_book.a)
    //     console.log("New: ", new_book.a)
    // }
    // if (zero_checker(maintainable_book.b) === false) {
    //     console.log("\nCannot accept this...")
    //     console.log("Old: ", local_book.b)
    //     console.log("New: ", new_book.b)
    // }

    return maintainable_book;
}

module.exports = book_maintainer
