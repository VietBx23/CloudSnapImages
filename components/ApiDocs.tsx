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
    <div className="space-y-8 bg-slate-50/50 rounded-[32px] p-8 md:p-12 border border-slate-100">
      <div className="max-w-xl">
        <div className="flex items-center gap-2.5 text-blue-600 mb-4">
           <CodeIcon className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Developer Portal</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Integrate our API</h2>
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
          High-performance endpoint for programmatic uploads. Simple multipart requests with direct CDN responses.
        </p>
      </div>

      <div className="relative group">
        <div className="relative bg-[#020617] rounded-[20px] overflow-hidden shadow-xl border border-white/5">
          <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-800"></div>
              <div className="w-2 h-2 rounded-full bg-slate-800"></div>
              <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            </div>
            <button 
              onClick={copy} 
              className="text-[9px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              {copied ? <CheckIcon className="w-3 h-3 text-emerald-400" /> : <CopyIcon className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy cURL'}
            </button>
          </div>
          
          <div className="p-6 md:p-8 overflow-x-auto">
            <pre className="text-[12px] font-mono leading-relaxed text-blue-100/80">
              <code>
                <span className="text-pink-400">curl</span> -X POST <span className="text-emerald-400">"{endpoint}"</span> \<br/>
                &nbsp;&nbsp;-F <span className="text-amber-400">"images[]=@photo.jpg"</span> \<br/>
                &nbsp;&nbsp;-F <span className="text-amber-400">"server=server_1"</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Method', value: 'POST' },
          { label: 'Key', value: 'images[]' },
          { label: 'Size Limit', value: '25 MB' },
          { label: 'Support', value: 'CORS Ready' }
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl">
            <p className="text-[9px] font-bold text-slate-400 uppercase mb-1.5 tracking-widest">{item.label}</p>
            <p className="text-[11px] font-bold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDocs;