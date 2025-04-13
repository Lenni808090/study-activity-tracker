import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubjectStore } from "../store/useSubjectStore";
import { ArrowLeft } from "lucide-react";
import Timer from "../components/Timer";
import GradeSection from "../components/GradeSection";
import { useGradeStore } from "../store/useGradeStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

const TimerPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subjects, getSubjects } = useSubjectStore();
  const { getGrades } = useGradeStore();
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    getSubjects();
    if (subjectId) {
      getGrades(subjectId);
    }
  }, [getSubjects, getGrades, subjectId]);

  useEffect(() => {
    if (subjects.length > 0 && subjectId) {
      const foundSubject = subjects.find((s) => s._id === subjectId);
      setSubject(foundSubject);
    }
  }, [subjects, subjectId]);



  if (!subject) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 pt-16">
        <div className="container mx-auto px-4 pt-10 flex justify-center items-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 pt-16">
      <div className="container mx-auto px-4 pt-10">
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost gap-2 hover:-translate-x-2 transition-transform absolute top-20 left-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="flex flex-col items-center justify-center gap-8 pt-10">
          <h1 className="text-4xl font-bold">{subject.name}</h1>

          <div className="w-full max-w-4xl">
            <Tabs defaultValue="timer" className="w-full">
              <TabsList className="w-full justify-center">
                <TabsTrigger value="timer" className="flex-1">Timer</TabsTrigger>
                <TabsTrigger value="grades" className="flex-1">Grades</TabsTrigger>
              </TabsList>

              <TabsContent value="timer" className="mt-6">
                <div className="bg-base-200 p-6 rounded-xl shadow-md">
                  <Timer subjectId={subjectId} />
                </div>
              </TabsContent>

              <TabsContent value="grades" className="mt-6">
                <GradeSection subjectId={subjectId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;