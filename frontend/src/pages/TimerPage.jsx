import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubjectStore } from "../store/useSubjectStore";
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import Timer from "../components/Timer";
import GradeSection from "../components/GradeSection";
import { useGradeStore } from "../store/useGradeStore";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { debounce } from "lodash";
import { useCallback } from "react";

const TimerPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subjects, getSubjects, deleteSubjects, editSubject } =
    useSubjectStore();
  const { getGrades } = useGradeStore();
  const [subject, setSubject] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    color: "",
  });

  const colorPickerRef = useRef(null);

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

  useEffect(() => {
    if (subject) {
      setEditFormData({
        name: subject.name,
        color: subject.color,
      });
    }
  }, [subject]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this subject? This action cannot be undone."
      )
    ) {
      await deleteSubjects({ subjectId });
      navigate("/");
    }
  };

  const debouncedSetColor = useCallback(
    debounce((newColor) => {
      setEditFormData((prev) => ({ ...prev, color: newColor }));
    }, 300),
    []
  );

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    debouncedSetColor(newColor);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await editSubject({
      name: editFormData.name,
      color: editFormData.color,
      subjectId: subject._id,
    });
    setShowEditForm(false);
    getSubjects();
  };

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
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost gap-2 hover:-translate-x-2 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditForm(true)}
              className="btn btn-ghost p-2"
              aria-label="Edit Subject"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button onClick={handleDelete} className="btn btn-error gap-2">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-base-200 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Edit Subject</h2>
              <form onSubmit={handleEdit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject Name</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, name: e.target.value })
                    }
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject Color</span>
                  </label>
                  <input
                    ref={colorPickerRef}
                    type="color"
                    value={editFormData.color}
                    onChange={handleColorChange}
                    className="h-12 w-full cursor-pointer rounded-lg"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-8 pt-10">
          <h1 className="text-4xl font-bold">{subject?.name}</h1>

          <div className="w-full max-w-7xl">
            <Tabs defaultValue="timer" className="w-full">
              <TabsList className="w-full justify-center">
                <TabsTrigger value="timer" className="flex-1">
                  Timer
                </TabsTrigger>
                <TabsTrigger value="grades" className="flex-1">
                  Grades
                </TabsTrigger>
              </TabsList>

              <TabsContent value="timer" className="mt-6">
                <Timer subjectId={subjectId} />
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
