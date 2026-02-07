import React, { useState, useRef } from 'react';
import { UploadIcon, AlertIcon } from './Icons';
import { UploadStatus } from '../types';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  status: UploadStatus;
  error: string | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, status, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer 
      ? (Array.from(e.dataTransfer.files) as File[]).filter(file => file.type.startsWith('image/'))
      : [];
    if (files.length > 0) onUpload(files);
  };

  return (
    <div className="w-full">
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative min-h-[200px] rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center
          transition-all duration-300 cursor-pointer group overflow-hidden
          ${isDragging 
            ? 'bg-blue-600/5 border-blue-600 ring-4 ring-blue-600/5' 
            : 'bg-white border-slate-200/80 hover:border-blue-500/40 hover:bg-slate-50/30'}
          ${status === UploadStatus.UPLOADING ? 'pointer-events-none' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && onUpload(Array.from(e.target.files))}
          accept="image/*"
          multiple
          className="hidden"
        />

        <div className="flex flex-col items-center p-8 space-y-4 text-center">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
            ${isDragging ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white'}
          `}>
             <UploadIcon className={`w-6 h-6 ${isDragging ? 'animate-bounce' : ''}`} />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">Click or drag images</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium tracking-wide">Supports PNG, JPG, WebP &bull; Max 25MB</p>
          </div>
        </div>

        {status === UploadStatus.UPLOADING && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-[24px] flex items-center justify-center z-20 animate-reveal">
             <div className="flex flex-col items-center gap-6 px-10 w-full max-w-xs">
                <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-xl shadow-lg">
                    <div className="w-3.5 h-3.5 border-[2px] border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Processing</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 animate-[progress_1.5s_ease-in-out_infinite]"></div>
                </div>
             </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {error && (
        <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 animate-reveal">
          <AlertIcon className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <p className="text-[12px] text-rose-800 font-bold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;