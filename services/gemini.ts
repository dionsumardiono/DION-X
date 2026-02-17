
import { GoogleGenAI, Type } from "@google/genai";
import { Category, FAQItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getUstadzResponse = async (
  category: Category,
  question: string,
  context: Record<string, string>
) => {
  const model = "gemini-3-flash-preview";
  
  const contextString = Object.entries(context)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const prompt = `
    Anda adalah seorang Penyuluh Agama Islam dari KUA Kebomas (Sumardiono) yang ahli dalam bidang ${category}.
    Seorang user bertanya tentang masalah berikut:
    
    Kategori: ${category}
    Pertanyaan: ${question}
    Detail Konteks:
    ${contextString}
    
    Berikan jawaban yang:
    1. Berlandaskan dalil Al-Qur'an dan As-Sunnah serta pendapat ulama (terutama Mazhab Syafi'i yang dominan di Indonesia).
    2. Terstruktur dan mudah dipahami oleh orang awam.
    3. Empati, bijaksana, dan solutif sebagaimana layaknya penyuluh agama di lingkungan KUA.
    4. Jika ini masalah hukum yang kompleks, sarankan untuk berkonsultasi langsung ke kantor KUA Kebomas.
    
    Gunakan format Markdown untuk jawaban. Jika ada kutipan ayat Al-Qur'an, sertakan teks Arabnya (jika memungkinkan) dan artinya.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Gagal mendapatkan jawaban dari Penyuluh Agama AI.");
  }
};

export const generateFAQ = async (category: Category): Promise<FAQItem[]> => {
  // Check cache first to save quota
  const cacheKey = `faq_cache_${category}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const now = Date.now();
      // Cache valid for 24 hours
      if (now - parsed.timestamp < 24 * 60 * 60 * 1000) {
        return parsed.data;
      }
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  const model = "gemini-3-flash-preview";
  const prompt = `Hasilkan 3 pertanyaan yang paling sering ditanyakan (FAQ) dalam kategori ${category} kepada Penyuluh Agama Islam di KUA beserta jawabannya yang ringkas namun padat sesuai kaidah fiqih.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        }
      }
    });

    const items = JSON.parse(response.text || "[]");
    const result = items.map((item: any) => ({ ...item, category }));
    
    // Save to cache
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: result
    }));

    return result;
  } catch (error: any) {
    console.warn(`FAQ Generation failed for ${category}:`, error.message);
    // Return cached even if expired if we hit quota
    if (cached) {
      return JSON.parse(cached).data;
    }
    return [];
  }
};
