import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skill } from "@/types/resume";
import { Plus, Trash2, Code2 } from "lucide-react";

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const addSkill = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        name: "",
        level: "intermediate",
      },
    ]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    onChange(data.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Skills</h2>
          <p className="text-sm text-muted-foreground">List your technical and professional skills</p>
        </div>
        <Button onClick={addSkill} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-lg border-2 border-dashed border-border">
          <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No skills added yet</p>
          <Button onClick={addSkill} variant="outline" size="sm">
            Add Your First Skill
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((skill) => (
            <div key={skill.id} className="p-4 bg-card rounded-lg border border-border flex items-center gap-4 shadow-soft">
              <div className="flex-1 space-y-3">
                <Input
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  placeholder="e.g., JavaScript, Leadership"
                  className="font-medium"
                />
                <Select
                  value={skill.level}
                  onValueChange={(value) => updateSkill(skill.id, { level: value as Skill["level"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => removeSkill(skill.id)}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
