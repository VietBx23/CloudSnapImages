
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

  return (
    <div className="glow-box p-2.5 rounded-2xl flex items-center gap-4 group">
      <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
        <img src={result.url} className="w-full h-full object-cover" alt="preview" />
      </div>
      
      <div className="flex-grow min-w-0">
        <h4 className="text-[12px] font-bold text-slate-800 truncate leading-tight">{result.name}</h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
            {(result.size / 1024 / 1024).toFixed(2)} MB
          </span>
          <span className="w-0.5 h-0.5 bg-slate-200 rounded-full"></span>
          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Đã tối ưu</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 pr-1">
        <button
          onClick={copyToClipboard}
          className={`
            h-8 px-3 rounded-lg text-[9px] font-bold transition-all flex items-center gap-2
            ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'}
          `}
        >
          {copied ? <CheckIcon className="w-3 h-3" /> : <CopyIcon className="w-3 h-3" />}
          {copied ? 'ĐÃ COPY' : 'COPY LINK'}
        </button>
        
        <a 
          href={result.url} target="_blank" rel="noreferrer"
          className="h-8 w-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 rounded-lg hover:text-blue-600 transition-colors"
        >
          <ExternalLinkIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default ResultCard;
