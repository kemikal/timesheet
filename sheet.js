import Time from "./time.js";

export default class Sheet {
    constructor() {
        this.timeSheet = [this.createGenesisBlock()];
        this.difficulty = 1;
    }

    createGenesisBlock() {
        return new Time({"user": "Genesis", "work": 0});
    }

    getLatestTime() {
        // HÄMTA FÖREGÅENDE TID
        return this.timeSheet[this.timeSheet.length -1];
    }

    async addTime(newTime) {
        // FÅNGA OCH PUSHA IN NYA TIDER
        // SPARA ÄVEN TIDIGARE HASH
        newTime.prevHash = this.getLatestTime().hash;
        // MAJNA
        // HASHA
        newTime.hash = await newTime.calculateHash();
        // PUSHA
        this.timeSheet.push(newTime);
    }

    isChainValid() {
        // VALIDERA VÅR KEDJA
    }
}