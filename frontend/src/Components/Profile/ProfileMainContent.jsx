import { useEffect, useRef, useState } from "react";

import {
  updateProfile,
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../../Services/ProfileApi";

const API_ORIGIN = import.meta.env.VITE_API_URL;
const getMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

const getListData = (data) => {
  if (Array.isArray(data)) return data;
  return data?.results || [];
};

// ==========================================
// REUSABLE SECTION CARD
// ==========================================

const SectionCard = ({ title, children, onEdit, onAdd, showAdd = false }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-teal-900/60 dark:bg-[#0B2421] sm:p-7">
    <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-teal-900">
      <h2 className="text-lg font-bold text-slate-800 dark:text-white">
        {title}
      </h2>

      <div className="flex items-center gap-2">
        {showAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            Add
          </button>
        )}

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-green-500 px-4 py-2 text-xs font-medium text-green-600 transition hover:bg-green-600 hover:text-white dark:border-teal-500 dark:text-teal-400 dark:hover:bg-teal-600 dark:hover:text-white cursor-pointer"
          >
            Edit
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l4 4M5 19l4-.8L20 7a2 2 0 00-3-3L6 15l-1 4z" />
            </svg>
          </button>
        )}
      </div>
    </div>

    {children}
  </section>
);

// ==========================================
// EMPTY STATE
// ==========================================

const EmptyState = ({ text }) => (
  <div className="flex min-h-24 items-center justify-center text-center text-sm text-slate-400 dark:text-slate-500">
    {text}
  </div>
);

// ==========================================
// FIELD COMPONENT
// ==========================================

const Field = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
      {label}
    </p>

    <p className="wrap-break-words text-sm font-medium text-slate-800 dark:text-slate-200">
      {value || "---"}
    </p>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

