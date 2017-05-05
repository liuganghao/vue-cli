function gen(com) {
    let str = `  
            // ${com.main.name}
            // generated on ${new Date().toLocaleString()}
            const AV = require('leancloud-storage')

class ${com.main.code}base 
{
    constructor() 
    {
`
    str += `
    this.state = {
`;
    com.statemachine.statelist.forEach((p, index) => {
        if (index == com.statemachine.statelist.length - 1) str += `${p.code}:${p.val}// ${p.name}
                `
        else str += `${p.code}:${p.val},// ${p.name}
`
    })
    str += ` }
    this.setapp = (app) => {`
    com.statemachine.transitionlist.forEach(t => {
        str += `   
        app.post('/api/${com.main.code}/${t.code}', (req, res, next) => {
            const objectId = req.body.objectid;
            const changedata = req.body.changedata;
            let entity = AV.Object.createWithoutData('${com.main.code}', objectId);
            for (let key in entity) {
            entity.set(key, changedata[key]);
        }
            ${t.code}(entity);
            entity.save()
            .then(result => {
                res.json({
                code: 200,
                message: result
                })
            });
        }); 
`
    })
    str += `}}`
    com.statemachine.transitionlist.forEach(t => {
        str += `
/* ${t.name} */
 ${t.code} (entity)
 {
  entity.set('state', this.state.${t.tostate});
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