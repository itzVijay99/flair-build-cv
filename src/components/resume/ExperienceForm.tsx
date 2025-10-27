import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Experience } from "@/types/resume";
import { Plus, Trash2, Briefcase } from "lucide-react";

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Work Experience</h2>
          <p className="text-sm text-muted-foreground">Add your professional experience</p>
        </div>
        <Button onClick={addExperience} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-lg border-2 border-dashed border-border">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No experience added yet</p>
          <Button onClick={addExperience} variant="outline" size="sm">
            Add Your First Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((exp, index) => (
            <div key={exp.id} className="p-6 bg-card rounded-lg border border-border space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Experience #{index + 1}</h3>
                <Button
                  onClick={() => removeExperience(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Tech Corp"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Position *</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) =>
                      updateExperience(exp.id, { current: checked as boolean, endDate: "" })
                    }
                  />
                  <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                    Currently working here
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="• Led development of key features&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 40%"
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
