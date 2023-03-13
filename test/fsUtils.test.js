const fs = require('fs');
const util = require('util');
const { readFromFile, writeToFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

jest.mock('fs');

describe("readFromFile", () => {
    it("should call fs.readFile once", () => {
        const fileName = "notes_db.json";

        readFromFile(fileName);

        expect(fs.readFileSync).toHaveBeenCalled();
    });
});

describe("writeToFile", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("should convert the content argument into JSON and write it to a file", () => {
        const destination = "../db"
        const content = {
            "noteTitle": "Hello World",
            "noteText": "This is a note for the world",
            "noteId": "9af8"
        };

        writeToFile(destination, content);

        expect(fs.writeFile).toBeCalledWith(destination, JSON.stringify(content, null, 4), expect.any(Function));
    });
});

describe("readAndAppend", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("should add the content argument into the JSON object called data, then write it to a file", () => {
        const fileName = "notes_db.json";
        const content = [{
            "noteTitle": "Hello World",
            "noteText": "This is a note for the world",
            "noteId": "9af8"
        },
        {
            "noteTitle": "Hello Underworld",
            "noteText": "This is a note for the underworld",
            "noteId": "666ad"
        }];
        const originalContentsOfFile = [{
            "noteTitle": "Goodbye World",
            "noteText": "This is a goodbye note for the world",
            "noteId": "6e82"
        }]

        fs.readFileSync.mockReturnValue(JSON.stringify(originalContentsOfFile));

        readAndAppend(content, fileName);

        expect(fs.readFileSync).toHaveBeenCalledWith(fileName, 'utf-8');
        originalContentsOfFile.push(content);
        expect(fs.writeFile).toBeCalledWith(fileName, JSON.stringify(originalContentsOfFile, null, 4), expect.any(Function));
    });
});

describe("deleteFromFile", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("should update the notes database by removing the note with the chosen ID", () => {
        const fileName = "notes_db.json";
        const content = [{
            "noteTitle": "Hello World",
            "noteText": "This is a note for the world",
            "noteId": "9af8"
        },
        {
            "noteTitle": "Hello Underworld",
            "noteText": "This is a note for the underworld",
            "noteId": "666ad"
        }];
        const deleteId = "666ad"

        fs.readFileSync.mockReturnValue(JSON.stringify(content));

        deleteFromFile(fileName, deleteId);

        const updatedContent = [{
            "noteTitle": "Hello World",
            "noteText": "This is a note for the world",
            "noteId": "9af8"
        }]

        expect(fs.writeFile).toBeCalledWith(fileName, JSON.stringify(updatedContent, null, 4), expect.any(Function));
    });
});