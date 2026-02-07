import React, { useState } from 'react';
import { CopyIcon, CheckIcon, CodeIcon } from './Icons';

const ApiDocs: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const endpoint = "https://cfig.ibytecdn.org/upload";
  
  const snippet = `curl -X POST "${endpoint}" \\
  -F "images[]=@photo.jpg" \\
  -F "server=server_1"`;

  const copy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 bg-white/60 backdrop-blur-xl border border-slate-100 rounded-[40px] p-8 md:p-14 premium-shadow relative overflow-hidden group/docs">
      <div className="max-w-xl relative z-10">
        <div className="flex items-center gap-3 text-blue-600 mb-6">
           <CodeIcon className="w-4.5 h-4.5" />
           <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Developer Core</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Powerful API Infrastructure</h2>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          The same infrastructure we use for the dashboard. Reliable, high-throughput endpoints designed for high-scale visual assets.
        </p>
      </div>

      <div className="relative group/code z-10">
        <div className="relative bg-slate-900 rounded-[24px] overflow-hidden shadow-2xl transition-all group-hover/code:shadow-blue-500/10">
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            </div>
            <button 
              onClick={copy} 
              className="text-[10px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <CopyIcon className="w-3.5 h-3.5" />}
              {copied ? 'COPIED TO CLIPBOARD' : 'COPY cURL'}
            </button>
          </div>
          
          <div className="p-8 md:p-10 overflow-x-auto scrollbar-hide">
            <pre className="text-[13px] font-mono leading-relaxed text-blue-100/90">
              <code>
                <span className="text-pink-400">curl</span> -X POST <span className="text-emerald-400">"{endpoint}"</span> \<br/>
                &nbsp;&nbsp;-F <span className="text-amber-400">"images[]=@photo.jpg"</span> \<br/>
                &nbsp;&nbsp;-F <span className="text-amber-400">"server=server_1"</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {[
          { label: 'HTTP Protocol', value: 'POST' },
          { label: 'Asset Key', value: 'images[]' },
          { label: 'Node Size', value: '25.0 MB' },
          { label: 'Global TTL', value: 'Infinity' }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl transition-all hover:border-blue-200 hover:bg-blue-50/20">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">{item.label}</p>
            <p className="text-[13px] font-bold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDocs;