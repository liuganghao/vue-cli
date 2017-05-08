function gen(com) {
    let str = `  
    // ${com.main.name}
    // generated on ${new Date().toLocaleString()}
    var AV = require('leanengine')
    var ${com.main.code}base = require('./${com.main.code.toLowerCase()}.g')

    class ${com.main.code} extends ${com.main.code}base {
        // 不能加构造方法
    `
    com.statemachine.transitionlist.forEach(t => {
        str += `
/* ${t.name} */
/* ${t.code} (request, response)
 {
      return super.passed(request, response);
  }
*/`
    })
    str += `}
module.exports = ${com.main.code}
            `
    return str
}

module.exports.gen = gen