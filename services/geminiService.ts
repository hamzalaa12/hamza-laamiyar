
import { GoogleGenAI } from "@google/genai";
import { ComicType } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateSynopsis = async (title: string, type: ComicType): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("ميزة الذكاء الاصطناعي غير متاحة. يرجى تكوين مفتاح API الخاص بك.");
  }
  
  const prompt = `أنشئ ملخصًا قصيرًا وجذابًا باللغة العربية لنوع ${type} بعنوان "${title}". يجب أن يكون الملخص جذابًا ويلمح إلى الحبكة الرئيسية والشخصيات، ويتكون من 2-3 جمل. لا تقم بتضمين أي عبارات تمهيدية مثل "إليك ملخص:".`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating synopsis with Gemini API:", error);
    return "حدث خطأ أثناء إنشاء الملخص. يرجى المحاولة مرة أخرى.";
  }
};
