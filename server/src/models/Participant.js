// Participant model

class Participant {
    constructor(name, email, certificateId) {
        this.name = name;
        this.email = email;
        this.certificateId = certificateId;
    }

    // Method to display participant information
    displayInfo() {
        return `Name: ${this.name}, Email: ${this.email}, Certificate ID: ${this.certificateId}`;
    }
}

module.exports = Participant;