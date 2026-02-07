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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) onUpload(files);
  };

  return (
    <div className="w-full relative group/uploader">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative min-h-[240px] sm:min-h-[280px] rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center
          transition-all duration-500 cursor-pointer overflow-hidden
          ${isDragging 
            ? 'bg-blue-50/50 border-blue-400 ring-[12px] ring-blue-500/5 scale-[0.985]' 
            : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'}
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

        <div className="flex flex-col items-center gap-6 sm:gap-7 relative z-10 px-6">
          <div className={`
            w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-[22px] flex items-center justify-center transition-all duration-500
            ${isDragging 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 rotate-3' 
                : 'bg-slate-50 text-slate-400 border border-slate-100 group-hover/uploader:bg-blue-600 group-hover/uploader:text-white group-hover/uploader:border-blue-600'}
          `}>
             <UploadIcon className={`w-6 h-6 sm:w-7 sm:h-7 ${isDragging ? 'animate-bounce' : ''}`} />
          </div>
          <div className="text-center">
            <p className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Stage your assets</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 group-hover/uploader:text-blue-500 transition-colors">
                Tap to select or drop here
            </p>
          </div>
        </div>

        {status === UploadStatus.UPLOADING && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-20 animate-float-in">
             <div className="flex flex-col items-center gap-6 w-48 sm:w-64">
                <div className="relative">
                   <div className="w-10 h-10 border-[3px] border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <div className="w-full text-center">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest animate-pulse">Encoding Node</span>
                </div>
             </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 animate-float-in">
          <AlertIcon className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <p className="text-[11px] text-rose-800 font-bold leading-tight">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;