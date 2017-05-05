
var meta = require('../lib/meta.js')
// 生成vuejs
function gen(com) {
    if (com == null) com = new meta.com()
    let str = `
            // ${com.main.name}
            // generated on ${new Date().toLocaleString()}
            export class ${com.main.code} {
                `
    com.main.propertylist.forEach((p, index) => {
        str += `  /* ${p.name} */
                set ${p.code}(_${p.code}) {
                    this._${p.code} = _${p.code}
                }
                /* ${p.name} */
                get ${p.code}() {
                    return this._${p.code}
                }
            `
    })
    str += `
            
            constructor() {
                this.data = {
            `;
    com.main.propertylist.forEach((p, index) => {
        if (index == com.main.propertylist.length - 1) str += `${p.code}:''// ${p.name}
                `
        else str += `${p.code}:'',// ${p.name}
`
    })

    str += `}
             this.key = {
`;
    com.main.propertylist.forEach((p, index) => {
        if (index == com.main.propertylist.length - 1) str += `${p.code}:'${p.code}'// ${p.name}
                `
        else str += `${p.code}:'${p.code}',// ${p.name}
`
    })
    str += `}
             this.desc = {
`;
    com.main.propertylist.forEach((p, index) => {
        if (index == com.main.propertylist.length - 1) str += `${p.code}:'${p.name}'// ${p.code}
                `
        else str += `${p.code}:'${p.name}',// ${p.code}
`
    })
    str += `}}
                /**
             * 新增${com.main.name}
             * @returns {Promise}
             */
           static create(data) {
                let data = new window.AV.Object('${com.main.code}');
                let acl = new window.AV.ACL();

                acl.setPublicReadAccess(true);
                acl.setPublicWriteAccess(true);
            `
    com.main.propertylist.forEach(p => {
        str += `${com.main.code}.set('${p.code}', data.${p.code});// ${p.name}
                    `
    })

    str += `   return data.save();
            }

            /**
             * 删除${com.main.name}
             * @param objectId
             */
           static delete(objectId) {
                let ${com.main.code} = window.AV.Object.createWithoutData('${com.main.code}', objectId);
                return ${com.main.code}.destroy();
            }

            /**
             * 更新${com.main.name}
             */
           static update(objectId, changedata) {
                let entity = window.AV.Object.createWithoutData('${com.main.code}', objectId);
                for (let key in entity) {
                    entity.set(key, changedata[key]);
                }

                return entity.save();
            }

            /**
             * 查询${com.main.name}
             * @param objectId
             */
           static query() {
                let query = new window.AV.Query('${com.main.code}');

                return query.find();
            }    
`
    com.statemachine.transitionlist.forEach(t => {
        str += `
/* ${t.name} */
static ${t.code} (id, changedata, callback){
    // todo rpc express api @wyx
    if (!id || !changedata) return console.error('参数错误')
    const data = {
      orderId: id,
      orderChangedata: changedata
    }
    fetch(‘http://localhost:3000/api/${t.code}’, {method: 'POST', body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
      .then(results => {
        return results.json()
      })
      .then(data => {
        callback(data)
      })
  }
`
    })
    str += `
            }
            `;
    com.sublist.forEach((sub) => {
        str += `
            // ${sub.name} 
            export class ${sub.code} 
            {`
        sub.propertylist.forEach((p, index) => {
            str += `  /* ${p.name} */
                            set ${p.code}(_${p.code}) {
                                this._${p.code} = _${p.code}
                            }
                            /* ${p.name} */
                            get ${p.code}() {
                                return this._${p.code}
                            }
                        `
        })
        str += `
            
            constructor() {
                this.data = {
            `;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `${p.code}:''// ${p.name}
                `
            else str += `${p.code}:'',// ${p.name}
`
        })

        str += `}
             this.key = {
`;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `${p.code}:'${p.code}'// ${p.name}
                `
            else str += `${p.code}:'${p.code}',// ${p.name}
`
        })
        str += `}
             this.desc = {
`;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `${p.code}:'${p.name}'// ${p.code}
                `
            else str += `${p.code}:'${p.name}',// ${p.code}
`
        })
        str += `}}}
            `
    })

    return str;
}

module.exports.gen = gen;