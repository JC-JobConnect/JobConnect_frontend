
import { useEffect, useState } from "react";

import PageHero from "../../Components/Common/PageHero";
import ProfileSidebar from "../../Components/Profile/ProfileSidebar";
import ProfileMainContent from "../../Components/Profile/ProfileMainContent";

import { getProfile } from "../../Api/api/ProfileApi";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProfile();
      setProfile(response.data);

    } catch (err) {
      console.error("Profile error:", err.response?.data || err);
      setError("Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#071A19]">

      <PageHero title="My Profile" />

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:py-10">

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-950/30 dark:text-red-400">
            <p>{error}</p>
            <button
              onClick={fetchProfile}
              className="mt-3 rounded-lg bg-green-600 px-5 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <ProfileSidebar
              profile={profile}
              onProfileUpdate={setProfile}
            />

            <ProfileMainContent
              profileData={profile}
              onProfileUpdate={setProfile}
            />
          </>
        )}

      </div>
    </div>
  );
};

export default UserProfile;
