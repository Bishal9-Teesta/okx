// /api/v5/public/instruments
const { public_instance } = require("../config")


const get_instruments = async () => {

    let response = undefined

    await public_instance
        .get("/api/v5/public/instruments?instType=SWAP")
        .then(_response => {
            // console.log("Get Future Instruments: ", _response.data)
            response = _response.data
        })
        .catch(_error => {
            const message = _error.response.data.msg ? _error.response.data.msg : _error.message
            console.log("Get Future Instruments: ", message)
        })

    return response
}

module.exports = get_instruments
