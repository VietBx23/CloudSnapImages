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
    const saved = localStorage.getItem('cloudsnap_v4_history');
    if (saved) {
      try {
        setResults(JSON.parse(saved));
      } catch (e) {
        console.error("History parse failed");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cloudsnap_v4_history', JSON.stringify(results));
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
      setTimeout(() => setStatus(UploadStatus.IDLE), 2000);
    } catch (err: any) {
      setStatus(UploadStatus.ERROR);
      setError(err.message || 'The upload server encountered an issue.');
    }
  };

  const clearHistory = () => {
    if (window.confirm('Wipe your local history?')) {
      setResults([]);
      localStorage.removeItem('cloudsnap_v4_history');
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-600/10">
      {/* Minimalist Header */}
      <header className="fixed top-0 z-50 w-full glass-panel border-b border-gray-200/20 h-16">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayersIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">CloudSnap</span>
          </div>
          
          <nav className="flex items-center gap-6">
            <a href="#api" className="text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">Documentation</a>
            <div className="h-3 w-px bg-slate-200"></div>
            <a href="https://github.com" target="_blank" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">Open Source</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-40">
        {/* Core Hero */}
        <section className="animate-reveal text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Instant Hosting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">for your assets.</span>
          </h2>
          
          <p className="text-base text-slate-500 max-w-lg mx-auto font-medium mb-12">
            The fastest way to upload and share images. Secure, optimized, and developer-friendly.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="p-2 bg-white/40 backdrop-blur-2xl rounded-[32px] shadow-2xl shadow-blue-500/5 border border-white/60">
              <FileUploader onUpload={handleUpload} status={status} error={error} />
            </div>
          </div>
        </section>

        {/* History Stream */}
        {results.length > 0 && (
          <section className="animate-reveal mb-32 space-y-6">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Recent Items</h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{results.length}</span>
              </div>
              <button 
                onClick={clearHistory} 
                className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-all flex items-center gap-2 px-3 py-1 rounded-lg uppercase tracking-widest"
              >
                <TrashIcon className="w-3.5 h-3.5" /> Purge All
              </button>
            </div>
            
            <div className="grid gap-4">
              {results.map((r, i) => (
                <ResultCard key={r.timestamp + i} result={r} />
              ))}
            </div>
          </section>
        )}

        {/* API Section */}
        <div id="api" className="scroll-mt-24">
          <ApiDocs />
        </div>

        {/* Simplified Signature Footer */}
        <footer className="mt-40 text-center">
           <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.5em]">
             CloudSnap Infrastructure &bull; Global Node Network
           </p>
        </footer>
      </main>
    </div>
  );
};

export default App;