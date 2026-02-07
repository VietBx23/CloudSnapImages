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
    const saved = localStorage.getItem('cloudsnap_arctic_v1');
    if (saved) setResults(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cloudsnap_arctic_v1', JSON.stringify(results));
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
      setError(err.message || 'The CDN cluster is temporarily unreachable.');
    }
  };

  const handleClear = () => {
    if (window.confirm('Wipe your local history?')) {
      setResults([]);
      localStorage.removeItem('cloudsnap_arctic_v1');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Crystal Clear Header */}
      <header className="fixed top-0 w-full z-50 glass-header h-16 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
              <LayersIcon className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">CloudSnap</span>
          </div>
          
          <nav className="flex items-center gap-8">
            <a href="#docs" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-all">Dev Tools</a>
            <div className="h-3 w-[1px] bg-slate-200"></div>
            <button 
              onClick={handleClear}
              className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-600 transition-all flex items-center gap-2"
            >
              <TrashIcon className="w-3.5 h-3.5 opacity-60" />
              Reset
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-40">
        {/* Modern Hero */}
        <section className="text-center mb-20 animate-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Global CDN Ready</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Instant Hosting <br/>
            <span className="text-blue-600">Pure. Fast. Reliable.</span>
          </h1>
          
          <p className="text-base text-slate-500 max-w-lg mx-auto font-medium mb-12">
            The world's most intuitive platform for lightning-fast image delivery. Built for developers who value aesthetics.
          </p>

          <div className="max-w-2xl mx-auto">
             <div className="p-2 bg-white rounded-[32px] premium-shadow border border-slate-100">
                <FileUploader onUpload={handleUpload} status={status} error={error} />
             </div>
          </div>
        </section>

        {/* Assets Section */}
        {results.length > 0 && (
          <section className="animate-reveal [animation-delay:150ms] opacity-0 mb-32">
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Your Delivery Stream</h3>
              <div className="h-[1px] flex-grow bg-slate-100"></div>
            </div>
            
            <div className="grid gap-3">
              {results.map((r, i) => (
                <div key={r.timestamp + i} className="animate-reveal" style={{ animationDelay: `${i * 50}ms` }}>
                  <ResultCard result={r} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Documentation Section */}
        <div id="docs" className="scroll-mt-24 animate-reveal [animation-delay:300ms] opacity-0">
          <ApiDocs />
        </div>

        <footer className="mt-40 text-center">
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
             © 2025 CloudSnap &bull; Infrastructure of the Future
           </p>
        </footer>
      </main>
    </div>
  );
};

export default App;