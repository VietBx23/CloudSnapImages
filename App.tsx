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
    const saved = localStorage.getItem('cloudsnap_pro_v1');
    if (saved) setResults(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cloudsnap_pro_v1', JSON.stringify(results));
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
      setTimeout(() => setStatus(UploadStatus.IDLE), 1000);
    } catch (err: any) {
      setStatus(UploadStatus.ERROR);
      setError(err.message || 'The CDN cluster encountered a node failure. Please retry.');
    }
  };

  const handleClear = () => {
    if (window.confirm('Delete local session data?')) {
      setResults([]);
      localStorage.removeItem('cloudsnap_pro_v1');
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-600/10">
      {/* Precision Navigation */}
      <header className="fixed top-0 w-full z-50 premium-blur h-14 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
              <LayersIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[14px] font-extrabold tracking-tight text-slate-900 sm:text-[16px]">CloudSnap</span>
          </div>
          
          <nav className="flex items-center gap-4 sm:gap-8">
            <a href="#docs" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Docs</a>
            <div className="h-3 w-[1px] bg-slate-200"></div>
            <button 
              onClick={handleClear}
              className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-600 transition-colors flex items-center gap-1.5"
            >
              <TrashIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Purge</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 pb-40">
        {/* Focused Hero Section */}
        <section className="text-center mb-16 sm:mb-24 animate-float-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[9px] font-extrabold text-blue-700 uppercase tracking-widest">Enterprise CDN v2.4</span>
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 leading-tight">
            High-Performance<br/>
            <span className="text-blue-600">Visual Delivery.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto font-medium leading-relaxed mb-12 sm:mb-16">
            Global edge-caching for your assets. Upload once, serve everywhere with zero latency.
          </p>

          <div className="max-w-xl mx-auto">
             <div className="p-2 sm:p-3 bg-white/50 premium-blur rounded-[40px] shadow-2xl shadow-blue-500/5 border border-slate-200/50">
                <FileUploader onUpload={handleUpload} status={status} error={error} />
             </div>
          </div>
        </section>

        {/* Dynamic Asset History */}
        {results.length > 0 && (
          <section className="animate-float-in [animation-delay:200ms] opacity-0 mb-32">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em]">Asset Feed</h3>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{results.length}</span>
              </div>
              <div className="h-[1px] flex-grow mx-4 bg-slate-100 hidden sm:block"></div>
            </div>
            
            <div className="grid gap-3 sm:gap-4">
              {results.map((r, i) => (
                <div key={r.timestamp + i} className="animate-float-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <ResultCard result={r} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Documentation Hub */}
        <div id="docs" className="scroll-mt-24 animate-float-in [animation-delay:400ms] opacity-0">
          <ApiDocs />
        </div>

        <footer className="mt-40 text-center">
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] select-none">
             CloudSnap Infrastructure &bull; Precision Engineered
           </p>
        </footer>
      </main>
    </div>
  );
};

export default App;