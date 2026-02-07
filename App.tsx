
import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import ResultCard from './components/ResultCard';
import ApiDocs from './components/ApiDocs';
import { uploadImageFiles } from './services/uploadService';
import { UploadResult, UploadStatus } from './types';
import { LayersIcon, TrashIcon } from './components/Icons';

const App: React.FC = () => {
  const [results, setResults] = useState<UploadResult[]>([]);
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cs_history_v5');
    if (saved) setResults(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cs_history_v5', JSON.stringify(results));
  }, [results]);

  const handleUpload = async (files: File[]) => {
    setStatus(UploadStatus.UPLOADING);
    setError(null);
    try {
      const urls = await uploadImageFiles(files);
      const newResults: UploadResult[] = files.map((file, index) => ({
        url: urls[index],
        name: file.name,
        size: file.size,
        timestamp: Date.now(),
      }));
      setResults(prev => [...newResults, ...prev]);
      setStatus(UploadStatus.SUCCESS);
      setTimeout(() => setStatus(UploadStatus.IDLE), 1500);
    } catch (err: any) {
      setStatus(UploadStatus.ERROR);
      setError(err.message || 'Lỗi kết nối server CDN');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Super Clean Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100 h-14">
        <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayersIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight">CloudSnap</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#docs" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">API</a>
            <div className="h-3 w-px bg-slate-200"></div>
            <button 
              onClick={() => { setResults([]); localStorage.removeItem('cs_history_v5'); }}
              className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Simplified Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Upload & <span className="text-blue-600">Snap.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">Hạ tầng hình ảnh siêu tốc, bảo mật và miễn phí.</p>
        </div>

        {/* The Star: File Uploader */}
        <div className="mb-20">
          <FileUploader onUpload={handleUpload} status={status} error={error} />
        </div>

        {/* Compact Result List */}
        {results.length > 0 && (
          <div className="space-y-3 mb-20 animate-reveal">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px bg-slate-100 flex-grow"></div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2">Lịch sử tải lên</span>
              <div className="h-px bg-slate-100 flex-grow"></div>
            </div>
            {results.map((r, i) => (
              <ResultCard key={r.timestamp + i} result={r} />
            ))}
          </div>
        )}

        <div id="docs">
          <ApiDocs />
        </div>

        <footer className="mt-32 text-center opacity-30 hover:opacity-100 transition-opacity">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.5em]">
            CloudSnap &bull; Powered by iByte CDN
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
