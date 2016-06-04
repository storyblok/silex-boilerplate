export class Service {
    static _instance: Service;
    
    static getInstance(): Service {
        if(!(this._instance instanceof Service)) {
            this._instance = new this();
        }
        return this._instance;
    }
    
    static inject(): Service {
        return this.getInstance();
    }
}