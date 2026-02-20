import { useState } from "react";
import {
  Leaf,
  CloudSun,
  Droplets,
  Phone,
  MessageCircle,
  User,
  Thermometer,
  CloudRain,
  
  ArrowRight,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardCard {
  id: string;
  icon: React.ElementType;
  title: string;
  summary: string;
  details: React.ReactNode;
}

const cards: DashboardCard[] = [
  {
    id: "weather",
    icon: CloudSun,
    title: "Weather",
    summary: "Current conditions for your area",
    details: (
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-accent" />
          <span className="text-sm text-foreground font-medium">32°C — Partly Cloudy</span>
        </div>
        <div className="flex items-center gap-3">
          <CloudRain className="w-5 h-5 text-accent" />
          <span className="text-sm text-foreground font-medium">Rain Alert: 60% chance tomorrow</span>
        </div>
        <Button size="sm" className="mt-1 w-fit">
          View 7-Day Forecast <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    ),
  },
  {
    id: "soil",
    icon: Droplets,
    title: "Soil Type",
    summary: "Know your land better",
    details: (
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex items-center gap-3">
          <Leaf className="w-5 h-5 text-accent" />
          <span className="text-sm text-foreground font-medium">Type: Alluvial / Black Soil</span>
        </div>
        <div className="flex items-center gap-3">
          <Droplets className="w-5 h-5 text-accent" />
          <span className="text-sm text-foreground font-medium">PH Level: 6.8 (Optimal)</span>
        </div>
        <Button size="sm" className="mt-1 w-fit">
          Get Soil Report <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    ),
  },
  {
    id: "call",
    icon: Phone,
    title: "Call Support",
    summary: "Speak to an expert agronomist",
    details: (
      <div className="flex flex-col gap-3 mt-3">
        <p className="text-sm text-muted-foreground">
          Connect with a certified Digital Agronomist for personalised crop guidance.
        </p>
        <Button size="sm" className="mt-1 w-fit">
          <Phone className="w-4 h-4 mr-1" /> Call Digital Agronomist
        </Button>
      </div>
    ),
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp Help",
    summary: "Get help on WhatsApp instantly",
    details: (
      <div className="flex flex-col gap-3 mt-3">
        <p className="text-sm text-muted-foreground">
          Chat with our support team on WhatsApp for quick answers in your language.
        </p>
        <Button
          size="sm"
          className="mt-1 w-fit"
          asChild
        >
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 mr-1" /> Chat on WhatsApp
          </a>
        </Button>
      </div>
    ),
  },
];

const Dashboard = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-accent" />
            <span className="font-mono font-bold text-lg tracking-wider">GRAMIN_INTEL</span>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-accent">
              <AvatarFallback className="bg-primary text-accent font-bold text-sm">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-xs text-primary-foreground/60 leading-none">Welcome,</p>
              <p className="text-sm font-semibold text-accent leading-tight">Rajesh Kumar</p>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Dashboard</h2>
        <p className="text-muted-foreground mb-8">Quick access to tools that help you farm smarter.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card) => {
            const isExpanded = expanded === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setExpanded(isExpanded ? null : card.id)}
                className={`
                  relative cursor-pointer rounded-xl border border-border
                  bg-card/60 backdrop-blur-sm p-6
                  transition-all duration-300 ease-in-out
                  hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/10 hover:border-accent/40
                  ${isExpanded ? "scale-[1.03] shadow-xl shadow-accent/10 border-accent/40" : ""}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <card.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.summary}</p>
                  </div>
                </div>

                {/* Expandable details */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-3 border-t border-border">{card.details}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          © 2026 GRAMIN_INTEL — Empowering Rural Intelligence
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
