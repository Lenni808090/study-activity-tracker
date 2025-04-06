import { useEffect } from "react";
import { useHomeworkStore } from "../store/useHomeworkStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import HomeworkItem from "../components/HomeworkItem";

const HomeworkPage = () => {
  const navigate = useNavigate();
  const { allHomework, getEveryHomework } = useHomeworkStore();

  useEffect(() => {
    getEveryHomework();
  }, [getEveryHomework]);

  // Group homework by date
  const groupedHomework = allHomework.reduce((groups, hw) => {
    const date = new Date(hw.todo).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(hw);
    return groups;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedHomework).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 animate-gradient-x pt-16">
      <div className="container mx-auto px-4 pt-10">
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost gap-2 hover:-translate-x-2 transition-transform absolute top-20 left-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="flex flex-col items-center justify-center gap-8 pt-20 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 animate-slide-down">All Homework</h1>

          <div className="w-full max-w-3xl">
            {sortedDates.length > 0 ? (
              sortedDates.map((date) => (
                <div key={date} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 bg-base-200 p-3 rounded-lg">
                    <Calendar className="inline-block mr-2 h-5 w-5" />
                    {formatDate(date)}
                  </h2>
                  <div className="space-y-3">
                    {groupedHomework[date].map((hw) => (
                      <HomeworkItem key={hw.homeworkId} homework={hw} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-base-200 rounded-lg">
                <p>No homework found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkPage;