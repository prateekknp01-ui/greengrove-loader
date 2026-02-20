import { useAccessibility } from "@/contexts/AccessibilityContext";
import { ReactNode } from "react";

interface ReadableTextProps {
  children: ReactNode;
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const ReadableText = ({ children, text, className = "", as: Component = "div" }: ReadableTextProps) => {
  const { speakText, isReadAloudEnabled } = useAccessibility();

  return (
    <Component
      className={className}
      onMouseEnter={() => isReadAloudEnabled && speakText(text)}
    >
      {children}
    </Component>
  );
};

export default ReadableText;
