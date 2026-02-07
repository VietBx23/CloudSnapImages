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
    if (bytes === 0) return '0 B';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + ['B', 'KB', 'MB'][i];
  };

  return (
    <div className="card-elevated bg-white p-3 flex items-center gap-5 group">
      <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 shadow-inner">
        <img 
            src={result.url} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            alt={result.name} 
            loading="lazy"
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-[13px] font-bold text-slate-900 truncate mb-0.5">{result.name}</h4>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{formatSize(result.size)}</span>
              <span className="w-0.5 h-0.5 bg-slate-200 rounded-full"></span>
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Live</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="hidden md:block bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 w-40">
                <p className="text-[10px] font-mono text-slate-400 truncate tracking-tight">{result.url}</p>
             </div>

             <button
                onClick={copyToClipboard}
                className={`
                h-8 px-4 rounded-lg text-[10px] font-bold transition-all duration-300 flex items-center gap-2
                ${copied ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}
                `}
             >
                {copied ? <CheckIcon className="w-3 h-3" /> : <CopyIcon className="w-3 h-3" />}
                {copied ? 'COPIED' : 'COPY'}
             </button>
             
             <a 
                href={result.url} 
                target="_blank" 
                rel="noreferrer" 
                className="h-8 w-8 flex items-center justify-center bg-white border border-slate-100 text-slate-300 rounded-lg hover:text-blue-600 hover:border-blue-200 transition-all"
             >
                <ExternalLinkIcon className="w-3.5 h-3.5" />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;