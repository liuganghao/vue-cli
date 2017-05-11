var meta = require('../lib/meta.js')

function gen(com) {
    if (com == null) com = new meta.com()
    let str = `
     // generated on ${new Date().toLocaleString()}
    export class UIModel${com.main.code}{
    constructor() {
                this.data = {
            `;
    com.main.propertylist.forEach((p, index) => {
        if (index == com.main.propertylist.length - 1) str += `${p.code}:'' // ${p.name}
                `
        else str += `${p.code}:'', // ${p.name}
`
    })
    str += `};
             this.state = {
`;
    com.statemachine.statelist.forEach((p, index) => {
        if (index == com.statemachine.statelist.length - 1) str += `${p.code}:${p.val} // ${p.name}
                `
        else str += `${p.code}:${p.val}, // ${p.name}
`
    })
    str += `};
             this.key = {
`;
    com.main.propertylist.forEach((p, index) => {
        if (index == com.main.propertylist.length - 1) str += `${p.code}:'${p.code}' // ${p.name}
                `
        else str += `${p.code}:'${p.code}', // ${p.name}
`
    })
    str += `};
             this.desc = {
`;
    com.main.propertylist.forEach((p, index) => {
        str += `${p.code}:'${p.name}', // ${p.code}
`
    })
    com.statemachine.statelist.forEach((p, index) => {
        if (index == com.statemachine.statelist.length - 1) str += `state_${p.code}:'${p.name}' // val=${p.val}
                `
        else str += `state_${p.code}:'${p.name}', // val=${p.val}
`
    })
    str += `};
}
} 

`
    com.sublist.forEach((sub) => {
        str += `
 export class UIModel${sub.code}{
    constructor() {
        this.data = {
            `;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `       ${p.code}:'' // ${p.name}
                `
            else str += `       ${p.code}:'', // ${p.name}
`
        })
        str += `};
             this.key = {
`;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `      ${p.code}:'${p.code}' // ${p.name}
                `
            else str += `       ${p.code}:'${p.code}', // ${p.name}
`
        })
        str += `};
             this.desc = {
`;
        sub.propertylist.forEach((p, index) => {
            if (index == sub.propertylist.length - 1) str += `      ${p.code}:'${p.name}' // ${p.code}
                `
            else str += `       ${p.code}:'${p.name}', // ${p.code}
`
        })
        str += `};}}`
    });
    com.enumlist.forEach((e) => {
        str += `/** ${e.name} */
    export class Enum${e.code} {
    constructor() {
        this.val = {
            `
        e.literallist.forEach((p, index) => {
            if (index == e.literallist.length - 1) str += `${p.code}:${p.val} // val=${p.name}
                `
            else str += `${p.code}:${p.val}, // val=${p.name}
                `
        })
        str += `};

        this.key = {
            `
        e.literallist.forEach((p, index) => {
            if (index == e.literallist.length - 1) str += `${p.code}:'${p.code}' // val=${p.val} name=${p.name}
                `
            else str += `${p.code}:'${p.code}', // val=${p.val} name=${p.name}
                `
        })
        str += `};

        this.desc = {
            `
        e.literallist.forEach((p, index) => {
            if (index == e.literallist.length - 1) str += `${p.code}:'${p.name}' // val=${p.val}
                `
            else str += `${p.code}:'${p.name}', // val=${p.val}
                `
        })
        str += `};
    }
}
    `
    });

    return str;
}

module.exports.gen = gen;