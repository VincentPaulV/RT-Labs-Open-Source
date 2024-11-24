import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 4000;

// Sample fallback data
const sampleData = [
  {"ax": -0.32, "time_ms": 2}, 
  {"ax": -0.36, "time_ms": 13}
  // Add more sample data points if needed
];

app.use(cors());
app.use(express.json());  

// Cache for experiment data
let experimentDataCache = {};
const CACHE_DURATION = 5000; // 5 seconds

app.get('/api/experiment/:projectId', async (req, res) => {
  const { projectId } = req.params;
  const { picoUrl } = req.query;

  console.log('=== API Request Started ===');
  console.log('ProjectID:', projectId);
  console.log('PicoURL:', picoUrl);

  if (!picoUrl) {
    console.log('No Pico URL provided, returning sample data');
    return res.json({ 
      success: false, 
      message: 'Using sample data (no Pico URL)',
      data: sampleData
    });
  }

  try {
    // Check cache
    const cached = experimentDataCache[projectId];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Cache hit! Returning cached data:', cached.data.length, 'data points');
      return res.json({
        success: true,
        message: 'Data retrieved from cache',
        data: cached.data
      });
    }

    console.log(`Making request to: ${picoUrl}/collect`);
    
    const response = await fetch(`${picoUrl}/collect`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    
    // Read and parse the response
    const textData = await response.text();
    console.log('Raw response length:', textData.length);
    console.log('Raw response preview:', textData.substring(0, 200));

    try {
      // Try to parse the JSON
      const data = JSON.parse(textData);
      console.log('Successfully parsed JSON. Data points:', Array.isArray(data) ? data.length : 'not an array');

      // Ensure data is in correct format
      if (Array.isArray(data)) {
        // Format the data to ensure numbers
        const formattedData = data.map(point => ({
          ax: Number(point.ax),
          time_ms: Number(point.time_ms)
        }));

        console.log('Formatted data points:', formattedData.length);
        console.log('First data point:', formattedData[0]);
        console.log('Last data point:', formattedData[formattedData.length - 1]);

        // Update cache
        experimentDataCache[projectId] = {
          data: formattedData,
          timestamp: Date.now()
        };

        const responseData = {
          success: true,
          message: 'Data retrieved successfully',
          data: formattedData
        };

        console.log('Sending response with', formattedData.length, 'data points');
        return res.json(responseData);
      } else {
        throw new Error('Data is not in expected array format');
      }

    } catch (parseError) {
      console.error('Error parsing data:', parseError);
      throw new Error('Invalid data format from Pico');
    }

  } catch (error) {
    console.error('Error in request:', error);
    
    // Return sample data on error
    console.log('Returning sample data due to error');
    return res.json({
      success: false,
      message: 'Using fallback data',
      warning: error.message || 'Unknown error',
      data: sampleData
    });
  } finally {
    console.log('=== API Request Ended ===\n');
  }
});

// Add a test endpoint
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'API server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
  console.log(`Test the server at http://localhost:${port}/test`);
});