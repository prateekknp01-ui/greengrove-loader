import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  isReadAloudEnabled: boolean;
  toggleReadAloud: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState(100);
  const [isReadAloudEnabled, setIsReadAloudEnabled] = useState(false);
  const [synthesis] = useState(() => window.speechSynthesis);

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setFontSize(settings.fontSize || 100);
      setIsReadAloudEnabled(settings.isReadAloudEnabled || false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "accessibility-settings",
      JSON.stringify({ fontSize, isReadAloudEnabled })
    );
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize, isReadAloudEnabled]);

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, 150));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, 80));
  };

  const resetFontSize = () => {
    setFontSize(100);
  };

  const toggleReadAloud = () => {
    setIsReadAloudEnabled((prev) => !prev);
    if (isReadAloudEnabled) {
      stopSpeaking();
    }
  };

  const speakText = (text: string) => {
    if (!isReadAloudEnabled || !synthesis) return;

    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    synthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        isReadAloudEnabled,
        toggleReadAloud,
        speakText,
        stopSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
