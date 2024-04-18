const csvContent = ['accel_x, accel_y, accel_z']; // Array to store CSV data
const fs = require('fs'); // For temporary file creation (optional)
const { saveAs } = require('file-saver'); // File saver library
const path = require('path');

export default async function handler(req, res) {
  const API_URL = 'http://10.100.80.43/'; // Replace with the actual API URL
  const csvContent = ['accel_x, accel_y, accel_z']; // Array to store CSV data
  
  function fetchData() {
    fetch(API_URL)
      .then(response => response.text())
      .then(data => {
        csvContent.push(data);
        console.log(data); // Add fetched data to CSV content array
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  var i=0;
  function downloadCSV() {
    const csvString = csvContent.join('\n'); // Generate CSV string
    const filePath = '/Users/vince/Desktop/Portfolio_Website/my-portfolio/public/data-7/data.txt'; // Replace with your desired file path
    i+=1
    fs.writeFile(filePath, csvString, (err) => {
      if (err) {
        console.error('Error saving CSV file:', err);
        res.status(500).json({ error: 'Error saving CSV file' });
      } else {
        console.log('CSV file saved successfully!');
        res.status(200).json({ message: 'CSV file saved successfully' });
      }
    });
  }
  
  function startFetching() {
    fetch('http://10.100.80.43/run')
      .then(() => {
        setTimeout(() => {
          const intervalId = setInterval(fetchData, 250); // Fetch data every 0.25 seconds
          setTimeout(() => {
            clearInterval(intervalId);
            downloadCSV(); // Download CSV after 10 seconds
          }, 5000);
        }, 1);
      })
      .catch(error => {
        console.error('Error starting data fetching:', error);
        res.status(500).json({ error: 'Error starting data fetching' });
      });
  }
  
  // Start fetching data when this API endpoint is called
  startFetching();
}