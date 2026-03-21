// src/App.js
import React, { useState, useMemo } from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import InputNode from './components/InputNode';

const App = () => {
  const [prompt, setPrompt] = useState("");
  const nodeTypes = useMemo(() => ({ promptNode: InputNode }), []);

  const initialNodes = [
    { 
      id: 'node-1', 
      type: 'promptNode', 
      data: { onChange: (e) => setPrompt(e.target.value) }, 
      position: { x: 100, y: 150 } 
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

  const handleRunFlow = () => {
    console.log("Prompt captured:", prompt);
    setNodes((nds) =>
      nds.map((n) => n.id === 'node-2' ? { ...n, data: { label: 'AI is thinking...' } } : n)
    );
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col">
      {/* Header / Toolbar */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-8 z-10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Flow Builder
        </h1>
        <div className="flex gap-3">
          <button 
            onClick={handleRunFlow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            Run Flow
          </button>
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2 rounded-lg font-medium transition-all">
            Save
          </button>
        </div>
      </header>

      {/* Canvas Area */}
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