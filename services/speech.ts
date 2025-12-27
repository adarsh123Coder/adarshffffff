
/**
 * Uses the browser's native Web Speech API for instant, reliable voice feedback.
 * Added 'lang' parameter to support Hindi for the quiz.
 */
export const speakNative = (text: string, lang: string = 'en-US') => {
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  
  // Find a good voice for the requested language
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find a premium/natural sounding voice for the specific language
  const preferredVoice = voices.find(v => 
    v.lang.startsWith(lang.split('-')[0]) && 
    (v.name.includes('Google') || v.name.includes('Natural'))
  ) || voices.find(v => v.lang.startsWith(lang.split('-')[0]));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  // Set to medium pace
  utterance.rate = 0.9; 
  utterance.pitch = 1.1; 
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};

// Initialize voices (some browsers need this trigger)
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
}
