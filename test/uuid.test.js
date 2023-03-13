const uuid = require('../helpers/uuid');

describe("uuid", () => {
    it("should return a 4-character ID that contains numbers 0-9 and letters a-f", () => {
        // Length should be 4 characters
        expect(uuid().length).toBe(4); 
        // Characters g-z should not be used
        expect(uuid()).not.toMatch(/g-z/);
        // Characters a-f and 0-9 must be used
        expect(uuid()).toMatch(/[a-f0-9]/);
    }) 
})