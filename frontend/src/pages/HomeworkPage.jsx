import { useEffect } from "react";
import { useHomeworkStore } from "../store/useHomeworkStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Book } from "lucide-react";


const HomeworkPage = () => {
  const navigate = useNavigate();
  const { allHomework, getEveryHomework } = useHomeworkStore();

  useEffect(() => {
    getEveryHomework();
  }, [getEveryHomework]);

  // Gruppiere Hausaufgaben nach Datum
  const groupedHomework = allHomework.reduce((groups, hw) => {
    const date = new Date(hw.todo).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(hw);
    return groups;
  }, {});

  // Sortiere die Daten
  const sortedDates = Object.keys(groupedHomework).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
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
          Zurück
        </button>

        <div className="flex flex-col items-center justify-center gap-8 pt-20 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 animate-slide-down">Alle Hausaufgaben</h1>

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
                      <div
                        key={hw.homeworkId}
                        className="p-4 bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <Book className="h-5 w-5 mt-1 text-primary" />
                          <div className="flex-1">
                            <h3 className="font-medium">{hw.text}</h3>
                            <p className="text-sm opacity-70">Fach: {hw.subjectName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-8 bg-base-200 rounded-lg">
                <p>Keine Hausaufgaben gefunden.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkPage;