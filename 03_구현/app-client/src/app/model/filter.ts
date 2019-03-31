import { Crypto } from './crypto';

const authorization = 'gooddonghwan';

export class Filter {
    private query: Array<Element>;
    private fields: Array<Element>;

    constructor() {
        this.query = new Array<Element>();
        this.fields = new Array<Element>();
    }

    addQueryElement(key: string, value: string, option?: string) {
        this.query.push(new Element(key, value, option));
    }

    addFieldElement(key: string, value: string) {
        this.fields.push(new Element(key, value));
    }

    toString() {
        let str: string;

        str = `?auth=${Crypto.encryption(authorization)}`;
        if (this.query.length > 0) {
            str += '&query=';
            this.query.forEach(element => {
                if (element.option != null)
                    str += `${element.key}:${element.value}:${element.option}|`
                else
                    str += `${element.key}:${element.value}|`;
            });

            str = str.substr(0, str.length - 1);
        }

        if (this.fields.length > 0) {
            str += '&fields=';
            this.fields.forEach(element => {
                str += `${element.key}:${element.value}|`;
            });

            str = str.substring(0, str.length - 1);
        }

        return str;
    }
}

class Element {
    key: string;
    value: string;
    option: string;

    constructor(key: string, value: string, option?: string) {
        this.key = key
        this.value = value;
        this.option = option;
    }
}