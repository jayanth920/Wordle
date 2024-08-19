const fs = require('fs');
const path = require('path');

// Get the full path to answers.txt relative to the script location
const filePath = path.join(__dirname, 'answers.txt');

// Read the file contents
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Split the content by new lines, add quotes and commas, and join them into a single string
    const formattedData = data.split('\n')
        .map(line => `"${line.trim().toUpperCase()}"`)
        .join(',\n');

    // Write the formatted data to a new file called final.txt
    fs.writeFile(path.join(__dirname, 'data.js'), formattedData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Formatted data successfully written to final.txt');
    });
});
