// const express = require('express');
// const app = express();
// const port = 3004;

const API_URL = 'http://10.100.81.133/'; // Replace with the actual API URL
const csvContent = ['accel_x, accel_y, accel_z']; // Array to store CSV data
const fs = require('fs'); // For temporary file creation (optional)
const { saveAs } = require('file-saver'); // File saver library
const path = require('path');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


function fetchData() {
  fetch(API_URL)
    .then(response => response.text())
    .then(data => {
      csvContent.push(data);
      console.log(data); // Add fetched data to CSV content array
    })
    .catch(error => console.error('Error fetching data:', error));
   
}
var i=0
function downloadCSV() {
    const csvString = csvContent.join('\n'); // Generate CSV string
    const folderPath = path.join(__dirname, 'data-4');
    const filePath = path.join(folderPath, 'data_'+i+'.csv');
    i+=1
  
    fs.writeFile(filePath, csvString, (err) => {
      if (err) {
        console.error('Error saving CSV file:', err);
      } else {
        console.log('CSV file saved successfully!');
      }
    });

}

function startFetching() {
    fetch('http://10.100.81.133/run')
    setTimeout(() => {  
    const intervalId = setInterval(fetchData, 250); // Fetch data every 0.25 seconds

    setTimeout(() => {
        clearInterval(intervalId);
        downloadCSV(); // Download CSV after 10 seconds
    }, 5000)}, 20);
}

startFetching();

// app.get('/', (req, res) => {
    
//   });
  
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });