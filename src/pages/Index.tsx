import { useState } from "react";
import { ResumeData, PersonalInfo, Experience, Education, Skill, Certification, Project, Language } from "@/types/resume";
import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
import { ExperienceForm } from "@/components/resume/ExperienceForm";
import { EducationForm } from "@/components/resume/EducationForm";
import { SkillsForm } from "@/components/resume/SkillsForm";
import { AdditionalSections } from "@/components/resume/AdditionalSections";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      photo: "",
      linkedin: "",
      portfolio: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
  });

  const steps = [
    { title: "Personal Info" },
    { title: "Experience" },
    { title: "Education" },
    { title: "Skills" },
    { title: "Additional" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDownload = () => {
    window.print();
    toast.success("Use your browser's 'Save as PDF' option to download!");
  };

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  OptiHire Resume Builder
                </h1>
                <p className="text-xs text-muted-foreground">Create ATS-friendly professional resumes</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" />
                Print
              </Button>
              <Button onClick={handleDownload} size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex items-center gap-2 transition-all ${
                  index === currentStep
                    ? "text-primary font-semibold"
                    : index < currentStep
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    index === currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : index < currentStep
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-muted-foreground bg-background"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="hidden sm:inline text-sm">{step.title}</span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground hidden md:block ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-medium p-6 border border-border">
              {currentStep === 0 && (
                <PersonalInfoForm
                  data={resumeData.personalInfo}
                  onChange={(data: PersonalInfo) => setResumeData({ ...resumeData, personalInfo: data })}
                />
              )}
              {currentStep === 1 && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data: Experience[]) => setResumeData({ ...resumeData, experience: data })}
                />
              )}
              {currentStep === 2 && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(data: Education[]) => setResumeData({ ...resumeData, education: data })}
                />
              )}
              {currentStep === 3 && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data: Skill[]) => setResumeData({ ...resumeData, skills: data })}
                />
              )}
              {currentStep === 4 && (
                <AdditionalSections
                  certifications={resumeData.certifications}
                  projects={resumeData.projects}
                  languages={resumeData.languages}
                  onCertificationsChange={(data: Certification[]) =>
                    setResumeData({ ...resumeData, certifications: data })
                  }
                  onProjectsChange={(data: Project[]) => setResumeData({ ...resumeData, projects: data })}
                  onLanguagesChange={(data: Language[]) => setResumeData({ ...resumeData, languages: data })}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button onClick={handlePrevious} variant="outline" disabled={currentStep === 0} className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={currentStep === steps.length - 1} className="gap-2">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card rounded-xl shadow-strong p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Live Preview</h2>
                <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  Updates in real-time
                </span>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <ResumePreview data={resumeData} />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
