const logger = (msg) => {

    let date = new Date();
    let timeStamp =
        String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() + 1).padStart(2, '0') + "/" + date.getFullYear() + " " +
        String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0')

    console.log(`[${timeStamp}] ${msg}`)
}

module.exports = { logger };