function gen(com) {
    let str = `  
             // ${com.main.name}
             // generated on ${new Date().toLocaleString()}
            var AV = require('leanengine')
`
    str += `
    var state = {
`;
    com.statemachine.statelist.forEach((p, index) => {
        if (index == com.statemachine.statelist.length - 1) str += `${p.code}:${p.val} // ${p.name}
                `
        else str += `${p.code}:${p.val}, // ${p.name}
`
    })
    str += `}
class ${com.main.code}base 
{
    /* 保存之前 */
    beforeSave(request) {}
    /* 保存之后 */
    afterSave(request) {
        const roleQuery = new AV.Query(AV.Role);
        roleQuery.equalTo('name', 'admin');
        roleQuery.find()
            .then(adminRole => {
                let roleAcl = new AV.ACL();
                roleAcl.setPublicReadAccess(false);
                roleAcl.setPublicWriteAccess(false);
                roleAcl.setReadAccess(request.currentUser, true);
                roleAcl.setWriteAccess(request.currentUser, true);
                //if (!adminRole) {
                roleAcl.setRoleReadAccess(adminRole[0], true);
                roleAcl.setRoleWriteAccess(adminRole[0], true);
                request.object.setACL(roleAcl);
                //}
                request.object.save();
            });
    }
    /* 更新之前 */
    beforeUpdate(request) {}
    /* 更新之后 */
    afterUpdate(request) {}
    /* 删除之前 */
    beforeDelete(request) {}
    /* 删除之后 */
    afterDelete(request) {}
    `
    com.statemachine.transitionlist.forEach(t => {
        str += `
/* ${t.name} */
 ${t.code} (request, response)
 {
        var changedata = request.params.changedata;
        var entity = AV.Object.createWithoutData('${com.main.code}', request.params.objectId);
        var key = '';
        for (key in changedata) {
            entity.set(key, changedata[key]);
        }
        entity.set('state', state.${t.tostate})
        return entity.save()
            .then(function(result) {
                return response.success(entity.toJSON())
            })
            .catch(function(error) {
                throw new AV.Cloud.Error('请求失败')
            })
  }
`
    })
    str += `
}
module.exports = ${com.main.code}base
            `

    return str
}

module.exports.gen = gen