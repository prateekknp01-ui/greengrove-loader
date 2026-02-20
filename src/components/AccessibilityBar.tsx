import { Volume2, VolumeX, Type, Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AccessibilityBar = () => {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    isReadAloudEnabled,
    toggleReadAloud,
  } = useAccessibility();

  return (
    <div className="bg-secondary/50 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground mr-2 hidden sm:inline">
              Accessibility
            </span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleReadAloud}
                    className="h-8 px-3 gap-1.5 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    {isReadAloudEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                    <span className="text-xs hidden sm:inline">
                      {isReadAloudEnabled ? "Read Aloud On" : "Read Aloud Off"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle read aloud for accessibility</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center gap-1">
            <Type className="w-4 h-4 text-muted-foreground mr-1" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 80}
                    className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Decrease text size</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-xs font-medium text-foreground min-w-[3rem] text-center">
              {fontSize}%
            </span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseFontSize}
                    disabled={fontSize >= 150}
                    className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Increase text size</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFontSize}
                    className="h-8 w-8 p-0 ml-1 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset to default</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;
