'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import IPCameraViewer from './IPCameraViewer';


interface ExperimentViewerProps {
  experimentUrl: string;
  projectSlug: string;
  projectName: string;
}

const backendURL = 'http://localhost:3001'

export default function ExperimentViewer({ experimentUrl, projectSlug, projectName }: ExperimentViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);
  const [isStreamer, setIsStreamer] = useState(false);
  const socketRef = useRef<any>(null);

  const fetchController = useRef<AbortController | null>(null);



  useEffect(() => {
    

    // Fetch initial data
    fetchExperimentData();

   
  }, []);

  

  const fetchExperimentData = async () => {
    // Abort previous request if it exists
    if (fetchController.current) {
      fetchController.current.abort();
    }
    
    // Create new controller for this request
    fetchController.current = new AbortController();
    
    try {
      setIsLoading(true);
      console.log('Fetching data for project:', projectSlug); // Debug log

      const response = await fetch(`/api/experiment/${projectSlug}`, {
        signal: fetchController.current.signal
      });
      
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      
      console.log('Received data:', result); // Debug log
      
      if (result.warning) {
        toast.error(result.warning);
      }
      
      if (result.data && Array.isArray(result.data)) {
        console.log('Setting graph data with', result.data.length, 'points'); // Debug log
        console.log('First data point:', result.data[0]); // Debug log
        setGraphData(result.data);
      } else {
        console.error('Invalid data format received:', result); // Debug log
        toast.error('Invalid data format received');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted'); // Debug log
        return;
      }

      console.error('Error fetching data:', error);
      toast.error('Failed to fetch experiment data. Using sample data instead.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperimentData();
    
    // Cleanup function
    return () => {
      if (fetchController.current) {
        fetchController.current.abort();
      }
    };
  }, [projectSlug]); // Only re-run if projectSlug changes

  // Add a useEffect to monitor graphData changes
  useEffect(() => {
    console.log('graphData updated:', graphData); // Debug log
  }, [graphData]);

  const copyToClipboard = () => {
    const headers = ['Time (ms)', 'Acceleration (m/s²)'];
    const rows = graphData.map(point => [point.time_ms, point.ax.toFixed(2)]);
    const tableData = [headers, ...rows].map(row => row.join('\t')).join('\n');
    
    navigator.clipboard.writeText(tableData);
    setCopied(true);
    toast.success('Data copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Video Section */}
      <div className="w-full p-6 rounded-lg border border-zinc-800 bg-zinc-900 text-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Live Experiment View</h2>
        </div>

        <div className="w-full p-6 rounded-lg border border-zinc-800 bg-zinc-900 text-center">
          <IPCameraViewer />
      </div>
  



        
      </div>

      {/* Graph Section */}
      <div className="w-full p-6 rounded-lg border border-zinc-800 bg-zinc-900">
        <h2 className="text-2xl font-bold text-white mb-4">Acceleration vs Time Graph</h2>
        <div className="w-full h-[500px]">
          {graphData.length > 0 ? (
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
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500">
              No data available
            </div>
          )}
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