function gen(com) {
    let str = `  
// ${com.main.name}
// generated on ${new Date().toLocaleString()}
var AV = require('leanengine')
var ${com.main.code.toLowerCase()} = require('./${com.code.toLowerCase()}.ex')

/* 保存之前 */
AV.Cloud.beforeSave('${com.main.code}', function(request) {
    new ${com.main.code.toLowerCase()}().beforeSave(request);
});

/* 保存之后 */
AV.Cloud.afterSave('${com.main.code}', function(request) {
    new ${com.main.code.toLowerCase()}().afterSave(request);
});

/* 更新之前 */
AV.Cloud.beforeUpdate('${com.main.code}', function(request) {
    new ${com.main.code.toLowerCase()}().beforeUpdate(request);
});

/* 更新之后 */
AV.Cloud.afterUpdate('${com.main.code}', function(request) {
    new ${com.main.code.toLowerCase()}().afterUpdate(request);
});

/* 删除之前 */
AV.Cloud.beforeDelete('${com.main.code}', function(request) {
    new ${com.main.code.toLowerCase()}().beforeDelete(request);
});

/* 删除之后 */
AV.Cloud.afterDelete('${com.main.code}', function(request) {
    new ${com.main.code.toLowerCase()}().afterDelete(request);
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