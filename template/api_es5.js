function gen(com) {
    let str = `  
// ${com.main.name}
// generated on ${new Date().toLocaleString()}
const AV = require('leanengine')
const ${com.main.code.toLowerCase()} = require('./${com.main.code.toLowerCase()}.g')

AV.Cloud.beforeUpdate('Employee', function(request) {
var entity = request.object;
});
  `
    com.statemachine.transitionlist.forEach(t => {
        str += `
/* ${t.name} */
AV.Cloud.define('${com.main.code}_${t.code}', function(request, response) {
    new ${com.main.code.toLowerCase()}().${t.code}(request, response);
});
`
    })
    return str
}

module.exports.gen = gen