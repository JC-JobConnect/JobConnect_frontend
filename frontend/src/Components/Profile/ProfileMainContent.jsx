import { useState } from "react";

const ProfileMainContent = () => {
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Education
        </h2>
      </div>

      {/* 4. Work Experience */}
      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Work Experience
        </h2>
      </div>

      {/* 5. Skills */}
      <div className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm dark:border-teal-900/60 dark:bg-[#0B2421]">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Skills
        </h2>
      </div>
    </div>
  );
};

export default ProfileMainContent;
