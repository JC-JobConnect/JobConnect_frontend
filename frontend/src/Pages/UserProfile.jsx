import PageHero from "../Components/PageHero"
import ProfileSidebar from "../Components/Profile/ProfileSidebar"
import ProfileMainContent from "../Components/Profile/ProfileMainContent"

const Profile = () => {
  return (
    <div>
      <PageHero title="User Profile" />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          
         
            {/* এখানে Main Content বসবে */}
           <div className="lg:col-span-2">
            <ProfileMainContent />
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default Profile