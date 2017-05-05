class metabase {
    constructor() {}
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get code() {
        return this._code;
    }
    set code(code) {
        this._code = code;
    }

    get index() {
        return this._index;
    }
    set index(index) {
        this._index = index;
    }
}

class mainentity extends metabase {
    constructor() {
        super();
        this._propertylist = new Array();
    }
    get propertylist() { return this._propertylist; }
}
class com extends metabase {
    constructor() {
        super();
        this._mainentity = new mainentity();
        this._subentitylist = new Array();
        this._enumlist = new Array();
        this._statemachine = new statemachine();
    }
    tojson() {
        return JSON.stringify(this);
    }
    get main() {
        return this._mainentity;
    }
    get statemachine() {
        return this._statemachine;
    }
    get sublist() {
        return this._subentitylist
    }
    get enumlist() {
        return this._enumlist
    }
}

class subentity extends metabase {
    constructor() {
        super();
        this._propertylist = new Array();
    }
    get propertylist() { return this._propertylist; }
}
class enumeration extends metabase {
    constructor() {
        super();
        this._literallist = new Array();
    }
    get literallist() { return this._literallist; }
}

class literal extends metabase {

}
class property extends metabase {

}
class statemachine extends metabase {
    // get startstate() { return this._startstate }
    // set startstate(_startstate) { this._startstate = _startstate }
    // get endstate() { return this._endstate }
    // set endstate(_endstate) { this._endstate = _endstate }
    constructor() {
        super();
        this._statelist = new Array();
        this._transitionlist = new Array();
    }
    get statelist() { return this._statelist; }

    get transitionlist() { return this._transitionlist; }
}
class state extends metabase {
    get val() {
        return this._val;
    }
    set val(val) {
        this._val = val;
    }
}
class transition extends metabase {
    get fromstate() { return this._fromstate }
    set fromstate(_fromstate) { this._fromstate = _fromstate }
    get tostate() { return this._tostate }
    set tostate(_tostate) { this._tostate = _tostate }
}

module.exports.mainentity = mainentity;
module.exports.com = com;
module.exports.subentity = subentity;
module.exports.enumeration = enumeration

module.exports.property = property

module.exports.statemachine = statemachine

module.exports.state = state

module.exports.transition = transition