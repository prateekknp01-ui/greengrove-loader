import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Globe,
  Shield,
  Leaf,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [disabilityIs, setDisabilityIs] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [disabilityType, setDisabilityType] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to your dashboard…",
      });
      setTimeout(() => navigate("/dashboard"), 800);
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !phone.trim() || !password.trim() || !language) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Account Created!",
        description: "Registration successful. Redirecting to dashboard…",
      });
      setTimeout(() => navigate("/dashboard"), 800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-accent" />
            <span className="font-mono font-bold text-2xl tracking-wider text-accent">
              GRAMIN_INTEL
            </span>
          </div>
          <p className="text-primary-foreground/60 text-sm">
            {isLogin ? "Sign in to your account" : "Create your farmer profile"}
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="rounded-2xl border border-accent/20 bg-card/10 backdrop-blur-xl p-8 shadow-2xl shadow-black/20">
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
            {/* Registration-only fields */}
            {!isLogin && (
              <>
                {/* Username */}
                <div className="space-y-2">
                  <Label className="text-primary-foreground/80 text-sm">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                    <Input
                      placeholder="Enter your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 bg-card/10 border-accent/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="text-primary-foreground/80 text-sm">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                    <Input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 bg-card/10 border-accent/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-primary-foreground/80 text-sm">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-card/10 border-accent/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-primary-foreground/80 text-sm">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-card/10 border-accent/20 text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-accent/60 hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Registration-only: Language & Disability */}
            {!isLogin && (
              <>
                {/* Language */}
                <div className="space-y-2">
                  <Label className="text-primary-foreground/80 text-sm">Language Preference</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent z-10" />
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="pl-10 bg-card/10 border-accent/20 text-primary-foreground focus:ring-accent [&>span]:text-primary-foreground/60">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                        <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                        <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                        <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Disability toggle */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-accent" />
                    <Label className="text-primary-foreground/80 text-sm">
                      Are you a person with a disability?
                    </Label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setDisabilityIs(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        disabilityIs
                          ? "bg-accent text-accent-foreground"
                          : "bg-card/10 border border-accent/20 text-primary-foreground/60 hover:border-accent/40"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDisabilityIs(false);
                        setDisabilityType("");
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        !disabilityIs
                          ? "bg-accent text-accent-foreground"
                          : "bg-card/10 border border-accent/20 text-primary-foreground/60 hover:border-accent/40"
                      }`}
                    >
                      No
                    </button>
                  </div>

                  {/* Conditional disability type */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      disabilityIs ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <textarea
                      placeholder="Please specify your disability (e.g., Visual Impairment, Hearing Impairment)"
                      value={disabilityType}
                      onChange={(e) => setDisabilityType(e.target.value)}
                      rows={2}
                      className="w-full rounded-lg bg-card/10 border border-accent/20 text-primary-foreground placeholder:text-primary-foreground/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Forgot password (login only) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-accent/80 hover:text-accent text-xs transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 text-sm transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  {isLogin ? "Signing in…" : "Creating account…"}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Toggle login/register */}
          <div className="mt-6 text-center">
            <p className="text-primary-foreground/50 text-sm">
              {isLogin ? "New here?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent font-semibold hover:underline transition-colors"
              >
                {isLogin ? "Register" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
