function gen(com) {
    let str = `  
// ${com.main.name}
// generated on ${new Date().toLocaleString()}
var AV = require('leanengine')
var ${com.main.code}base = require('./${com.code.toLowerCase()}.g')

class ${com.main.code} extends ${com.main.code}base 
{
    // 不能加构造方法
    
    /* 保存之前 */
    beforeSave(request) { return super.beforeSave(request); }
    /* 保存之后 */
    afterSave(request) { return super.afterSave(request); }
    /* 更新之前 */
    beforeUpdate(request) { return super.beforeUpdate(request); }
    /* 更新之后 */
    afterUpdate(request) { return super.afterUpdate(request); }
    /* 删除之前 */
    beforeDelete(request) { return super.beforeDelete(request); }
    /* 删除之后 */
    afterDelete(request) { return super.afterDelete(request); }
`
    com.statemachine.transitionlist.forEach(t => {
        str += `
    /* ${t.name} */
    ${t.code} (request, response)
    {
        return super.passed(request, response);
    }
`
    })
    str += `}
module.exports = ${com.main.code}
            `
    return str
}

module.exports.gen = gen