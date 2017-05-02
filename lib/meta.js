module metadata {
  export class com {
    tojson() {
      return JSON.stringify(this);
    }
    get Name() {
      return this._name;
    }
    set Name(name) {
      this._name = name;
    }
  }

  export class mainentity { }

  export class subentity { }

  export class enumeration { }

  export class property { }

  export class operation { }

  export class statemachine { }

  export class entitystate { }

  export class entitystateparameter { }

}
