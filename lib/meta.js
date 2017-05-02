export default  class com {
  constructor() {
    _mainentity = new mainentity();

  }
  tojson() {
    return JSON.stringify(this);
  }
  get Name() {
    return this._name;
  }
  set Name(name) {
    this._name = name;
  }
  get mainEntity() {
    return this._mainentity;
  }

}
class mainentity {
  get Name() {
    return this._name;
  }
  set Name(name) {
    this._name = name;
  }

}

//  class subentity { }

//  class enumeration { }

// export class property { }

// export class operation { }

// export class statemachine { }

// export class entitystate { }

// export class entitystateparameter { }


