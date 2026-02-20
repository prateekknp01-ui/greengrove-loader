import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Wheat,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import AccessibilityBar from "@/components/AccessibilityBar";

interface ProfileData {
  username: string;
  email: string;
  phone: string;
  language: string;
  location: string;
  farmSize: string;
  primaryCrops: string[];
  hasDisability: boolean;
  disabilityType: string;
  joinedDate: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { speakText, isReadAloudEnabled } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState<ProfileData>({
    username: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    language: "hindi",
    location: "Pune, Maharashtra",
    farmSize: "5 acres",
    primaryCrops: ["Wheat", "Rice", "Cotton"],
    hasDisability: false,
    disabilityType: "",
    joinedDate: "2026-01-15",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    if (isReadAloudEnabled) {
      speakText(`Profile page. Welcome ${profile.username}`);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
    if (isReadAloudEnabled) {
      speakText("Edit mode enabled");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    if (isReadAloudEnabled) {
      speakText("Edit cancelled");
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setProfile(editedProfile);
      setIsEditing(false);
      setIsSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      if (isReadAloudEnabled) {
        speakText("Profile updated successfully");
      }
    }, 1000);
  };

  const handleFieldFocus = (fieldName: string) => {
    if (isReadAloudEnabled) {
      speakText(fieldName);
    }
  };

  const InfoCard = ({ icon: Icon, label, value, editable = false, field = "" }) => (
    <div
      className="group relative p-4 rounded-xl bg-card/60 border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => isReadAloudEnabled && speakText(`${label}: ${value}`)}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors duration-300">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          {isEditing && editable ? (
            <Input
              value={editedProfile[field]}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, [field]: e.target.value })
              }
              onFocus={() => handleFieldFocus(label)}
              className="h-8 text-sm bg-background"
            />
          ) : (
            <p className="text-sm font-medium text-foreground break-words">{value}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/dashboard")}
            onMouseEnter={() => isReadAloudEnabled && speakText("GRAMIN INTEL - Click to go to dashboard")}
          >
            <Leaf className="w-6 h-6 text-accent" />
            <span className="font-mono font-bold text-lg tracking-wider">GRAMIN_INTEL</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="text-primary-foreground hover:text-accent hover:bg-primary/80"
            onMouseEnter={() => isReadAloudEnabled && speakText("Back to Dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </header>

      <AccessibilityBar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold text-foreground mb-2"
              onMouseEnter={() => isReadAloudEnabled && speakText("Your Profile")}
            >
              Your Profile
            </h1>
            <p
              className="text-muted-foreground"
              onMouseEnter={() => isReadAloudEnabled && speakText("Manage your personal information and preferences")}
            >
              Manage your personal information and preferences
            </p>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="gap-2"
                  onMouseEnter={() => isReadAloudEnabled && speakText("Cancel")}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="gap-2"
                  onMouseEnter={() => isReadAloudEnabled && speakText("Save Changes")}
                >
                  {isSaving ? (
                    <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEdit}
                className="gap-2"
                onMouseEnter={() => isReadAloudEnabled && speakText("Edit Profile")}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div
              className="bg-card/60 border border-border rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => isReadAloudEnabled && speakText(`Profile Picture. ${profile.username}`)}
            >
              <div className="relative inline-block mb-4">
                <Avatar className="h-32 w-32 border-4 border-accent">
                  <AvatarFallback className="bg-primary text-accent font-bold text-4xl">
                    {profile.username.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
                    onMouseEnter={() => isReadAloudEnabled && speakText("Change profile picture")}
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{profile.username}</h2>
              <p className="text-sm text-muted-foreground mb-4">{profile.email}</p>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm"
                onMouseEnter={() => isReadAloudEnabled && speakText(`Member since ${new Date(profile.joinedDate).toLocaleDateString()}`)}
              >
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div
              className="mt-6 bg-card/60 border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => isReadAloudEnabled && speakText("Farm Statistics")}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Farm Statistics
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Farm Size</p>
                  <p className="text-xl font-bold text-foreground">{profile.farmSize}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Active Crops</p>
                  <p className="text-xl font-bold text-foreground">{profile.primaryCrops.length}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Support Requests</p>
                  <p className="text-xl font-bold text-foreground">12</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div
              className="bg-card/60 border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => isReadAloudEnabled && speakText("Personal Information")}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                  icon={User}
                  label="Full Name"
                  value={isEditing ? editedProfile.username : profile.username}
                  editable
                  field="username"
                />
                <InfoCard
                  icon={Mail}
                  label="Email Address"
                  value={isEditing ? editedProfile.email : profile.email}
                  editable
                  field="email"
                />
                <InfoCard
                  icon={Phone}
                  label="Phone Number"
                  value={isEditing ? editedProfile.phone : profile.phone}
                  editable
                  field="phone"
                />
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={isEditing ? editedProfile.location : profile.location}
                  editable
                  field="location"
                />
              </div>
            </div>

            <div
              className="bg-card/60 border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => isReadAloudEnabled && speakText("Farm Details")}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Farm Details</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Farm Size</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.farmSize}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, farmSize: e.target.value })
                      }
                      onFocus={() => handleFieldFocus("Farm Size")}
                      className="bg-background"
                    />
                  ) : (
                    <div
                      className="p-3 rounded-lg bg-background border border-border"
                      onMouseEnter={() => isReadAloudEnabled && speakText(`Farm Size: ${profile.farmSize}`)}
                    >
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Wheat className="w-4 h-4 text-accent" />
                        {profile.farmSize}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">Primary Crops</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.primaryCrops.join(", ")}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          primaryCrops: e.target.value.split(",").map((c) => c.trim()),
                        })
                      }
                      onFocus={() => handleFieldFocus("Primary Crops")}
                      placeholder="Comma separated crops"
                      className="bg-background"
                    />
                  ) : (
                    <div
                      className="flex flex-wrap gap-2"
                      onMouseEnter={() => isReadAloudEnabled && speakText(`Primary Crops: ${profile.primaryCrops.join(", ")}`)}
                    >
                      {profile.primaryCrops.map((crop, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="bg-card/60 border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => isReadAloudEnabled && speakText("Preferences and Accessibility")}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                    <Globe className="w-4 h-4 text-accent" />
                    Language Preference
                  </Label>
                  {isEditing ? (
                    <Select
                      value={editedProfile.language}
                      onValueChange={(value) =>
                        setEditedProfile({ ...editedProfile, language: value })
                      }
                    >
                      <SelectTrigger
                        className="bg-background"
                        onFocus={() => handleFieldFocus("Language Preference")}
                      >
                        <SelectValue />
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
                  ) : (
                    <div
                      className="p-3 rounded-lg bg-background border border-border"
                      onMouseEnter={() => isReadAloudEnabled && speakText(`Language: ${profile.language}`)}
                    >
                      <p className="text-sm font-medium text-foreground capitalize">
                        {profile.language}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    Accessibility Information
                  </Label>
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setEditedProfile({ ...editedProfile, hasDisability: true })
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            editedProfile.hasDisability
                              ? "bg-accent text-accent-foreground"
                              : "bg-background border border-border hover:border-accent/40"
                          }`}
                        >
                          Has Disability
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setEditedProfile({
                              ...editedProfile,
                              hasDisability: false,
                              disabilityType: "",
                            })
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            !editedProfile.hasDisability
                              ? "bg-accent text-accent-foreground"
                              : "bg-background border border-border hover:border-accent/40"
                          }`}
                        >
                          No Disability
                        </button>
                      </div>
                      {editedProfile.hasDisability && (
                        <Textarea
                          placeholder="Please specify disability type"
                          value={editedProfile.disabilityType}
                          onChange={(e) =>
                            setEditedProfile({
                              ...editedProfile,
                              disabilityType: e.target.value,
                            })
                          }
                          onFocus={() => handleFieldFocus("Disability Type")}
                          className="bg-background"
                          rows={2}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className="p-3 rounded-lg bg-background border border-border"
                      onMouseEnter={() => isReadAloudEnabled && speakText(
                        profile.hasDisability
                          ? `Disability type: ${profile.disabilityType || "Not specified"}`
                          : "No disability specified"
                      )}
                    >
                      <p className="text-sm font-medium text-foreground">
                        {profile.hasDisability
                          ? profile.disabilityType || "Specified"
                          : "None"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-8 text-center border-t border-border mt-10">
        <p
          className="text-sm text-muted-foreground"
          onMouseEnter={() => isReadAloudEnabled && speakText("© 2026 GRAMIN INTEL — Empowering Rural Intelligence")}
        >
          © 2026 GRAMIN_INTEL — Empowering Rural Intelligence
        </p>
      </footer>
    </div>
  );
};

export default Profile;
