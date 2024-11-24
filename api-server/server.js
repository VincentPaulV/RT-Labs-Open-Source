import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import http from 'http';
import initVideoStream from './videoStreamServer.js';

import dotenv from 'dotenv';
import axios from 'axios';

const app = express();
const server = http.createServer(app);

const videoURL = 'http://192.168.76.159:4747'

// Initialize video streaming
initVideoStream(server);

// Sample fallback data
const sampleData = [
  {"ax": -0.32, "time_ms": 2}, 
  {"ax": -0.36, "time_ms": 13}
];

app.use(cors());
app.use(express.json());  

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Cache for experiment data
let experimentDataCache = {};
const CACHE_DURATION = 5000; // 5 seconds

app.get('/video', async (req, res) => {
  try {
    console.log('Sending override request...');
    
    // Make the override request first
    await axios({
      method: 'get',
      url: `${videoURL}/override`,
    });

    console.log('Override request completed. Fetching video stream...');

    // Now fetch the video stream
    const videoResponse = await axios({
      method: 'get',
      url: `${videoURL}/video`,
      responseType: 'stream',
    });

    // Set the response headers for video streaming
    res.setHeader('Content-Type', videoResponse.headers['content-type'] || 'video/mp4');
    res.setHeader('Cache-Control', 'no-cache');
    console.log('Video stream response headers:', videoResponse.headers);

    // Pipe the video stream data to the response
    videoResponse.data.pipe(res);

    // Handle when the response is closed
    res.on('close', () => {
      console.log('Video stream response ended.');
    });
  } catch (error) {
    console.error('Error during video streaming:', error.message);
    res.status(500).send('Error during video streaming');
  }
});





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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server at http://localhost:${PORT}/test`);
});