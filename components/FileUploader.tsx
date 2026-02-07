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
          relative min-h-[220px] rounded-[28px] border-2 border-dashed flex flex-col items-center justify-center
          transition-all duration-500 cursor-pointer overflow-hidden
          ${isDragging 
            ? 'bg-blue-50 border-blue-400 ring-[10px] ring-blue-500/5' 
            : 'bg-white border-slate-100 hover:border-blue-300 hover:bg-slate-50/50'}
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

        <div className="flex flex-col items-center gap-5">
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
            ${isDragging 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/40' 
                : 'bg-slate-50 text-slate-400 border border-slate-200 group-hover/uploader:bg-blue-600 group-hover/uploader:text-white group-hover/uploader:border-blue-600'}
          `}>
             <UploadIcon className="w-6 h-6" />
          </div>
          <div className="text-center px-10">
            <p className="text-lg font-bold text-slate-900 tracking-tight">Drop images to start hosting</p>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2 group-hover/uploader:text-blue-500 transition-colors">
                Redefining the digital cloud
            </p>
          </div>
        </div>

        {status === UploadStatus.UPLOADING && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-20 animate-reveal">
             <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 border-[3px] border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">Deploying Assets...</span>
             </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 animate-reveal">
          <AlertIcon className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <p className="text-[11px] text-rose-800 font-bold leading-tight">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;