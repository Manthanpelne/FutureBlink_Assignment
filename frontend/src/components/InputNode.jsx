
import { Handle, Position } from '@xyflow/react';

const InputNode = ({ data }) => {
  return (
    <div className="px-4 py-3 shadow-xl rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 min-w-[200px]">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        AI Prompt
      </div>
      <input 
        type="text" 
        onChange={data.onChange} 
        placeholder="Type a message..."
        className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </div>
  );
};

export default InputNode;