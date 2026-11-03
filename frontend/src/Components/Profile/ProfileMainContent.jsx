import { useState, useEffect } from "react";
import {
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
} from "../../Api/api/ProfileApi";

const ProfileMainContent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [educations, setEducations] = useState([]);
  const [loadingEducation, setLoadingEducation] = useState(true);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [loadingExperience, setLoadingExperience] = useState(true);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);

  const [skillForm, setSkillForm] = useState({
    skill_name: "",
    skill_level: "Beginner",
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkill();
        setSkills(response.data);
      } catch (error) {
        console.log(
          "Skills fetch error:",
          error.response?.data || error.message,
        );
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  // Skill input change
  const handleSkillChange = (e) => {
    setSkillForm({
      ...skillForm,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form
  const resetSkillForm = () => {
    setSkillForm({
      skill_name: "",
      skill_level: "Beginner",
    });

    setEditingSkillId(null);
    setShowSkillForm(false);
  };

  // Add / Update Skill
  const handleSkillSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSkillId) {
        const response = await updateSkill(editingSkillId, skillForm);

        setSkills((prev) =>
          prev.map((skill) =>
            skill.id === editingSkillId ? response.data : skill,
          ),
        );
      } else {
        const response = await addSkill(skillForm);
        setSkills((prev) => [...prev, response.data]);
      }

      resetSkillForm();
    } catch (error) {
      console.log("Skill save error:", error.response?.data || error.message);
    }
  };

  // Edit Skill
  const handleEditSkill = (skill) => {
    setSkillForm({
      skill_name: skill.skill_name,
      skill_level: skill.skill_level,
    });

    setEditingSkillId(skill.id);
    setShowSkillForm(true);
  };

  // Delete Skill
  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id);

      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    } catch (error) {
      console.log("Skill delete error:", error.response?.data || error.message);
    }
  };

  const [experienceForm, setExperienceForm] = useState({
    job_title: "",
    company_name: "",
    currently_working: false,
    responsibilities: "",
  });
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await getExperience();
        setExperiences(response.data);
      } catch (error) {
        console.log(
          "Experience fetch error:",
          error.response?.data || error.message,
        );
      } finally {
        setLoadingExperience(false);
      }
    };

    fetchExperience();
  }, []);

  // Handle Experience Input
  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;

    setExperienceForm({
      ...experienceForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Reset Experience Form
  const resetExperienceForm = () => {
    setExperienceForm({
      job_title: "",
      company_name: "",
      currently_working: false,
      responsibilities: "",
    });

    setEditingExperienceId(null);
    setShowExperienceForm(false);
  };

  // Add and Update Experience
  const handleExperienceSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExperienceId) {
        const response = await updateExperience(
          editingExperienceId,
          experienceForm,
        );

        setExperiences((prev) =>
          prev.map((exp) =>
            exp.id === editingExperienceId ? response.data : exp,
          ),
        );

        alert("Experience updated successfully!");
      } else {
        const response = await addExperience(experienceForm);

        setExperiences((prev) => [...prev, response.data]);

        alert("Experience added successfully!");
      }

      resetExperienceForm();
    } catch (error) {
      console.log("Experience error:", error.response?.data || error.message);

      alert("Something went wrong!");
    }
  };

  // Edit Experience
  const handleEditExperience = (exp) => {
    setExperienceForm({
      job_title: exp.job_title || "",
      company_name: exp.company_name || "",
      currently_working: exp.currently_working || false,
      responsibilities: exp.responsibilities || "",
    });

    setEditingExperienceId(exp.id);
    setShowExperienceForm(true);
  };

  // Delete Experience
  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    try {
      await deleteExperience(id);

      setExperiences((prev) => prev.filter((exp) => exp.id !== id));

      alert("Experience deleted successfully!");
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);

      alert("Could not delete experience!");
    }
  };

  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    field_of_study: "",
    result: "",
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await getEducation();
        setEducations(response.data);
      } catch (error) {
        console.log("Education fetch error:", error);
      } finally {
        setLoadingEducation(false);
      }
    };

    fetchEducation();
  }, []);
  // Handle input change
  const handleEducationChange = (e) => {
    setEducationForm({
      ...educationForm,
      [e.target.name]: e.target.value,
    });
  };

  // Add and Update Education
  const handleEducationSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEducationId) {
        const response = await updateEducation(
          editingEducationId,
          educationForm,
        );

        setEducations((prev) =>
          prev.map((edu) =>
            edu.id === editingEducationId ? response.data : edu,
          ),
        );

        alert("Education updated successfully!");
      } else {
        const response = await addEducation(educationForm);

        setEducations((prev) => [...prev, response.data]);

        alert("Education added successfully!");
      }

      resetEducationForm();
    } catch (error) {
      console.log(
        "Education save error:",
        error.response?.data || error.message,
      );
      alert("Something went wrong!");
    }
  };

  // Edit Education
  const handleEditEducation = (edu) => {
    setEducationForm({
      degree: edu.degree || "",
      institution: edu.institution || "",
      field_of_study: edu.field_of_study || "",
      result: edu.result || "",
    });

    setEditingEducationId(edu.id);
    setShowEducationForm(true);
  };

  // Delete Education
  const handleDeleteEducation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education?")) {
      return;
    }

    try {
      await deleteEducation(id);

      setEducations((prev) => prev.filter((edu) => edu.id !== id));

      alert("Education deleted successfully!");
    } catch (error) {
      console.log(
        "Education delete error:",
        error.response?.data || error.message,
      );
      alert("Could not delete education!");
    }
  };

  // Reset Form
  const resetEducationForm = () => {
    setEducationForm({
      degree: "",
      institution: "",
      field_of_study: "",
      result: "",
    });

    setEditingEducationId(null);
    setShowEducationForm(false);
  };

  const [profile, setProfile] = useState({
    full_name: "Your Name",
    email: "your@email.com",
    phone: "",
    location: "Dhaka, Bangladesh",
    headline: "Web Developer",
    about: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [savedCV, setSavedCV] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    setCvFile(file);
  };

  const handleUpload = () => {
    if (!cvFile) {
      alert("Please select a PDF file first.");
      return;
    }

    setSavedCV(cvFile);
    setCvFile(null);
    alert("CV uploaded successfully!");
  };

  const handleReplace = () => {
    if (!cvFile) {
      alert("Please select a new PDF file first.");
      return;
    }

    setSavedCV(cvFile);
    setCvFile(null);
    alert("CV replaced successfully!");
  };

  const handleDelete = () => {
    if (!savedCV) {
      alert("No CV available to delete.");
      return;
    }

    setSavedCV(null);
    setCvFile(null);
    alert("CV deleted successfully!");
  };

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };
  return (
    <div className="space-y-6">
      {/* 1. Personal Information */}
      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Personal Information
        </h2>
        <div className="mt-4 space-y-4">
          {[
            { label: "Full Name", name: "full_name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Location", name: "location" },
            { label: "Professional Headline", name: "headline" },
          ].map((field) => (
            <div
              key={field.name}
              className="flex items-center justify-between gap-4 border-b border-teal-100 pb-3 dark:border-teal-900/60"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {field.label}
              </p>

              {isEditing ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-1/2 rounded-lg border border-teal-200 px-3 py-2 text-sm dark:border-teal-900 dark:bg-[#071A19] dark:text-white"
                />
              ) : (
                <p className="text-right text-sm text-slate-800 dark:text-white">
                  {profile[field.name] || "Not added"}
                </p>
              )}
            </div>
          ))}

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              About Me
            </p>

            {isEditing ? (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="3"
                className="mt-2 w-full rounded-lg border border-teal-200 p-3 text-sm dark:border-teal-900 dark:bg-[#071A19] dark:text-white"
              />
            ) : (
              <p className="mt-2 text-sm text-slate-800 dark:text-white">
                {profile.about || "No description added yet."}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"
              >
                Save Changes
              </button>

              <button
                onClick={handleCancel}
                className="rounded-lg border px-4 py-2 text-sm dark:border-teal-900 dark:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setFormData(profile);
                setIsEditing(true);
              }}
              className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* 2. Resume / CV */}

      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Resume / CV
        </h2>

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="mt-4 block w-full text-sm text-slate-600 dark:text-slate-300"
        />

        {savedCV && (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Saved CV: {savedCV.name}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleUpload}
            className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Upload CV
          </button>

          <button
            type="button"
            onClick={handleReplace}
            className="rounded-lg border border-teal-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-teal-900 dark:text-white"
          >
            Replace CV
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete CV
          </button>
        </div>
      </div>

      {/* 3. Education */}
      {/* Education Section */}
      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Education
          </h2>

          <button
            onClick={() => {
              resetEducationForm();
              setShowEducationForm(true);
            }}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700"
          >
            + Add Education
          </button>
        </div>

        {/* Education Form */}
        {showEducationForm && (
          <form onSubmit={handleEducationSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={educationForm.degree}
              onChange={handleEducationChange}
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={educationForm.institution}
              onChange={handleEducationChange}
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <input
              type="text"
              name="field_of_study"
              placeholder="Field of Study"
              value={educationForm.field_of_study}
              onChange={handleEducationChange}
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <input
              type="text"
              name="result"
              placeholder="Result"
              value={educationForm.result}
              onChange={handleEducationChange}
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
              >
                {editingEducationId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={resetEducationForm}
                className="rounded-lg border px-4 py-2 dark:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Education List */}
        {loadingEducation ? (
          <p className="mt-4">Loading education...</p>
        ) : educations.length > 0 ? (
          educations.map((edu) => (
            <div
              key={edu.id}
              className="mt-4 rounded-lg border p-4 dark:border-teal-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {edu.degree}
              </h3>

              <p className="text-sm text-slate-600 dark:text-gray-300">
                {edu.institution}
              </p>

              <p className="text-sm text-slate-600 dark:text-gray-300">
                {edu.field_of_study}
              </p>

              <p className="text-sm text-slate-600 dark:text-gray-300">
                Result: {edu.result}
              </p>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleEditEducation(edu)}
                  className="text-sm font-medium text-teal-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteEducation(edu.id)}
                  className="text-sm font-medium text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-3 text-gray-500">
            No education information added yet.
          </p>
        )}
      </div>

      {/* 4. Work Experience */}
      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Work Experience
          </h2>

          <button
            onClick={() => {
              resetExperienceForm();
              setShowExperienceForm(true);
            }}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700"
          >
            + Add Experience
          </button>
        </div>

        {/* Experience Form */}
        {showExperienceForm && (
          <form onSubmit={handleExperienceSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              name="job_title"
              placeholder="Job Title"
              value={experienceForm.job_title}
              onChange={handleExperienceChange}
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={experienceForm.company_name}
              onChange={handleExperienceChange}
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <label className="flex items-center gap-2 text-sm dark:text-white">
              <input
                type="checkbox"
                name="currently_working"
                checked={experienceForm.currently_working}
                onChange={handleExperienceChange}
              />
              I currently work here
            </label>

            <textarea
              name="responsibilities"
              placeholder="Responsibilities"
              value={experienceForm.responsibilities}
              onChange={handleExperienceChange}
              rows="3"
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-teal-600 px-4 py-2 text-white"
              >
                {editingExperienceId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={resetExperienceForm}
                className="rounded-lg border px-4 py-2 dark:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Experience List */}
        {loadingExperience ? (
          <p className="mt-4">Loading experience...</p>
        ) : experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="mt-4 rounded-lg border p-4 dark:border-teal-900"
            >
              <h3 className="font-semibold dark:text-white">{exp.job_title}</h3>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {exp.company_name}
              </p>

              {exp.currently_working && (
                <p className="mt-1 text-sm text-teal-600">Currently Working</p>
              )}

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {exp.responsibilities}
              </p>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleEditExperience(exp)}
                  className="text-sm font-medium text-teal-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="text-sm font-medium text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-3 text-gray-500">No work experience added yet.</p>
        )}
      </div>
      {/* 5. Skills */}
      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Skills
          </h2>

          <button
            onClick={() => {
              resetSkillForm();
              setShowSkillForm(true);
            }}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700"
          >
            + Add Skill
          </button>
        </div>

        {/* Skill Form */}
        {showSkillForm && (
          <form onSubmit={handleSkillSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              name="skill_name"
              placeholder="Skill Name"
              value={skillForm.skill_name}
              onChange={handleSkillChange}
              required
              className="w-full rounded-lg border p-3 dark:bg-[#102E29]"
            />

            <select
              name="skill_level"
              value={skillForm.skill_level}
              onChange={handleSkillChange}
              className="w-full rounded-lg border p-3 dark:bg-[#102E29] dark:text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
              >
                {editingSkillId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={resetSkillForm}
                className="rounded-lg border px-4 py-2 dark:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Skill List */}
        {loadingSkills ? (
          <p className="mt-4">Loading skills...</p>
        ) : skills.length > 0 ? (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="mt-4 rounded-lg border p-4 dark:border-teal-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {skill.skill_name}
              </h3>

              <p className="text-sm text-slate-600 dark:text-gray-300">
                {skill.skill_level}
              </p>

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleEditSkill(skill)}
                  className="text-sm font-medium text-teal-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="text-sm font-medium text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-3 text-gray-500">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileMainContent;
