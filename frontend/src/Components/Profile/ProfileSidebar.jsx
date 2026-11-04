
import { useRef, useState } from "react";
import { FiCamera, FiPhone, FiMapPin } from "react-icons/fi";
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
    <section className="relative overflow-hidden rounded-2xl border border-green-200 bg-linear-to-r from-green-600 via-emerald-600 to-teal-500 px-6 py-7 shadow-sm dark:border-green-900/50 sm:px-8">

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
            aria-label="Change profile picture"
            className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-green-700 text-white shadow-md transition hover:bg-green-800 disabled:opacity-60 cursor-pointer"
          >
            {uploading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <FiCamera className="h-4 w-4" />
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

          {/* Contact Information */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-green-50 sm:justify-start">

            {profile?.phone && (
              <span className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 shrink-0" />
                {profile.phone}
              </span>
            )}

            {profile?.location && (
              <span className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4 shrink-0" />
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
