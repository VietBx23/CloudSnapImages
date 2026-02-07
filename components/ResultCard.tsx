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
    <div className="bento-card p-3 sm:p-4 rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 group">
      {/* Visual Preview */}
      <div className="w-full sm:w-16 h-40 sm:h-16 flex-shrink-0 rounded-[18px] overflow-hidden bg-slate-50 border border-slate-100 p-0.5 group-hover:border-blue-100 transition-all duration-500">
        <img 
            src={result.url} 
            className="w-full h-full object-cover rounded-[14px] transition-transform duration-700 group-hover:scale-110" 
            alt="asset" 
            loading="lazy"
        />
      </div>
      
      <div className="flex-grow min-w-0 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-[14px] font-bold text-slate-800 truncate mb-1 group-hover:text-blue-600 transition-colors">{result.name}</h4>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400 font-medium tracking-tighter">{formatSize(result.size)}</span>
              <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
              <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Global Cache</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
             <div className="hidden sm:block xl:block bg-slate-50/80 border border-slate-100 rounded-xl px-3 py-2 w-48 group-hover:bg-white group-hover:border-blue-100 transition-all overflow-hidden">
                <p className="text-[10px] font-mono text-slate-400 truncate tracking-tighter select-all">{result.url}</p>
             </div>

             <button
                onClick={copyToClipboard}
                className={`
                h-10 sm:h-11 flex-grow sm:flex-grow-0 px-6 rounded-xl sm:rounded-[14px] text-[11px] font-bold transition-all duration-300 flex items-center justify-center gap-2
                ${copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}
                `}
             >
                {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
             </button>
             
             <a 
                href={result.url} 
                target="_blank" 
                rel="noreferrer" 
                className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center bg-white border border-slate-100 text-slate-400 rounded-xl sm:rounded-[14px] hover:text-blue-600 hover:border-blue-200 transition-all"
             >
                <ExternalLinkIcon className="w-5 h-5" />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;