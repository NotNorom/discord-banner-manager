export default class Image {
    private _url: string;
    private _description: string;
    private _created: Date;
    private _lastModified: Date;

    constructor(url: string, description?: string) {
        this._url = url;
        this._description = description;
        this._created = new Date();
        this._lastModified = this._created;
    }

    public get CreatedAt() {
        return this._created;
    }

    public get ModifiedAt() {
        return this._lastModified;
    }

    public set Url(url: string) {
        this._url = url;
        this._lastModified = new Date();
    }

    public get Url() {
        return this._url;
    }

    public set Description(description: string) {
        this._description = description;
        this._lastModified = new Date();
    }

    public get Description() {
        return this._description;
    }
}