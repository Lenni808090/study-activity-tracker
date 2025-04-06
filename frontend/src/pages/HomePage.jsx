import Subject from "../components/Subject";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 animate-gradient-x pt-16">
      <div className="container mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your Subjects</h1>
        </div>
        <Subject />
      </div>
    </div>
  );
};

export default HomePage;