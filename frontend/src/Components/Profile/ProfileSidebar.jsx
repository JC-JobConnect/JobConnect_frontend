
import { useRef, useState } from "react";
import { updateProfile } from "../../Api/api/ProfileApi";

const API_ORIGIN = "http://127.0.0.1:8000";

const getMediaUrl = (url) => {
  if (!url) return "";

  if (url.startsWith("http")) return url;

  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
};

const ProfileSidebar = ({ profile, onProfileUpdate }) => {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fullName = profile?.full_name || "Your Name";
  const picture = getMediaUrl(profile?.profile_picture);

  const handlePictureChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", file);

    setUploading(true);
    setError("");

    try {
      const response = await updateProfile(formData);

      onProfileUpdate?.(response.data);
    } catch (err) {
      console.error(
        "Profile picture upload failed:",
        err.response?.data || err
      );

      setError(
        err.response?.data?.profile_picture?.[0] ||
        "Unable to upload profile picture."
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 px-6 py-7 shadow-sm dark:border-green-900/50 sm:px-8">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />

      <div className="pointer-events-none absolute -bottom-24 right-40 h-48 w-48 rounded-full bg-white/10" />

      <div className="relative flex flex-col items-center gap-5 sm:flex-row">

        {/* Profile Picture */}
        <div className="relative shrink-0">

          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-700 shadow-lg sm:h-28 sm:w-28">

            {picture ? (
              <img
                src={picture}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-white">
                {fullName.charAt(0).toUpperCase()}
              </span>
            )}

          </div>

          {/* Camera Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Change profile picture"
            className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green-700 text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
          >
            {uploading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path d="M14 5h-4L8 8H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePictureChange}
          />

        </div>

        {/* User Information */}
        <div className="min-w-0 text-center text-white sm:text-left">

          <h2 className="text-2xl font-bold tracking-wide">
            {fullName}
          </h2>

          <p className="mt-1 text-sm font-medium text-green-50">
            {profile?.headline || "Add your professional headline"}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-green-50 sm:justify-start">

            {profile?.phone && (
              <span className="flex items-center gap-2">

                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L9.06 10.9a16 16 0 0 0 4 4l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.58 2.79.7A2 2 0 0 1 22 16.92z" />
                </svg>

                {profile.phone}

              </span>
            )}

            {profile?.location && (
              <span className="flex items-center gap-2">

                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                {profile.location}

              </span>
            )}

          </div>

          {/* Upload Status */}
          {uploading && (
            <p className="mt-3 text-xs font-medium text-green-50">
              Uploading profile picture...
            </p>
          )}

          {error && (
            <p className="mt-3 text-xs font-medium text-red-100">
              {error}
            </p>
          )}

        </div>

      </div>
    </section>
  );
};

export default ProfileSidebar;
