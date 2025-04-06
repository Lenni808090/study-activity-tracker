import { useEffect } from "react";
import { useHomeworkStore } from "../store/useHomeworkStore";
import HomeworkItem from "./HomeworkItem";

const SubjectHomework = ({ subjectId }) => {
  const { homework, getHomework } = useHomeworkStore();

  useEffect(() => {
    if (subjectId) {
      getHomework(subjectId);
    }
  }, [subjectId, getHomework]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Subject Homework</h2>
      {homework && homework.length > 0 ? (
        <div className="space-y-3">
          {homework.map((hw) => (
            <HomeworkItem key={hw.homeworkId} homework={hw} />
          ))}
        </div>
      ) : (
        <div className="text-center p-4 bg-base-200 rounded-lg">
          <p>No homework for this subject.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectHomework;