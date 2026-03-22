// src/components/InputNode.js
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const InputNode = ({ data }) => {
  return (
    <div className="px-4 py-3 shadow-2xl rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 min-w-[280px]">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        AI Prompt Builder
      </div>
      
      {/* 1. The Input Field */}
      <input 
        type="text" 
        onChange={data.onChange} 
        placeholder="Type your question..."
        className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white mb-3"
      />

      {/* 2. The Button Container */}
      <div className="flex gap-2">
        <button 
          onClick={data.onRun}
          className="flex-grow bg-green-600 hover:bg-green-800 cursor-pointer text-white text-xs px-4 py-2 rounded-lg font-medium transition-all active:scale-95"
        >
          Run Flow
        </button>
        <button 
          onClick={data.onSave}
          className="bg-white border border-slate-200 cursor-pointer hover:bg-slate-100 text-slate-700 text-xs px-4 py-2 rounded-lg font-medium transition-all"
        >
          Save
        </button>
      </div>


      {/* Connection Point (The dot) */}
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3.5 h-3.5 bg-blue-500 border-2 border-white"
      />
    </div>
  );
};

export default InputNode;