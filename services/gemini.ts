
import { GoogleGenAI, Modality } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateKidStory = async (topic: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a very short, cheerful 3-sentence story for a 5-year-old about: ${topic}. Use simple words and emojis.`,
  });
  return response.text || "Once upon a time, there was a happy " + topic + ".";
};

/**
 * Generates clear, cheerful speech for kids' learning at a natural pace.
 */
export const generateSpeech = async (text: string): Promise<string | null> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Speak this in a cheerful, clear, and friendly voice at a medium, natural pace for a child: ${text}` }] }],
      config: {
        // Using Modality.AUDIO ensures we get raw PCM data.
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // 'Puck' is friendly and expressive.
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.error("TTS generation failed", error);
    return null;
  }
};
