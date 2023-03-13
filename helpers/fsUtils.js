const fs = require('fs');

const readFromFile = (file) => {
  return fs.readFileSync(file, 'utf-8');
}
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
// const readAndAppend = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       writeToFile(file, parsedData);
//     }
//   });
// };

const readAndAppend = (content, file) => {
  let fileContents = fs.readFileSync(file, 'utf-8');
  const parsedData = JSON.parse(fileContents);
  parsedData.push(content);
  writeToFile(file, parsedData);
}

const deleteFromFile = (file, noteId) => {
  let fileContents = readFromFile(file)
  let notes = JSON.parse(fileContents);
  let notesWithoutDeleteId = notes.filter(note => note.noteId !== noteId);
  writeToFile(file, notesWithoutDeleteId)
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromFile };
