function gen(com) {
    let str = `  // ${com.main.name}
            // generated on ${new Date().toLocaleString()}`

    return str
}

module.exports.gen = gen