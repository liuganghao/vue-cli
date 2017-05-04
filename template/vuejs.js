// 生成vuejs
function gen_vuejs(com) {
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
            create(data) {
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
            delete${com.main.code}(objectId) {
                let ${com.main.code} = window.AV.Object.createWithoutData('${com.main.code}', objectId);
                return ${com.main.code}.destroy();
            }

            /**
             * 更新${com.main.name}
             */
            update(objectId, changedata) {
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
            query${com.main.code}() {
                let query = new window.AV.Query('${com.main.code}');

                return query.find();
            }    
                
            }
            `;
    return str;
}

module.exports.gen_vuejs = gen_vuejs;