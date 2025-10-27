import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Award, Code2, Languages, FolderGit2 } from "lucide-react";
import { format } from "date-fns";

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const [year, month] = dateStr.split("-");
      return format(new Date(parseInt(year), parseInt(month) - 1), "MMM yyyy");
    } catch {
      return dateStr;
    }
  };

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: "bg-gray-300",
      intermediate: "bg-blue-400",
      advanced: "bg-indigo-500",
      expert: "bg-purple-600",
    };
    return colors[level as keyof typeof colors] || "bg-gray-300";
  };

  return (
    <div id="resume-preview" className="bg-white text-gray-900 p-8 shadow-strong rounded-lg max-w-[8.5in] mx-auto">
      {/* Header */}
      <div className="flex items-start gap-6 mb-6 pb-6 border-b-2 border-gray-200">
        {data.personalInfo.photo && (
          <img
            src={data.personalInfo.photo}
            alt={data.personalInfo.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {data.personalInfo.location}
              </div>
            )}
          </div>
          {(data.personalInfo.linkedin || data.personalInfo.portfolio) && (
            <div className="flex flex-wrap gap-3 text-sm text-indigo-600 mt-2">
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.portfolio && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {data.personalInfo.portfolio}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-line mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300 flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">{skill.name}</span>
                <span className="text-xs text-gray-600 capitalize">({skill.level})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5" />
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.date && (
                    <span className="text-sm text-gray-600">{formatDate(project.date)}</span>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Technologies:</span> {project.technologies}
                </p>
                {project.link && (
                  <p className="text-sm text-indigo-600">{project.link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certifications
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-600">ID: {cert.credentialId}</p>
                  )}
                </div>
                {cert.date && (
                  <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300 flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">{lang.name}</span>
                <span className="text-xs text-gray-600 capitalize">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
