
import React, { useState } from 'react';
import { Category, FormField } from '../types';
import { CATEGORY_FORMS } from '../constants';

interface QuestionFormProps {
  category: Category;
  onSubmit: (question: string, context: Record<string, string>) => void;
  onCancel: () => void;
  loading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ category, onSubmit, onCancel, loading }) => {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState<Record<string, string>>({});

  const fields = CATEGORY_FORMS[category] || [];

  const handleContextChange = (name: string, value: string) => {
    setContext(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question, context);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center">
        <h3 className="font-bold text-emerald-800">Konsultasi: {category}</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Lengkapi Detail Berikut</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    required={field.required}
                    className="w-full rounded-lg border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    onChange={(e) => handleContextChange(field.name, e.target.value)}
                  >
                    <option value="">Pilih...</option>
                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    required={field.required}
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    onChange={(e) => handleContextChange(field.name, e.target.value)}
                  />
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
                    onChange={(e) => handleContextChange(field.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Pertanyaan Inti Anda <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Tuliskan pertanyaan spesifik Anda di sini..."
              className="w-full rounded-lg border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-grow bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Mencari Jawaban...</span>
              </>
            ) : (
              <span>Ajukan Pertanyaan</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
