// src/App.js
import React, { useState, useMemo, useEffect } from 'react'; // Added useEffect
import { ReactFlow, Background, Controls, useNodesState, useEdgesState } from '@xyflow/react';
import axios from 'axios'; // 1. Added Missing Axios Import
import '@xyflow/react/dist/style.css';
import InputNode from './components/InputNode';

const App = () => {
  const [prompt, setPrompt] = useState("");
  const nodeTypes = useMemo(() => ({ promptNode: InputNode }), []);

  // Define Handlers
  const handleRunFlow = async () => {
    if (!prompt) return alert("Please enter a prompt!");

    setNodes((nds) =>
      nds.map((n) => n.id === 'node-2' ? { ...n, data: { label: 'Thinking...' } } : n)
    );

    try {
      const res = await axios.post('http://localhost:5000/api/ask-ai', { prompt });
      const aiResponse = res.data.answer;
      
      setNodes((nds) =>
        nds.map((n) => n.id === 'node-2' ? { ...n, data: { label: aiResponse } } : n)
      );
    } catch (err) {
      alert("Backend Error! Is your server running on port 5000?");
      setNodes((nds) =>
        nds.map((n) => n.id === 'node-2' ? { ...n, data: { label: 'Error fetching response' } } : n)
      );
    }
  };

  const handleSaveToDB = async () => {
    const resultNode = nodes.find(n => n.id === 'node-2');
    const responseText = resultNode?.data?.label;

    if (!responseText || responseText === 'Response will appear here...' || responseText === 'Thinking...') {
      return alert("Generate an AI response first!");
    }

    try {
      await axios.post('http://localhost:5000/api/save', { 
        prompt: prompt, 
        response: responseText 
      });
      alert("Data saved to MongoDB!");
    } catch (err) {
      alert("Save failed. Check backend console.");
    }
  };

  // Initial Configuration
  const initialNodes = [
    { 
      id: 'node-1', 
      type: 'promptNode', 
      data: { 
        onChange: (e) => setPrompt(e.target.value),
        onRun: handleRunFlow,
        onSave: handleSaveToDB
      }, 
      position: { x: 50, y: 150 }
    },
    { 
      id: 'node-2', 
      data: { label: 'Response will appear here...' }, 
      position: { x: 500, y: 150 },
      className: 'p-4 shadow-xl rounded-xl bg-slate-900 text-white border border-slate-700 w-64'
    },
  ];

  const initialEdges = [
    { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'node-1') {
          return {
            ...node,
            data: {
              ...node.data,
              onChange: (e) => setPrompt(e.target.value),
              onRun: handleRunFlow,
              onSave: handleSaveToDB,
            },
          };
        }
        return node;
      })
    );
  }, [prompt]); // Re-run whenever prompt changes

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col">
      <header className="h-16 border-b bg-white flex items-center px-8 z-10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Flow Builder
        </h1>
      </header>

      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#cbd5e1" variant="dots" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default App;