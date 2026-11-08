import PageHero from "../Components/PageHero";
import JobDetails from "../Components/JobDetails";
import CareerCTA from "../Components/CareerCTA";
import RelatedJobs from "../Components/RelatedJobs";

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
