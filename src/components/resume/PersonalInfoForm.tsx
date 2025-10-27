import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/types/resume";
import { Upload, User } from "lucide-react";
import { useRef } from "react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Personal Information</h2>
        <p className="text-sm text-muted-foreground">Let's start with your basic details</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-4 border-background shadow-medium">
            {data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-medium hover:scale-110 transition-transform"
          >
            <Upload className="w-4 h-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
        <p className="text-xs text-muted-foreground">Upload your professional photo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            placeholder="New York, NY"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin || ""}
            onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio/Website</Label>
          <Input
            id="portfolio"
            value={data.portfolio || ""}
            onChange={(e) => onChange({ ...data, portfolio: e.target.value })}
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary *</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          placeholder="Write a brief summary about yourself and your career goals..."
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  );
};
