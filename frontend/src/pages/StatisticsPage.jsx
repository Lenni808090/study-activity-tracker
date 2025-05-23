import { useEffect } from "react";
import { useSubjectStore } from "../store/useSubjectStore";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const formatTime = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return `${hours}h ${minutes}m ${seconds}s`;
};

const StatisticsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { subjects, loadingSubjects, getSubjects, getSubjectsOfUser, name } = useSubjectStore();


  useEffect(() => {
    if (userId) {
      getSubjectsOfUser(userId);
    } else {
      getSubjects();
    }
  }, [userId, getSubjects, getSubjectsOfUser]);

  const totalTime = subjects.reduce(
    (acc, subject) => acc + subject.studyDuration,
    0
  );

  const chartData = {
    labels: subjects.map((subject) => subject.name),
    datasets: [
      {
        data: subjects.map(
          (subject) => subject.studyDuration / (1000 * 60 * 60)
        ),
        backgroundColor: subjects.map((subject) => subject.color || "#4f46e5"),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const ms = context.raw * (1000 * 60 * 60);
            const percentage = ((ms / totalTime) * 100).toFixed(1);
            return `${context.label}: ${formatTime(ms)} (${percentage}%)`;
          },
        },
      },
    },
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
          <h1 className="text-4xl font-bold mb-2 animate-slide-down">
          {userId ? `${name}'s Study Time Statistics` : "Study Time Statistics"}
          </h1>

          {loadingSubjects ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <div className="w-40 h-40 rounded-full border-8 border-dashed border-primary animate-spin" />
              <p className="text-lg font-semibold">Loading statistics...</p>
            </div>
          ) : (
            <>
              <div className="w-full max-w-md bg-base-200 p-6 rounded-lg shadow-lg">
                <Pie data={chartData} options={options} />
              </div>

              <div className="w-full max-w-md">
                {subjects.map((subject) => (
                  <div
                    key={subject._id}
                    className="flex justify-between items-center p-4 bg-base-200 rounded-lg mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: subject.color || "#4f46e5" }}
                      />
                      <span>{subject.name}</span>
                    </div>
                    <div className="text-right">
                      <div>{formatTime(subject.studyDuration)}</div>
                      <div className="text-sm opacity-70">
                        {((subject.studyDuration / totalTime) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
