function gen(com) {
    let str = `  
            // ${com.main.name}
            // generated on ${new Date().toLocaleString()}
    const AV = require('leancloud-storage')
    const ${com.main.code}base = require('./${com.main.code}.g')

    class ${com.main.code} extends ${com.main.code}base {
    `
    com.statemachine.transitionlist.forEach(t => {
        str += `
/* ${t.name} */
 ${t.code} (entity)
 {
  }
`
    })
    str += `}
module.exports = ${com.main.code}
            `
    return str
}

module.exports.gen = gen