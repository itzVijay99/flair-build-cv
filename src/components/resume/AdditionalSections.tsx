import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Certification, Project, Language } from "@/types/resume";
import { Plus, Trash2, Award, FolderGit2, Languages } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdditionalSectionsProps {
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  onCertificationsChange: (data: Certification[]) => void;
  onProjectsChange: (data: Project[]) => void;
  onLanguagesChange: (data: Language[]) => void;
}

export const AdditionalSections = ({
  certifications,
  projects,
  languages,
  onCertificationsChange,
  onProjectsChange,
  onLanguagesChange,
}: AdditionalSectionsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Additional Sections</h2>
        <p className="text-sm text-muted-foreground">Enhance your resume with certifications, projects, and languages</p>
      </div>

      <Tabs defaultValue="certifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
        </TabsList>

        <TabsContent value="certifications" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Add professional certifications</p>
            <Button
              onClick={() =>
                onCertificationsChange([
                  ...certifications,
                  { id: Date.now().toString(), name: "", issuer: "", date: "", credentialId: "" },
                ])
              }
              size="sm"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {certifications.length === 0 ? (
            <div className="text-center py-8 bg-secondary rounded-lg border-2 border-dashed border-border">
              <Award className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No certifications added</p>
            </div>
          ) : (
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 bg-card rounded-lg border border-border space-y-3 shadow-soft">
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                      <Input
                        value={cert.name}
                        onChange={(e) =>
                          onCertificationsChange(
                            certifications.map((c) => (c.id === cert.id ? { ...c, name: e.target.value } : c))
                          )
                        }
                        placeholder="Certification Name"
                      />
                      <Input
                        value={cert.issuer}
                        onChange={(e) =>
                          onCertificationsChange(
                            certifications.map((c) => (c.id === cert.id ? { ...c, issuer: e.target.value } : c))
                          )
                        }
                        placeholder="Issuing Organization"
                      />
                      <Input
                        type="month"
                        value={cert.date}
                        onChange={(e) =>
                          onCertificationsChange(
                            certifications.map((c) => (c.id === cert.id ? { ...c, date: e.target.value } : c))
                          )
                        }
                      />
                      <Input
                        value={cert.credentialId || ""}
                        onChange={(e) =>
                          onCertificationsChange(
                            certifications.map((c) => (c.id === cert.id ? { ...c, credentialId: e.target.value } : c))
                          )
                        }
                        placeholder="Credential ID (Optional)"
                      />
                    </div>
                    <Button
                      onClick={() => onCertificationsChange(certifications.filter((c) => c.id !== cert.id))}
                      variant="ghost"
                      size="sm"
                      className="text-destructive ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Showcase your projects</p>
            <Button
              onClick={() =>
                onProjectsChange([
                  ...projects,
                  { id: Date.now().toString(), name: "", description: "", technologies: "", link: "", date: "" },
                ])
              }
              size="sm"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-8 bg-secondary rounded-lg border-2 border-dashed border-border">
              <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No projects added</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 bg-card rounded-lg border border-border space-y-3 shadow-soft">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          value={project.name}
                          onChange={(e) =>
                            onProjectsChange(
                              projects.map((p) => (p.id === project.id ? { ...p, name: e.target.value } : p))
                            )
                          }
                          placeholder="Project Name"
                        />
                        <Input
                          type="month"
                          value={project.date}
                          onChange={(e) =>
                            onProjectsChange(
                              projects.map((p) => (p.id === project.id ? { ...p, date: e.target.value } : p))
                            )
                          }
                        />
                      </div>
                      <Textarea
                        value={project.description}
                        onChange={(e) =>
                          onProjectsChange(
                            projects.map((p) => (p.id === project.id ? { ...p, description: e.target.value } : p))
                          )
                        }
                        placeholder="Brief description of the project"
                        rows={2}
                      />
                      <Input
                        value={project.technologies}
                        onChange={(e) =>
                          onProjectsChange(
                            projects.map((p) => (p.id === project.id ? { ...p, technologies: e.target.value } : p))
                          )
                        }
                        placeholder="Technologies used (e.g., React, Node.js, MongoDB)"
                      />
                      <Input
                        value={project.link || ""}
                        onChange={(e) =>
                          onProjectsChange(
                            projects.map((p) => (p.id === project.id ? { ...p, link: e.target.value } : p))
                          )
                        }
                        placeholder="Project Link (Optional)"
                      />
                    </div>
                    <Button
                      onClick={() => onProjectsChange(projects.filter((p) => p.id !== project.id))}
                      variant="ghost"
                      size="sm"
                      className="text-destructive ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="languages" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Languages you speak</p>
            <Button
              onClick={() =>
                onLanguagesChange([...languages, { id: Date.now().toString(), name: "", proficiency: "conversational" }])
              }
              size="sm"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {languages.length === 0 ? (
            <div className="text-center py-8 bg-secondary rounded-lg border-2 border-dashed border-border">
              <Languages className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No languages added</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((lang) => (
                <div key={lang.id} className="p-4 bg-card rounded-lg border border-border flex items-center gap-3 shadow-soft">
                  <div className="flex-1 space-y-3">
                    <Input
                      value={lang.name}
                      onChange={(e) =>
                        onLanguagesChange(
                          languages.map((l) => (l.id === lang.id ? { ...l, name: e.target.value } : l))
                        )
                      }
                      placeholder="Language"
                    />
                    <Select
                      value={lang.proficiency}
                      onValueChange={(value) =>
                        onLanguagesChange(
                          languages.map((l) => (l.id === lang.id ? { ...l, proficiency: value as Language["proficiency"] } : l))
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="fluent">Fluent</SelectItem>
                        <SelectItem value="native">Native</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={() => onLanguagesChange(languages.filter((l) => l.id !== lang.id))}
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
