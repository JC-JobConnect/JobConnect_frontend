import PageHero from "../../Components/Common/PageHero";
import JobDetails from "../../Components/Jobs/JobDetails";
import CareerCTA from "../../Components/Jobs/CareerCTA";
import RelatedJobs from "../../Components/Jobs/RelatedJobs";

const JobDetailsPage = () => {
  return (
    <>
      <PageHero title="Job Detail" badgeText="Get In Touch" />
      <div className="min-h-screen bg-white px-6 dark:bg-[#071A19] text-zinc-900">
        <JobDetails />
        <CareerCTA />
        <RelatedJobs />
      </div>
    </>
  );
};

export default JobDetailsPage;
