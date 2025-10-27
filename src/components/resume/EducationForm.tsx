import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Education } from "@/types/resume";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        institution: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Education</h2>
          <p className="text-sm text-muted-foreground">Add your educational background</p>
        </div>
        <Button onClick={addEducation} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-lg border-2 border-dashed border-border">
          <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No education added yet</p>
          <Button onClick={addEducation} variant="outline" size="sm">
            Add Your Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((edu, index) => (
            <div key={edu.id} className="p-6 bg-card rounded-lg border border-border space-y-4 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Education #{index + 1}</h3>
                <Button
                  onClick={() => removeEducation(edu.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="University Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Field of Study *</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    placeholder="Boston, MA"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa || ""}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
