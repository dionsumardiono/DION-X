
import React from 'react';
import { Consultation } from '../types';

interface AnswerViewProps {
  consultation: Consultation;
  onBack: () => void;
}

const AnswerView: React.FC<AnswerViewProps> = ({ consultation, onBack }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Dashboard
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          <section>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase mb-3">
              Pertanyaan Anda
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-relaxed mb-4">
              {consultation.question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(consultation.context).map(([key, val]) => (
                <div key={key} className="flex text-sm">
                  <span className="text-slate-400 w-32 shrink-0">{key.replace('_', ' ')}:</span>
                  <span className="text-slate-700 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          <section className="prose prose-emerald max-w-none">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 m-0 leading-tight">Jawaban Penyuluh Agama AI</h3>
                <p className="text-xs text-slate-500 m-0">Kreasi AI Penyuluh Agama KUA Kebomas</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
               {consultation.answer?.split('\n').map((line, i) => (
                 <p key={i} className={line.match(/[\u0600-\u06FF]/) ? "arabic text-2xl text-right leading-loose py-2 bg-slate-50 px-4 rounded-lg" : ""}>
                   {line}
                 </p>
               ))}
            </div>
          </section>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
           <span>Ditanyakan pada {new Date(consultation.timestamp).toLocaleString('id-ID')}</span>
           <div className="flex space-x-4">
              <button className="hover:text-emerald-600 transition">Download PDF</button>
              <button className="hover:text-emerald-600 transition">Bagikan</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerView;
