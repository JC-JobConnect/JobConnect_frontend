import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiFileText,
  FiDownload,
  FiBookOpen, 
  FiBriefcase, 
  FiCode, 
} from "react-icons/fi";
import jobsApi from "../../Services/JobApi";


const SKILL_LEVEL_STYLES = {
  Beginner:
    "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Intermediate:
    "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Advanced:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};


const SectionCard = ({ icon: Icon, title, count, children }) => (
  <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
        <Icon className="text-teal-500" />
        {title}
      </h2>
      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-teal-900/30 text-slate-500 dark:text-teal-300">
        {count}
      </span>
    </div>
    {children}
  </div>
);


const EmptyText = ({ children }) => (
  <p className="text-sm text-slate-400">{children}</p>
);

const AdminUserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await jobsApi.get(`v1/admin/users/${id}/`);
        setUser(data);
      } catch (err) {
        setError(
          err.response?.data?.detail || "Failed to load user profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#071A19] flex items-center justify-center">
        <p className="text-slate-500">Loading user profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#071A19] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || "User not found"}</p>
        <Link
          to="/admin/users"
          className="text-teal-600 hover:underline flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Users
        </Link>
      </div>
    );
  }

  const profile = user; 


  const educations = user.educations || [];
  const experiences = user.experiences || [];
  const skills = user.skills || [];

  const fullName =
    profile.full_name ||
    [user.first_name, user.last_name].filter(Boolean).join(" ") ||
    user.username;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#071A19] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6"
        >
          <FiArrowLeft /> Back to All Users
        </Link>

        {/* Profile Header */}
        <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 overflow-hidden shadow-sm mb-6">
          <div className="h-32 bg-linear-to-r from-teal-500 to-emerald-500" />

          <div className="px-6 pb-6 -mt-12 flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full border-4 border-white dark:border-[#0F2A28] overflow-hidden bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-3xl font-bold text-teal-700 dark:text-teal-300">
              {profile.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                fullName.charAt(0).toUpperCase()
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {fullName}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                @{user.username}
              </p>
              {profile.headline && (
                <p className="mt-1 text-teal-600 dark:text-teal-400 font-medium">
                  {profile.headline}
                </p>
              )}
            </div>

            <div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.is_active
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {user.is_active ? "Active" : "Blocked"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMail className="text-teal-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-white break-all">
                      {user.email || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone className="text-teal-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {profile.phone || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="text-teal-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Location</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {profile.location || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiUser className="text-teal-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400">Joined</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {new Date(user.date_joined).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Card */}
            <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Resume / CV
              </h2>

              {profile.cv ? (
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-800 flex items-center justify-center">
                      <FiFileText className="text-teal-600 dark:text-teal-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">
                        CV Document
                      </p>
                      <p className="text-xs text-slate-500">PDF File</p>
                    </div>
                  </div>

                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition"
                  >
                    <FiDownload size={14} />
                    View
                  </a>
                </div>
              ) : (
                <p className="text-sm text-slate-400">No CV uploaded</p>
              )}
            </div>

            {/* NEW: Skills card in the left column  */}
            <SectionCard icon={FiCode} title="Skills" count={skills.length}>
              {skills.length === 0 ? (
                <EmptyText>No skills added</EmptyText>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                
                    <span
                      key={skill.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                        SKILL_LEVEL_STYLES[skill.skill_level] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {skill.skill_name}
                      <span className="text-xs opacity-70">
                        · {skill.skill_level}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </SectionCard>
          </div>

          {/* Right Column - About + Education + Experience */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#0F2A28] rounded-2xl border border-slate-200 dark:border-teal-900/40 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                About
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {profile.bio || "No bio added yet."}
              </p>
            </div>

            {/* NEW: Education */}
            <SectionCard
              icon={FiBookOpen}
              title="Education"
              count={educations.length}
            >
              {educations.length === 0 ? (
                <EmptyText>No education added</EmptyText>
              ) : (
                <div className="space-y-4">
                  {educations.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-teal-900/10 border border-slate-100 dark:border-teal-900/30"
                    >
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {edu.degree}
                      </p>
                      <p className="text-sm text-teal-600 dark:text-teal-400">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {edu.field_of_study}
                        {edu.result && ` · Result: ${edu.result}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* NEW: Experience */}
            <SectionCard
              icon={FiBriefcase}
              title="Experience"
              count={experiences.length}
            >
              {experiences.length === 0 ? (
                <EmptyText>No experience added</EmptyText>
              ) : (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-teal-900/10 border border-slate-100 dark:border-teal-900/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {exp.job_title}
                          </p>
                          <p className="text-sm text-teal-600 dark:text-teal-400">
                            {exp.company_name}
                          </p>
                        </div>

                        {exp.currently_working && (
                          <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            Current
                          </span>
                        )}
                      </div>

                      {exp.responsibilities && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                          {exp.responsibilities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;