const PageHero = ({ title }) => {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl mt-5 tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHero;