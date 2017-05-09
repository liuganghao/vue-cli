function gen(com, entity) {
    let str = `  // ${entity.name}
            // generated on ${new Date().toLocaleString()}`

    return str
}

module.exports.gen = gen