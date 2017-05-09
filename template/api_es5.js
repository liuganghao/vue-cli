function gen(com) {
    let str = `  
// ${com.main.name}
// generated on ${new Date().toLocaleString()}
var AV = require('leanengine')
var ${com.main.code.toLowerCase()} = require('./${com.main.code.toLowerCase()}.ex')

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