
import React, { useState } from 'react';
import Layout from './components/Layout';
import CategoryGrid from './components/CategoryGrid';
import QuestionForm from './components/QuestionForm';
import AnswerView from './components/AnswerView';
import FAQSection from './components/FAQSection';
import { Category, Consultation } from './types';
import { getUstadzResponse } from './services/gemini';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeConsultation, setActiveConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConsult = async (question: string, context: Record<string, string>) => {
    if (!selectedCategory) return;
    
    setLoading(true);
    try {
      const answer = await getUstadzResponse(selectedCategory, question, context);
      
      const newConsultation: Consultation = {
        id: Math.random().toString(36).substr(2, 9),
        category: selectedCategory,
        timestamp: Date.now(),
        question,
        context,
        answer,
        status: 'answered'
      };
      
      setActiveConsultation(newConsultation);
      setSelectedCategory(null);
    } catch (error) {
      alert("Maaf, terjadi kesalahan saat menghubungi Penyuluh Agama AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {!selectedCategory && !activeConsultation && (
        <div className="space-y-12">
          <section className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Tanya Masalah Syariah <br/>
              <span className="text-emerald-600">Terstruktur & Terpercaya</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Pilih kategori masalah Anda. Gunakan form terstruktur untuk membantu Penyuluh Agama memahami konteks masalah Anda secara akurat.
            </p>
          </section>

          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
              <h3 className="text-xl font-bold text-slate-800">Pilih Kategori Konsultasi</h3>
            </div>
            <CategoryGrid onSelect={setSelectedCategory} />
          </section>

          <FAQSection />
        </div>
      )}

      {selectedCategory && (
        <QuestionForm 
          category={selectedCategory}
          onSubmit={handleConsult}
          onCancel={() => setSelectedCategory(null)}
          loading={loading}
        />
      )}

      {activeConsultation && (
        <AnswerView 
          consultation={activeConsultation}
          onBack={() => setActiveConsultation(null)}
        />
      )}
    </Layout>
  );
};

export default App;
