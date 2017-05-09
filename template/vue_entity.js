var meta = require('../lib/meta.js')
// 生成vuejs
function gen(com) {
    if (com == null) com = new meta.com()
    let str = `
     // generated on ${new Date().toLocaleString()}
    import ctx from '../../common/js/front.context.js';
    /** ${com.main.name} */
    export default class ${com.main.code} {
        constructor(){`
        com.sublist.forEach((sub)=>{
        str+= `
        this._${sub.code.toLowerCase()}list = new Array();`
        })
    str+=`
        }`
  com.sublist.forEach((p)=>{
        str+= `
        /** ${p.name} */
        get ${p.code.toLowerCase()}list() {return this._${p.code.toLowerCase()}list;}`
        })
    com.main.propertylist.forEach((p, index) => {
        str += `  
        /** ${p.name} */
        set ${p.code}(_${p.code}) {this._${p.code} = _${p.code};}
        /** ${p.name} */
        get ${p.code}() {return this._${p.code};}`
    })
    str += `
        /** 新增 */
    static create(changedata) {
        let entity = new window.AV.Object('${com.main.code}');
        for (let key in entity) {
        entity.set(key, changedata[key]);
        }
        return entity.save();
    }

    /** 删除 */
    static delete(objectId) {
        let ${com.main.code} = window.AV.Object.createWithoutData('${com.main.code}', objectId);
        return ${com.main.code}.destroy();
    }

    /** 更新 */
    static update(objectId, changedata) {
        let entity = window.AV.Object.createWithoutData('${com.main.code}', objectId);
        for (let key in entity) {
            entity.set(key, changedata[key]);
        }

        return entity.save();
    }

    /** 查询 */
    static query() {
        let query = new window.AV.Query('${com.main.code}');

        return query.find();
    }
    static getbyid(id){

    }
`
    com.statemachine.transitionlist.forEach(t => {
        str += `
    /** ${t.name} */
    static ${t.code} (id, changedata){
    if (!id) return console.error('参数错误')
        return window.AV.Cloud.run('${com.main.code}_${t.code}', changedata);
    }
`
    })
    str += `
            }
            `;
    com.sublist.forEach((sub) => {
        str += `
            /** ${sub.name} */ 
            export class ${sub.code} 
            {`
        sub.propertylist.forEach((p, index) => {
            str += `  
            /* ${p.name} */
            set ${p.code}(_${p.code}) {this._${p.code} = _${p.code};}
            /* ${p.name} */
            get ${p.code}() { return this._${p.code};} `
        })
       
        str += `}
        `
    })
    

    return str;
}

module.exports.gen = gen;