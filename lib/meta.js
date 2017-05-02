
class metabase {
  constructor() { }
  get Name() {
    return this._name;
  }
  set Name(name) {
    this._name = name;
  }

}
class mainentity extends metabase {

}
module.exports = class com extends metabase {
  constructor() {
    super();
    this._mainentity = new mainentity();

  }
  tojson() {
    return JSON.stringify(this);
  }

  get mainEntity() {
    return this._mainentity;
  }

}
class subentity extends metabase { }

class enumeration extends metabase { }

class property extends metabase { }

class operation extends metabase { }
class statemachine extends metabase { }

class entitystate extends metabase { }

class entitystateparameter extends metabase { }


