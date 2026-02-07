
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
    <div className="w-full relative">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative min-h-[180px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center
          transition-all duration-300 cursor-pointer overflow-hidden
          ${isDragging 
            ? 'bg-blue-50 border-blue-400 scale-[0.99] ring-8 ring-blue-500/5' 
            : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'}
          ${status === UploadStatus.UPLOADING ? 'pointer-events-none opacity-50' : ''}
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

        <div className="flex flex-col items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-colors
            ${isDragging ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}
          `}>
             <UploadIcon className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900">Kéo thả ảnh vào đây</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">PNG, JPG, WebP tối đa 25MB</p>
          </div>
        </div>

        {status === UploadStatus.UPLOADING && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
             <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Đang tải lên...</span>
             </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 animate-reveal">
          <AlertIcon className="w-4 h-4 text-rose-500" />
          <p className="text-[11px] text-rose-800 font-bold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
