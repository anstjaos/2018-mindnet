import * as CryptoJS from 'crypto-js';

export class Crypto {
    private static _key: string = 'gooddonghwan';

    constructor() { }

    static encryption(message: string) {
        var ciphertext = CryptoJS.AES.encrypt(message, this._key);
        
        return ciphertext.toString();
    }

    static decryption(message: string) {
        var bytes = CryptoJS.AES.decrypt(message, this._key);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);

        return plaintext;
    }
}