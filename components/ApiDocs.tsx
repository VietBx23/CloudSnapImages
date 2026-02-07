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
    <div className="space-y-10 sm:space-y-16 bg-white rounded-[40px] p-6 sm:p-16 border border-slate-100 shadow-2xl shadow-blue-500/5 relative overflow-hidden group/docs">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full -mr-32 -mt-32"></div>

      <div className="max-w-xl relative z-10">
        <div className="flex items-center gap-3 text-blue-600 mb-6">
           <CodeIcon className="w-5 h-5" />
           <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Infrastructure Docs</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Deploy anywhere.</h2>
        <p className="text-base text-slate-500 font-medium leading-relaxed">
          Our API protocol is designed for high-concurrency environments. Integrate CloudSnap into your production CI/CD pipeline in minutes.
        </p>
      </div>

      <div className="relative group/code z-10">
        <div className="bg-slate-900 rounded-[28px] overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            </div>
            <button 
              onClick={copy} 
              className="text-[9px] font-bold text-slate-400 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <CopyIcon className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          
          <div className="p-8 sm:p-12 overflow-x-auto">
            <pre className="text-[13px] font-mono leading-relaxed text-blue-100/90">
              <code>
                <span className="text-blue-400">curl</span> -X POST <span className="text-emerald-400">"{endpoint}"</span> \<br/>
                &nbsp;&nbsp;-F <span className="text-amber-400">"images[]=@asset.png"</span> \<br/>
                &nbsp;&nbsp;-F <span className="text-amber-400">"server=primary_1"</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {[
          { label: 'Method', value: 'POST' },
          { label: 'Asset Key', value: 'images[]' },
          { label: 'Payload', value: 'Multipart' },
          { label: 'Auth', value: 'Open' }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-slate-50/50 border border-slate-100 rounded-[20px] transition-all hover:border-blue-200">
            <p className="text-[9px] font-bold text-slate-400 uppercase mb-2 tracking-widest">{item.label}</p>
            <p className="text-[13px] font-bold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDocs;