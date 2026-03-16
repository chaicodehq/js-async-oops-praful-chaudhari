/**
 * 🏰 Purani Haveli ka Security System - Encapsulation: Private Fields (#)
 *
 * Purani haveli mein ek advanced security system lagana hai! Private fields
 * (#) se sensitive data protect karo — passcode, residents list, aur access
 * log ko bahar se koi directly access nahi kar sakta. Sirf authorized methods
 * se hi data milega, aur woh bhi passcode verify karke.
 *
 * Class: HaveliSecurity
 *
 *   Private Fields:
 *     #passcode    - Haveli ka secret passcode (string)
 *     #residents   - Array of resident objects
 *     #accessLog   - Array of access entry objects
 *     #maxResidents - Maximum number of residents allowed
 *
 *   constructor(haveliName, passcode, maxResidents)
 *     - this.haveliName = haveliName (public)
 *     - this.#passcode = passcode
 *     - this.#residents = []
 *     - this.#accessLog = []
 *     - this.#maxResidents = maxResidents
 *
 *   addResident(name, role, passcode)
 *     - Only works if passcode matches this.#passcode
 *     - role must be one of: "malik", "naukar", "mehmaan"
 *     - Agar passcode wrong: return { success: false, message: "Galat passcode!" }
 *     - Agar role invalid: return { success: false, message: "Invalid role!" }
 *     - Agar name already exists in #residents: return { success: false, message: "Already a resident!" }
 *     - Agar #residents.length >= #maxResidents: return { success: false, message: "Haveli full hai!" }
 *     - Otherwise: push { name, role, addedAt: new Date().toISOString() } to #residents
 *     - Returns { success: true, message: "${name} ab haveli ka ${role} hai!" }
 *
 *   removeResident(name, passcode)
 *     - Only works if passcode matches
 *     - Removes resident by name from #residents
 *     - Agar passcode wrong: return { success: false, message: "Galat passcode!" }
 *     - Agar resident not found: return { success: false, message: "Resident nahi mila!" }
 *     - Returns { success: true, message: "${name} ko haveli se nikal diya!" }
 *
 *   verifyAccess(name)
 *     - Checks if name is in #residents
 *     - If yes: logs { name, time: new Date().toISOString(), allowed: true } to #accessLog
 *       Returns { allowed: true, message: "Swagat hai ${name}!" }
 *     - If no: logs { name, time: new Date().toISOString(), allowed: false } to #accessLog
 *       Returns { allowed: false, message: "Aapka entry allowed nahi hai!" }
 *
 *   getAccessLog(passcode)
 *     - Returns COPY of #accessLog if passcode matches
 *     - Returns null if passcode is wrong
 *
 *   changePasscode(oldPasscode, newPasscode)
 *     - Validates oldPasscode matches current #passcode
 *     - newPasscode must be at least 4 characters
 *     - If old wrong: return { success: false, message: "Purana passcode galat hai!" }
 *     - If new too short: return { success: false, message: "Naya passcode bahut chhota hai!" }
 *     - Updates #passcode, returns { success: true, message: "Passcode badal diya!" }
 *
 *   getResidentCount()
 *     - Returns number of residents (without exposing the list)
 *
 *   isResident(name)
 *     - Returns true/false if name is in #residents
 *     - Does NOT expose any other resident details
 *
 * Rules:
 *   - ALL sensitive data must use # private fields
 *   - Private fields should NOT be accessible from outside the class
 *   - getAccessLog returns a copy, not the original array
 *   - Passcode is required for any write operation on residents
 *   - verifyAccess does NOT require passcode (it's like checking at the gate)
 *   - Roles are case-sensitive: exactly "malik", "naukar", "mehmaan"
 *
 * @example
 *   const haveli = new HaveliSecurity("Sheesh Mahal", "raja1234", 5);
 *   haveli.addResident("Thakur Sahab", "malik", "raja1234");
 *   // => { success: true, message: "Thakur Sahab ab haveli ka malik hai!" }
 *   haveli.addResident("Ramu", "naukar", "wrongpass");
 *   // => { success: false, message: "Galat passcode!" }
 *   haveli.verifyAccess("Thakur Sahab");
 *   // => { allowed: true, message: "Swagat hai Thakur Sahab!" }
 *   haveli.verifyAccess("Chor");
 *   // => { allowed: false, message: "Aapka entry allowed nahi hai!" }
 *   haveli.getResidentCount();  // => 1
 *   haveli.isResident("Thakur Sahab");  // => true
 *   haveli.#passcode;  // SyntaxError! Private field not accessible
 */
export class HaveliSecurity {
    #passcode;
    #residents;
    #accessLog;
    #maxResidents;

    constructor(haveliName, passcode, maxResidents) {
        // Your code here

        this.haveliName = haveliName;
        this.#passcode = passcode;
        this.#residents = [];
        this.#accessLog = [];
        this.#maxResidents = maxResidents;
    }

    addResident(name, role, passcode) {
        // Your code here

        const roles = ["malik", "naukar", "mehmaan"];

        let success = false;
        let message = "";

        if (!(this.#passcode === passcode)) {
            message = "Galat passcode!";
            return { success, message };
        }

        if (!roles.includes(role)) {
            message = "Invalid role!";
            return { success, message };
        }

        const nameExists = this.#residents.find(
            (resident) => resident.name === name,
        );
        if (nameExists) {
            message = "Already a resident!";
            return { success, message };
        }

        if (this.#residents.length >= this.#maxResidents) {
            message = "Haveli full hai!";
            return { success, message };
        }

        this.#residents.push({ name, role, addedAt: new Date().toISOString() });
        success = true;
        message = `${name} ab haveli ka ${role} hai!`;
        return { success, message };
    }

    removeResident(name, passcode) {
        // Your code here

        let success = false;
        let message = "";

        if (!(this.#passcode === passcode)) {
            message = "Galat passcode!";
            return { success, message };
        }

        const residentIndex = this.#residents.findIndex(
            (resident) => resident.name === name,
        );
        if (residentIndex === -1) {
            message = "Resident nahi mila!";
            return { success, message };
        }

        this.#residents.splice(residentIndex, 1);
        success = true;
        message = `${name} ko haveli se nikal diya!`;
        return { success, message };
    }

    verifyAccess(name) {
        // Your code here

        const isResident = this.#residents.find(
            (resident) => resident.name === name,
        );
        if (!isResident) {
            this.#accessLog.push({
                name,
                time: new Date().toISOString(),
                allowed: false,
            });
            return {
                allowed: false,
                message: `Aapka entry allowed nahi hai!`,
            };
        }
        this.#accessLog.push({
            name,
            time: new Date().toISOString(),
            allowed: true,
        });

        return {
            allowed: true,
            message: `Swagat hai ${name}!`,
        };
    }

    getAccessLog(passcode) {
        // Your code here
        if (!(this.#passcode === passcode)) return null;

        return [...this.#accessLog];
    }

    changePasscode(oldPasscode, newPasscode) {
        // Your code here

        let success = false;
        let message = "";

        if (this.#passcode !== oldPasscode) {
            message = "Purana passcode galat hai!";
            return { success, message };
        }

        if (newPasscode.length < 4) {
            message = "Naya passcode bahut chhota hai!";
            return { success, message };
        }

        this.#passcode = newPasscode;
        success = true;
        message = "Passcode badal diya!";

        return { success, message };
    }

    getResidentCount() {
        // Your code here
        return this.#residents.length;
    }

    isResident(name) {
        // Your code here
        const isResident = this.#residents.findIndex(
            (res) => res.name === name,
        );
        if (isResident === -1) return false;

        return true;
    }
}
