import Hero from "../Components/Hero";
import JobDetails from "../Components/JobDetails";
import RelatedJobs from "../Components/RelatedJobs";
import JobOverview from "../Components/JobOverview";

const JobDetailsPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Hero />
      <JobDetails />
      <RelatedJobs />
      <JobOverview />
    </div>
  );
};

export default JobDetails;
