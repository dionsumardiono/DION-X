
import React, { useState, useEffect } from 'react';
import { Category, FAQItem } from '../types';
import { generateFAQ } from '../services/gemini';

const FALLBACK_FAQS: FAQItem[] = [
  {
    category: Category.ZAKAT,
    question: "Kapan waktu yang tepat untuk membayar Zakat Mal?",
    answer: "Zakat Mal dibayarkan apabila harta telah mencapai nishab (setara 85gr emas) dan telah dimiliki selama satu tahun hijriah (haul)."
  },
  {
    category: Category.NIKAH,
    question: "Apa saja syarat sah pernikahan dalam Islam?",
    answer: "Syarat sah nikah meliputi adanya mempelai laki-laki, mempelai perempuan, wali nikah, dua orang saksi laki-laki yang adil, dan ijab kabul."
  }
];

const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      const categories = [Category.ZAKAT, Category.NIKAH, Category.WARIS];
      const allResults: FAQItem[] = [];

      // Fetch sequentially to avoid 429 Resource Exhausted errors
      for (const cat of categories) {
        try {
          const res = await generateFAQ(cat);
          if (res && res.length > 0) {
            allResults.push(...res);
          }
          // Small delay to be safe if not cached
          if (!localStorage.getItem(`faq_cache_${cat}`)) {
             await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (err) {
          console.error(`Failed to fetch FAQ for ${cat}`);
        }
      }

      setFaqs(allResults.length > 0 ? allResults : FALLBACK_FAQS);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  if (loading && faqs.length === 0) return (
    <div className="py-12 flex justify-center">
      <div className="animate-pulse w-full max-w-2xl space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-32 bg-slate-100 rounded-2xl"></div>
          <div className="h-32 bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="faq" className="py-12 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">FAQ Edukasi</h2>
        <p className="text-slate-500 mt-2">Pertanyaan umum seputar hukum Islam di masyarakat.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition group">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition">Q</div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-tighter mb-1 block">
                  {faq.category}
                </span>
                <h4 className="font-bold text-slate-800 mb-2">{faq.question}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
