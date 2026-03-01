// Certificate model definition

class Certificate {
    constructor(name, issuedBy, dateIssued) {
        this.name = name;
        this.issuedBy = issuedBy;
        this.dateIssued = dateIssued;
    }

    display() {
        return `Certificate of ${this.name} issued by ${this.issuedBy} on ${this.dateIssued}`;
    }
}

module.exports = Certificate;