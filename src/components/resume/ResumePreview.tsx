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

  const getLevelWidth = (level: string) => {
    const widths = {
      beginner: "25%",
      intermediate: "50%",
      advanced: "75%",
      expert: "100%",
    };
    return widths[level as keyof typeof widths] || "25%";
  };

  const getInitials = (name: string) => {
    if (!name) return "UN";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div id="resume-preview" className="bg-white text-gray-900 p-6 sm:p-8 shadow-strong rounded-lg max-w-[8.5in] mx-auto border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-5 pb-5 border-b-2 border-indigo-100">
        <div className="flex-shrink-0">
          {data.personalInfo.photo ? (
            <img
              src={data.personalInfo.photo}
              alt={data.personalInfo.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-4 border-indigo-500 shadow-md">
              <span className="text-white text-2xl sm:text-3xl font-bold">
                {getInitials(data.personalInfo.fullName)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 break-words">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
          {(data.personalInfo.linkedin || data.personalInfo.portfolio) && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm mt-2">
              {data.personalInfo.linkedin && (
                <a 
                  href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.linkedin}</span>
                </a>
              )}
              {data.personalInfo.portfolio && (
                <a 
                  href={data.personalInfo.portfolio.startsWith('http') ? data.personalInfo.portfolio : `https://${data.personalInfo.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">{data.personalInfo.portfolio}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2 pb-2 border-b-2 border-indigo-100">
            Professional Summary
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2 pb-2 border-b-2 border-indigo-100">
            Work Experience
          </h2>
          <div className="space-y-3.5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{exp.position}</h3>
                    <p className="text-gray-700 text-sm">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-line mt-1.5 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2 pb-2 border-b-2 border-indigo-100">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700 text-sm">{edu.institution}{edu.location && `, ${edu.location}`}</p>
                    {edu.gpa && <p className="text-xs sm:text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 flex-shrink-0">
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
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.skills.map((skill) => (
              <div key={skill.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium text-sm">{skill.name}</span>
                  <span className="text-xs text-gray-600 capitalize">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: getLevelWidth(skill.level) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5" />
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{project.name}</h3>
                  {project.date && (
                    <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">{formatDate(project.date)}</span>
                  )}
                </div>
                <p className="text-gray-700 text-xs sm:text-sm mb-1.5 leading-relaxed">{project.description}</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Technologies:</span> {project.technologies}
                </p>
                {project.link && (
                  <a 
                    href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 hover:underline break-all transition-colors"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            Certifications
          </h2>
          <div className="space-y-2.5">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{cert.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-700">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-600">ID: {cert.credentialId}</p>
                  )}
                </div>
                {cert.date && (
                  <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">{formatDate(cert.date)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-2 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
            <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
            Languages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-gray-900 font-medium text-sm">{lang.name}</span>
                <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full capitalize">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
