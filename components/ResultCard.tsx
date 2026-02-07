import React, { useState } from 'react';
import { UploadResult } from '../types';
import { CopyIcon, CheckIcon, ExternalLinkIcon } from './Icons';

interface ResultCardProps {
  result: UploadResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / 1024 / 1024;
    return mb.toFixed(2) + ' MB';
  };

  return (
    <div className="card-light p-3.5 rounded-[22px] flex items-center gap-5 group premium-shadow">
      {/* High-Resolution Preview Container */}
      <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 p-0.5 group-hover:border-blue-100 transition-all duration-500">
        <img 
            src={result.url} 
            className="w-full h-full object-cover rounded-[10px] transition-transform duration-700 group-hover:scale-110" 
            alt="thumbnail" 
            loading="lazy"
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="min-w-0">
            <h4 className="text-[14px] font-bold text-slate-800 truncate mb-1 leading-none">{result.name}</h4>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{formatSize(result.size)}</span>
              <div className="w-0.5 h-0.5 bg-slate-200 rounded-full"></div>
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.1em]">CDN: Global Node 1</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="hidden xl:block bg-slate-50/50 border border-slate-100 rounded-lg px-3 py-2.5 w-56 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-all">
                <p className="text-[10px] font-mono text-slate-400 truncate tracking-tighter">{result.url}</p>
             </div>

             <button
                onClick={copyToClipboard}
                className={`
                h-10 px-5 rounded-xl text-[11px] font-bold transition-all duration-300 flex items-center gap-2
                ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30'}
                `}
             >
                {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
                {copied ? 'SAVED' : 'COPY URL'}
             </button>
             
             <a 
                href={result.url} 
                target="_blank" 
                rel="noreferrer" 
                className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-slate-300 rounded-xl hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
                title="View original"
             >
                <ExternalLinkIcon className="w-4 h-4" />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;