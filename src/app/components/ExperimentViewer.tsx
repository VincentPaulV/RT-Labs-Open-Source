'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';

// Dynamically import the video component to prevent hydration errors
const VideoComponent = dynamic(() => Promise.resolve(
  React.forwardRef<HTMLVideoElement>((props, ref) => (
    <video 
      {...props} 
      ref={ref}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  ))
), { ssr: false });

interface ExperimentViewerProps {
  experimentUrl: string;
  projectSlug: string;
  projectName: string;
}

interface DataPoint {
  ax: number;
  time_ms: number;
}

export default function ExperimentViewer({ experimentUrl, projectSlug, projectName }: ExperimentViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState<DataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const cachedData: DataPoint[] = [
    {"ax": -0.32, "time_ms": 2}, {"ax": -0.36, "time_ms": 13}, {"ax": -0.3, "time_ms": 24}, 
    {"ax": -0.34, "time_ms": 35}, {"ax": -0.32, "time_ms": 46}, {"ax": -0.33, "time_ms": 57}, 
    {"ax": -0.3, "time_ms": 68}, {"ax": -0.33, "time_ms": 79}, {"ax": -0.32, "time_ms": 90}, 
    {"ax": -0.32, "time_ms": 101}, {"ax": -2.0, "time_ms": 112}, {"ax": -0.49, "time_ms": 123}, 
    {"ax": 0.09, "time_ms": 134}, {"ax": -0.4, "time_ms": 145}, {"ax": -0.2, "time_ms": 156}, 
    {"ax": 0.29, "time_ms": 167}, {"ax": 0.3, "time_ms": 178}, {"ax": 0.19, "time_ms": 189}, 
    {"ax": -0.12, "time_ms": 200}, {"ax": -0.26, "time_ms": 211}, {"ax": -0.23, "time_ms": 222}, 
    {"ax": -0.4, "time_ms": 233}, {"ax": -0.33, "time_ms": 244}, {"ax": -0.21, "time_ms": 255}, 
    {"ax": -0.58, "time_ms": 266}, {"ax": -0.23, "time_ms": 277}, {"ax": -0.28, "time_ms": 288}, 
    {"ax": -0.49, "time_ms": 299}, {"ax": -0.51, "time_ms": 310}, {"ax": -0.6, "time_ms": 321}, 
    {"ax": -0.68, "time_ms": 332}, {"ax": -0.67, "time_ms": 343}, {"ax": -0.67, "time_ms": 354}, 
    {"ax": -0.64, "time_ms": 365}, {"ax": -0.51, "time_ms": 376}, {"ax": -0.44, "time_ms": 387}, 
    {"ax": -0.41, "time_ms": 397}, {"ax": -0.39, "time_ms": 408}, {"ax": -0.33, "time_ms": 419}, 
    {"ax": -0.31, "time_ms": 430}, {"ax": -0.09, "time_ms": 441}, {"ax": -0.45, "time_ms": 452}, 
    {"ax": -0.28, "time_ms": 463}, {"ax": -0.3, "time_ms": 474}, {"ax": -0.21, "time_ms": 485}, 
    {"ax": -0.25, "time_ms": 496}, {"ax": -0.27, "time_ms": 507}, {"ax": -0.29, "time_ms": 518}, 
    {"ax": -0.21, "time_ms": 529}, {"ax": -0.25, "time_ms": 540}, {"ax": -0.23, "time_ms": 550}, 
    {"ax": -0.24, "time_ms": 561}, {"ax": -0.24, "time_ms": 572}, {"ax": -0.29, "time_ms": 583}, 
    {"ax": -0.3, "time_ms": 594}, {"ax": -0.3, "time_ms": 605}, {"ax": -0.33, "time_ms": 616}, 
    {"ax": -0.32, "time_ms": 627}, {"ax": -0.38, "time_ms": 638}, {"ax": -0.4, "time_ms": 649}, 
    {"ax": -0.43, "time_ms": 660}, {"ax": -0.44, "time_ms": 671}, {"ax": -0.43, "time_ms": 682}, 
    {"ax": -0.45, "time_ms": 693}, {"ax": -0.41, "time_ms": 704}, {"ax": -0.44, "time_ms": 715}, 
    {"ax": -0.43, "time_ms": 726}, {"ax": -0.39, "time_ms": 737}, {"ax": -0.36, "time_ms": 748}, 
    {"ax": -0.36, "time_ms": 759}, {"ax": -0.32, "time_ms": 770}, {"ax": -0.33, "time_ms": 781}, 
    {"ax": -0.38, "time_ms": 792}, {"ax": -0.23, "time_ms": 803}, {"ax": -0.27, "time_ms": 814}, 
    {"ax": -0.26, "time_ms": 825}, {"ax": -0.26, "time_ms": 836}, {"ax": -0.26, "time_ms": 847}, 
    {"ax": -0.26, "time_ms": 858}, {"ax": -0.26, "time_ms": 869}, {"ax": -0.26, "time_ms": 880}, 
    {"ax": -0.26, "time_ms": 891}, {"ax": -0.31, "time_ms": 902}, {"ax": -0.31, "time_ms": 912}, 
    {"ax": -0.31, "time_ms": 923}, {"ax": -0.33, "time_ms": 934}, {"ax": -0.34, "time_ms": 945}, 
    {"ax": -0.35, "time_ms": 956}, {"ax": -0.34, "time_ms": 967}, {"ax": -0.36, "time_ms": 978}, 
    {"ax": -0.36, "time_ms": 989}, {"ax": -0.35, "time_ms": 1000}, {"ax": -0.36, "time_ms": 1011}, 
    {"ax": -0.35, "time_ms": 1022}, {"ax": -0.36, "time_ms": 1033}, {"ax": -0.35, "time_ms": 1044}, 
    {"ax": -0.33, "time_ms": 1055}, {"ax": -0.32, "time_ms": 1066}, {"ax": -0.31, "time_ms": 1077}, 
    {"ax": -0.32, "time_ms": 1088}, {"ax": -0.31, "time_ms": 1099}, {"ax": -0.32, "time_ms": 1110}, 
    {"ax": -0.32, "time_ms": 1121}, {"ax": -0.3, "time_ms": 1132}, {"ax": -0.31, "time_ms": 1142}, 
    {"ax": -0.31, "time_ms": 1153}, {"ax": -0.31, "time_ms": 1164}, {"ax": -0.31, "time_ms": 1175}, 
    {"ax": -0.31, "time_ms": 1186}, {"ax": -0.32, "time_ms": 1197}, {"ax": -0.33, "time_ms": 1208}, 
    {"ax": -0.34, "time_ms": 1219}, {"ax": -0.28, "time_ms": 1230}, {"ax": -0.35, "time_ms": 1241}, 
    {"ax": -0.31, "time_ms": 1252}, {"ax": -0.3, "time_ms": 1263}, {"ax": -0.32, "time_ms": 1274}, 
    {"ax": -0.31, "time_ms": 1285}, {"ax": 0.63, "time_ms": 1296}, {"ax": -1.17, "time_ms": 1307}, 
    {"ax": -0.47, "time_ms": 1318}, {"ax": -0.8, "time_ms": 1329}, {"ax": -0.8, "time_ms": 1340}, 
    {"ax": -1.36, "time_ms": 1351}, {"ax": -0.59, "time_ms": 1362}, {"ax": -0.56, "time_ms": 1373}, 
    {"ax": -0.33, "time_ms": 1384}, {"ax": -0.37, "time_ms": 1395}, {"ax": -0.31, "time_ms": 1406}, 
    {"ax": -0.32, "time_ms": 1417}, {"ax": -0.16, "time_ms": 1428}, {"ax": -0.17, "time_ms": 1439}, 
    {"ax": -0.12, "time_ms": 1450}, {"ax": -0.18, "time_ms": 1461}, {"ax": -0.28, "time_ms": 1472}, 
    {"ax": -0.3, "time_ms": 1483}, {"ax": -0.22, "time_ms": 1494}, {"ax": -0.14, "time_ms": 1505}, 
    {"ax": -0.14, "time_ms": 1516}, {"ax": -0.15, "time_ms": 1527}, {"ax": -0.25, "time_ms": 1538}, 
    {"ax": -0.28, "time_ms": 1549}, {"ax": -0.3, "time_ms": 1560}, {"ax": -0.3, "time_ms": 1571}, 
    {"ax": -0.32, "time_ms": 1582}, {"ax": -0.34, "time_ms": 1593}, {"ax": -0.3, "time_ms": 1604}, 
    {"ax": -0.32, "time_ms": 1615}, {"ax": -0.3, "time_ms": 1626}, {"ax": -0.45, "time_ms": 1637}, 
    {"ax": -0.48, "time_ms": 1648}, {"ax": -0.49, "time_ms": 1659}, {"ax": -0.52, "time_ms": 1670}, 
    {"ax": -0.52, "time_ms": 1681}, {"ax": -0.53, "time_ms": 1692}, {"ax": -0.46, "time_ms": 1703}, 
    {"ax": -0.41, "time_ms": 1714}, {"ax": -0.39, "time_ms": 1725}, {"ax": -0.39, "time_ms": 1736}, 
    {"ax": -0.34, "time_ms": 1747}, {"ax": -0.32, "time_ms": 1758}, {"ax": -0.28, "time_ms": 1768}, 
    {"ax": -0.25, "time_ms": 1779}, {"ax": -0.25, "time_ms": 1790}, {"ax": -0.27, "time_ms": 1801}, 
    {"ax": -0.29, "time_ms": 1812}, {"ax": -0.24, "time_ms": 1823}, {"ax": -0.28, "time_ms": 1834}, 
    {"ax": -0.25, "time_ms": 1845}, {"ax": -0.28, "time_ms": 1856}, {"ax": -0.26, "time_ms": 1867}, 
    {"ax": -0.25, "time_ms": 1878}, {"ax": -0.24, "time_ms": 1889}, {"ax": -0.27, "time_ms": 1900}, 
    {"ax": -0.29, "time_ms": 1910}, {"ax": -0.29, "time_ms": 1921}, {"ax": -0.31, "time_ms": 1932}, 
    {"ax": -0.28, "time_ms": 1943}, {"ax": -0.33, "time_ms": 1954}, {"ax": -0.38, "time_ms": 1965}, 
    {"ax": -0.4, "time_ms": 1976}, {"ax": -0.38, "time_ms": 1987}, {"ax": -0.38, "time_ms": 1998}, 
    {"ax": -0.37, "time_ms": 2009}, {"ax": -0.38, "time_ms": 2020}, {"ax": -0.39, "time_ms": 2031}, 
    {"ax": -0.39, "time_ms": 2042}, {"ax": -0.38, "time_ms": 2052}, {"ax": -0.33, "time_ms": 2063}, 
    {"ax": -0.32, "time_ms": 2074}, {"ax": -0.32, "time_ms": 2085}, {"ax": -0.32, "time_ms": 2096}, 
    {"ax": -0.32, "time_ms": 2107}, {"ax": -0.3, "time_ms": 2118}, {"ax": -0.3, "time_ms": 2129}, 
    {"ax": -0.34, "time_ms": 2140}, {"ax": -0.28, "time_ms": 2151}, {"ax": -0.28, "time_ms": 2162}, 
    {"ax": -0.29, "time_ms": 2173}, {"ax": -0.28, "time_ms": 2184}
  ];

  useEffect(() => {
    fetchExperimentData();
    initializeCameras();
  }, [projectSlug]);

  const initializeCameras = async () => {
    try {
      // Get initial camera access to prompt for permission
      const initialStream = await navigator.mediaDevices.getUserMedia({ video: true });
      initialStream.getTracks().forEach(track => track.stop());

      // Get list of cameras
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setCameras(videoDevices);

      // Auto-select Iriun camera if available
      const iriunCamera = videoDevices.find(device => device.label.includes('Iriun'));
      if (iriunCamera) {
        setSelectedCamera(iriunCamera.deviceId);
      }
    } catch (error) {
      console.error('Error initializing cameras:', error);
      setError('Failed to access camera. Please check permissions.');
    }
  };

  const handleStreamToggle = async () => {
    if (stream) {
      stopStreaming();
    } else {
      startStreaming();
    }
  };

  const startStreaming = async () => {
    try {
      if (!selectedCamera) {
        toast.error('Please select a camera');
        return;
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: selectedCamera }
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        await videoRef.current.play();
      }
      setStream(newStream);
      setError(null);
      toast.success('Camera started successfully');
    } catch (error) {
      console.error('Error accessing webcam:', error);
      toast.error('Error accessing webcam. Please check permissions and try again.');
    }
  };

  const stopStreaming = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
  };

  const fetchExperimentData = async () => {
    try {
      const response = await fetch(`/api/experiment/${projectSlug}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      
      if (result.warning) {
        toast.error(result.warning);
      }
      
      setGraphData(result.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch experiment data. Using sample data instead.');
      setGraphData(cachedData);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const headers = ['Time (ms)', 'Acceleration (m/s²)'];
    const rows = graphData.map(point => [point.time_ms, point.ax.toFixed(2)]);
    const tableData = [headers, ...rows].map(row => row.join('\t')).join('\n');
    
    navigator.clipboard.writeText(tableData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full relative z-0">
      {/* Webcam Section */}
      <div className="w-full p-6 rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Live Experiment View</h2>
          <select 
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="px-4 py-2 border border-zinc-700 rounded-lg text-white bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select camera</option>
            {cameras.map(camera => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${camera.deviceId}`}
              </option>
            ))}
          </select>
        </div>
        
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-zinc-800">
          <VideoComponent
            ref={videoRef}
          />
          {!stream && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
              <p className="text-white">No video stream</p>
            </div>
          )}
          <button
            onClick={handleStreamToggle}
            className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg text-white font-medium ${
              stream 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {stream ? 'Stop Streaming' : 'Start Streaming'}
          </button>
        </div>
      </div>

      {/* Graph Section */}
      <div className="w-full p-6 rounded-lg border border-zinc-800 bg-zinc-900">
        <h2 className="text-2xl font-bold text-white mb-4">Acceleration vs Time Graph</h2>
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={graphData}
              margin={{ top: 20, right: 30, left: 50, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time_ms" 
                label={{ 
                  value: 'Time (ms)', 
                  position: 'bottom',
                  offset: 20,
                  fill: '#fff'
                }}
                tick={{ fill: '#fff' }}
                stroke="#fff"
              />
              <YAxis 
                label={{ 
                  value: 'Acceleration (m/s²)', 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: -35,
                  fill: '#fff'
                }}
                tick={{ fill: '#fff' }}
                stroke="#fff"
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)} m/s²`, 'Acceleration']}
                labelFormatter={(label) => `Time: ${label} ms`}
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid #374151',
                  borderRadius: '4px',
                  padding: '8px',
                  color: '#fff'
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="ax" 
                stroke="#3b82f6" 
                name="Acceleration"
                dot={false}
                isAnimationActive={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Readings Table Section */}
      <div className="w-full p-6 rounded-lg border border-zinc-800 bg-zinc-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Experiment Readings</h2>
          <button 
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Readings'}
          </button>
        </div>
        
        <div className="overflow-auto max-h-[300px] border border-zinc-800 rounded-lg">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead className="bg-zinc-800 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Time (ms)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Acceleration (m/s²)
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-800">
              {graphData.map((point, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800/50'}>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-zinc-300">
                    {point.time_ms}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-zinc-300">
                    {point.ax.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700"
        >
          Reset Experiment
        </button>
        <button 
          onClick={() => {
            setGraphData(cachedData);
            toast.success('Loaded sample data');
          }}
          className="px-4 py-2 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700"
        >
          Load Sample Data
        </button>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white bg-zinc-800 p-4 rounded-lg">
            Loading experiment...
          </div>
        </div>
      )}
    </div>
  );
} 