const ProfileMainContent = ({ profileData, onProfileUpdate }) => {
  // ----------------------------------------
  // REFS
  // ----------------------------------------

  const fileInputRef = useRef(null);

  // ----------------------------------------
  // STATES
  // ----------------------------------------

  const [profile, setProfile] = useState(profileData || {});

  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [profileModal, setProfileModal] = useState(false);

  const [profileForm, setProfileForm] = useState({
    full_name: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
  });

  const [modalType, setModalType] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const [cvFile, setCvFile] = useState(null);

  // ----------------------------------------
  // PROFILE SYNC
  // ----------------------------------------

  useEffect(() => {
    setProfile(profileData || {});

    setProfileForm({
      full_name: profileData?.full_name || "",
      phone: profileData?.phone || "",
      location: profileData?.location || "",
      headline: profileData?.headline || "",
      bio: profileData?.bio || "",
    });
  }, [profileData]);

  // ----------------------------------------
  // FETCH ALL DATA
  // ----------------------------------------

  const fetchData = async () => {
    try {
      setLoading(true);

      const [educationRes, experienceRes, skillRes] = await Promise.all([
        getEducation(),
        getExperience(),
        getSkill(),
      ]);

      setEducations(getListData(educationRes.data));
      setExperiences(getListData(experienceRes.data));
      setSkills(getListData(skillRes.data));
    } catch (error) {
      console.error(
        "Profile data error:",
        error.response?.data || error
      );

      showMessage("Unable to load profile information.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ----------------------------------------
  // MESSAGE
  // ----------------------------------------

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
  };

  // ----------------------------------------
  // PROFILE EDIT
  // ----------------------------------------

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateProfile(profileForm);

      setProfile(response.data);
      onProfileUpdate?.(response.data);

      setProfileModal(false);

      showMessage("Personal information updated successfully.");
    } catch (error) {
      console.error(
        "Profile update error:",
        error.response?.data || error
      );

      showMessage(
        error.response?.data?.detail ||
          "Unable to update personal information.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------
  // OPEN ADD / EDIT MODAL
  // ----------------------------------------

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingId(item?.id || null);

    if (type === "education") {
      setForm({
        degree: item?.degree || "",
        institution: item?.institution || "",
        field_of_study: item?.field_of_study || "",
        result: item?.result || "",
      });
    }

    if (type === "experience") {
      setForm({
        job_title: item?.job_title || "",
        company_name: item?.company_name || "",
        currently_working: item?.currently_working || false,
        responsibilities: item?.responsibilities || "",
      });
    }

    if (type === "skill") {
      setForm({
        skill_name: item?.skill_name || "",
        skill_level: item?.skill_level || "Beginner",
      });
    }
  };

  const closeModal = () => {
    setModalType("");
    setEditingId(null);
    setForm({});
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ----------------------------------------
  // SAVE EDUCATION / EXPERIENCE / SKILLS
  // ----------------------------------------

  const handleSaveItem = async (e) => {
    e.preventDefault();

    const currentType = modalType;
    const isEditing = Boolean(editingId);

    try {
      setSaving(true);

      if (currentType === "education") {
        if (isEditing) {
          await updateEducation(editingId, form);
        } else {
          await addEducation(form);
        }
      }

      if (currentType === "experience") {
        if (isEditing) {
          await updateExperience(editingId, form);
        } else {
          await addExperience(form);
        }
      }

      if (currentType === "skill") {
        if (isEditing) {
          await updateSkill(editingId, form);
        } else {
          await addSkill(form);
        }
      }

      closeModal();
      await fetchData();

      showMessage(
        `${currentType.charAt(0).toUpperCase() + currentType.slice(1)} ${
          isEditing ? "updated" : "added"
        } successfully.`
      );
    } catch (error) {
      console.error("Save error:", error.response?.data || error);

      const data = error.response?.data;

      const errorText = data
        ? Object.entries(data)
            .map(([key, value]) =>
              `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
            )
            .join(" | ")
        : "Unable to save information.";

      showMessage(errorText, "error");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------
  // DELETE ITEM
  // ----------------------------------------

  const handleDeleteItem = async (type, id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );

    if (!confirmed) return;

    try {
      if (type === "education") await deleteEducation(id);
      if (type === "experience") await deleteExperience(id);
      if (type === "skill") await deleteSkill(id);

      await fetchData();

      showMessage(`${type} deleted successfully.`);
    } catch (error) {
      console.error("Delete error:", error.response?.data || error);

      showMessage(`Unable to delete ${type}.`, "error");
    }
  };

  // ----------------------------------------
  // CV SELECT
  // ----------------------------------------

  const handleCVChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      showMessage("Only PDF files are allowed.", "error");
      e.target.value = "";
      return;
    }

    if (file.size > 250 * 1024) {
      showMessage("CV must be 250 KB or smaller.", "error");
      e.target.value = "";
      return;
    }

    setCvFile(file);
    setMessage({ type: "", text: "" });
  };

  // ----------------------------------------
  // CV UPLOAD
  // ----------------------------------------

  const handleUploadCV = async () => {
    if (!cvFile) {
      showMessage("Please select a PDF file first.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvFile);

    try {
      setUploadingCV(true);

      const response = await updateProfile(formData);

      setProfile(response.data);
      onProfileUpdate?.(response.data);

      setCvFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      showMessage("CV uploaded successfully.");
    } catch (error) {
      console.error("CV upload error:", error.response?.data || error);

      const cvError = error.response?.data?.cv;

      showMessage(
        Array.isArray(cvError)
          ? cvError.join(" ")
          : error.response?.data?.detail || "Unable to upload CV.",
        "error"
      );
    } finally {
      setUploadingCV(false);
    }
  };

  // ----------------------------------------
  // FORM CONFIGURATION
  // ----------------------------------------

  const modalFields = {
    education: [
      {
        name: "degree",
        label: "Degree",
        placeholder: "e.g. BSc in Computer Science",
      },
      {
        name: "institution",
        label: "Institution Name",
        placeholder: "e.g. University Name",
      },
      {
        name: "field_of_study",
        label: "Field of Study",
        placeholder: "e.g. Computer Science",
      },
      {
        name: "result",
        label: "Result",
        placeholder: "e.g. CGPA 3.80",
      },
    ],

    experience: [
      {
        name: "job_title",
        label: "Job Title",
        placeholder: "e.g. Frontend Developer",
      },
      {
        name: "company_name",
        label: "Company Name",
        placeholder: "e.g. Company Name",
      },
    ],

    skill: [
      {
        name: "skill_name",
        label: "Skill Name",
        placeholder: "e.g. React.js",
      },
    ],
  };

  // ----------------------------------------
  // LOADING
  // ----------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Loading your profile information...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // MAIN UI
  // ========================================

  return (
    <div className="space-y-6">
      {/* ALERT MESSAGE */}

      {message.text && (
        <div
          role="alert"
          className={`flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${
            message.type === "error"
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
              : "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300"
          }`}
        >
          <span>{message.text}</span>

          <button
            type="button"
            onClick={() => setMessage({ type: "", text: "" })}
            className="font-bold cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* PERSONAL INFORMATION */}

      <SectionCard
        title="Personal Information"
        onEdit={() => setProfileModal(true)}
      >
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          <Field label="Full Name" value={profile?.full_name} />
          <Field label="Email Address" value={profile?.email} />
          <Field label="Mobile Number" value={profile?.phone} />
          <Field label="Home Address" value={profile?.location} />
          <Field
            label="Professional Headline"
            value={profile?.headline}
          />
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5 dark:border-teal-900">
          <Field
            label="About Me"
            value={profile?.bio || "No description added yet."}
          />
        </div>
      </SectionCard>

      {/* EDUCATION */}

      <SectionCard
        title="Educational Qualification"
        showAdd
        onAdd={() => openModal("education")}
      >
        {educations.length === 0 ? (
          <EmptyState text="No educational information available. Add your qualifications to complete your profile." />
        ) : (
          <div className="space-y-5">
            {educations.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 last:border-0 last:pb-0 dark:border-teal-900 sm:flex-row"
              >
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-teal-900/50 dark:text-teal-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-5 9 5-9 5-9-5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12v5c3 2 7 2 10 0v-5M21 10v6" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {item.degree}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {item.institution}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {item.field_of_study}
                    </p>

                    {item.result && (
                      <p className="mt-2 text-xs font-medium text-green-600 dark:text-teal-400">
                        Result: {item.result}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-start">
                  <button
                    type="button"
                    onClick={() => openModal("education", item)}
                    className="text-sm font-medium text-green-600 hover:text-green-800 dark:text-teal-400 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem("education", item.id)}
                    className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* EXPERIENCE */}

      <SectionCard
        title="Professional Experience"
        showAdd
        onAdd={() => openModal("experience")}
      >
        {experiences.length === 0 ? (
          <EmptyState text="No professional experience available. Add your work experience here." />
        ) : (
          <div className="space-y-5">
            {experiences.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 last:border-0 last:pb-0 dark:border-teal-900 sm:flex-row"
              >
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-teal-900/50 dark:text-teal-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="7" width="18" height="14" rx="2" />
                      <path strokeLinecap="round" d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      {item.job_title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {item.company_name}
                    </p>

                    {item.currently_working && (
                      <span className="mt-2 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-teal-900/50 dark:text-teal-300">
                        Currently Working
                      </span>
                    )}

                    {item.responsibilities && (
                      <p className="mt-2 max-w-2xl whitespace-pre-line text-sm text-slate-500 dark:text-slate-400">
                        {item.responsibilities}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-start">
                  <button
                    type="button"
                    onClick={() => openModal("experience", item)}
                    className="text-sm font-medium text-green-600 hover:text-green-800 dark:text-teal-400 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem("experience", item.id)}
                    className="text-sm font-medium text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* SKILLS */}

      <SectionCard
        title="Other Skills"
        showAdd
        onAdd={() => openModal("skill")}
      >
        {skills.length === 0 ? (
          <EmptyState text="No skills available. Add your professional skills." />
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-green-100 bg-green-50/70 px-4 py-3 dark:border-teal-900 dark:bg-teal-950/40"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {item.skill_name}
                  </p>

                  <p className="mt-0.5 text-xs text-green-700 dark:text-teal-400">
                    {item.skill_level}
                  </p>
                </div>

                <div className="flex flex-col gap-1 border-l border-green-200 pl-3 dark:border-teal-800">
                  <button
                    type="button"
                    onClick={() => openModal("skill", item)}
                    className="text-xs font-medium text-green-600 hover:text-green-800 dark:text-teal-400 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem("skill", item.id)}
                    className="text-xs font-medium text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* YOUR CV */}

      <SectionCard title="Your CV">
        <div className="space-y-5">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleCVChange}
          />

          {profile?.cv ? (
            <div className="flex flex-col gap-4 rounded-xl border border-teal-200 bg-teal-50/50 p-4 dark:border-teal-900 dark:bg-teal-950/20 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-lg bg-teal-100 p-3 dark:bg-teal-900">
                  <svg className="h-6 w-6 text-teal-600 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M8 13h8M8 17h8" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-white">
                    CV Uploaded Successfully
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    PDF Document
                  </p>
                </div>
              </div>

              <a
                href={getMediaUrl(profile.cv)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View CV
              </a>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-teal-900">
              <svg className="mx-auto mb-3 h-10 w-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5l5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
              </svg>

              <p className="font-medium text-slate-700 dark:text-slate-200">
                No CV uploaded yet
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Upload your CV in PDF format (Maximum 250 KB)
              </p>
            </div>
          )}

          {cvFile && (
            <div className="flex flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-teal-900 dark:bg-teal-950/30 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {cvFile.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {(cvFile.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCvFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="text-sm font-medium text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingCV}
              className="inline-flex items-center gap-2 rounded-lg border border-teal-500 px-5 py-2.5 text-sm font-semibold text-teal-600 transition hover:bg-teal-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-teal-400 cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5l5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
              </svg>
              {profile?.cv ? "Replace CV" : "Choose CV"}
            </button>

            {cvFile && (
              <button
                type="button"
                onClick={handleUploadCV}
                disabled={uploadingCV}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploadingCV ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  "Upload CV"
                )}
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Accepted format: PDF. Maximum file size: 250 KB.
          </p>
        </div>
      </SectionCard>

      {/* PERSONAL INFORMATION MODAL */}

      {profileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#0B2421]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Edit Personal Information
              </h2>

              <button
                type="button"
                onClick={() => setProfileModal(false)}
                className="text-2xl text-slate-400 hover:text-red-500 cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { name: "full_name", label: "Full Name" },
                  { name: "phone", label: "Mobile Number" },
                  { name: "location", label: "Home Address" },
                  { name: "headline", label: "Professional Headline" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      {field.label}
                    </label>

                    <input
                      type="text"
                      name={field.name}
                      value={profileForm[field.name]}
                      onChange={handleProfileChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-teal-800 dark:bg-[#071A19] dark:text-white dark:focus:ring-teal-900"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>

                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 dark:border-teal-900 dark:bg-[#102E29] dark:text-slate-400"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Email is managed through your account settings.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  About Me
                </label>

                <textarea
                  name="bio"
                  value={profileForm.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  placeholder="Write something about yourself..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-teal-800 dark:bg-[#071A19] dark:text-white dark:focus:ring-teal-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setProfileModal(false)}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-teal-800 dark:text-slate-300 dark:hover:bg-teal-950 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDUCATION / EXPERIENCE / SKILL MODAL */}

      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#0B2421]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold capitalize text-slate-800 dark:text-white">
                {editingId ? "Edit" : "Add"} {modalType}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="text-2xl text-slate-400 hover:text-red-500 cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {modalFields[modalType]?.map((field) => (
                <div key={field.name}>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {field.label}
                  </label>

                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name] || ""}
                    onChange={handleFormChange}
                    placeholder={field.placeholder}
                    required={field.name !== "result"}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-teal-800 dark:bg-[#071A19] dark:text-white dark:focus:ring-teal-900"
                  />
                </div>
              ))}

              {modalType === "experience" && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Responsibilities
                    </label>

                    <textarea
                      name="responsibilities"
                      value={form.responsibilities || ""}
                      onChange={handleFormChange}
                      rows="4"
                      placeholder="Describe your responsibilities..."
                      className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-green-500 dark:border-teal-800 dark:bg-[#071A19] dark:text-white"
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      name="currently_working"
                      checked={Boolean(form.currently_working)}
                      onChange={handleFormChange}
                      className="h-4 w-4 accent-green-600"
                    />
                    I currently work here
                  </label>
                </>
              )}

              {modalType === "skill" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Skill Level
                  </label>

                  <select
                    name="skill_level"
                    value={form.skill_level || "Beginner"}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-green-500 dark:border-teal-800 dark:bg-[#071A19] dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-teal-800 dark:text-slate-300 dark:hover:bg-teal-950 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update"
                      : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMainContent;