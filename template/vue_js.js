var meta = require('../lib/meta.js')
    // 生成vuejs
function gen(com) {
    if (com == null) com = new meta.com()
    let str = `
    // generated on ${new Date().toLocaleString()}
    import ctx from 'common/js/front.context.js'
            /**${com.main.name}*/
            export default class ${com.main.code} {
                `
    com.main.propertylist.forEach((p, index) => {
        str += `  
                /** ${p.name} */
                set ${p.code}(_${p.code}) {this._${p.code} = _${p.code};}
                /** ${p.name} */
                get ${p.code}() {return this._${p.code};}`
    })
    str += `constructor() {
                this.data = {
            `;
    com.main.propertylist.forEach((p, index) => {
        if (index == com.main.propertylist.length - 1) str += `${p.code}:''// ${p.name}
                `
        else str += `${p.code}:'',// ${p.name}
`
    })
    str += `};
             this.state = {
`;
    com.statemachine.statelist.forEach((p, index) => {
        if (index == com.statemachine.statelist.length - 1) str += `${p.code}:${p.val}// ${p.name}
                `
        else str += `${p.code}:${p.val},// ${p.name}
`
    })
    str += `};
             this.key = {
`;
    com.main.propertylist.forEach((p, index) => {
        if (index == com.main.propertylist.length - 1) str += `${p.code}:'${p.code}'// ${p.name}
                `
        else str += `${p.code}:'${p.code}',// ${p.name}
`
    })
    str += `};
             this.desc = {
`;
    com.main.propertylist.forEach((p, index) => {
        str += `${p.code}:'${p.name}',// ${p.code}
`
    })

    com.statemachine.statelist.forEach((p, index) => {
        if (index == com.statemachine.statelist.length - 1) str += `state_${p.code}:'${p.name}'// val=${p.val}
                `
        else str += `state_${p.code}:'${p.name}',// val=${p.val}
`
    })
    str += `};
    }
            /** 新增 */
           static create(data) {
                let entity = new window.AV.Object('${com.main.code}');
                let acl = new window.AV.ACL();

                acl.setPublicReadAccess(true);
                acl.setPublicWriteAccess(true);
            `
    com.main.propertylist.forEach(p => {
        str += `entity.set('${p.code}', data.${p.code});// ${p.name}
                    `
    })

    str += `   return entity.save();
            }

            /** 删除*/
           static delete(objectId) {
                let ${com.main.code} = window.AV.Object.createWithoutData('${com.main.code}', objectId);
                return ${com.main.code}.destroy();
            }

            /** 更新*/
           static update(objectId, changedata) {
                let entity = window.AV.Object.createWithoutData('${com.main.code}', objectId);
                for (let key in entity) {
                    entity.set(key, changedata[key]);
                }

                return entity.save();
            }

           /** 查询*/
           static query() {
                let query = new window.AV.Query('${com.main.code}');

                return query.find();
            }    
`
    com.statemachine.transitionlist.forEach(t => {
        str += `
/* ${t.name} */
static ${t.code} (id, changedata, callback){
    if (!id ) return console.error('参数错误');
    const data = {
      objectid: id,
      changedata: changedata
    };
    fetch(ctx.apiurl+"/${com.main.code}/${t.code}", {method: 'POST', body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
      .then(results => {
        return results.json();
      })
      .then(data => {
        callback(data);
      });
  }
`
    })
    str += `
            }
            `;
    com.sublist.forEach((sub) => {
        str += `
            /** ${sub.name}*/ 
            export class ${sub.code} 
            {`
        sub.propertylist.forEach((p, index) => {
            str += `  
            /* ${p.name} */
            set ${p.code}(_${p.code}) {this._${p.code} = _${p.code};}
            /* ${p.name} */
            get ${p.code}() { return this._${p.code};} `
        })
        str += `constructor() {
                this.data = {
            `;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `${p.code}:''// ${p.name}
                `
            else str += `${p.code}:'',// ${p.name}
`
        })

        str += `};
             this.key = {
`;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `${p.code}:'${p.code}'// ${p.name}
                `
            else str += `${p.code}:'${p.code}',// ${p.name}
`
        })
        str += `};
             this.desc = {
`;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `${p.code}:'${p.name}'// ${p.code}
                `
            else str += `${p.code}:'${p.name}',// ${p.code}
`
        })
        str += `};}}
            `
    })

    return str;
}

module.exports.gen = gen;