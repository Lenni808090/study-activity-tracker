import { useEffect, useState } from "react";
import { useSubjectStore } from "../store/useSubjectStore";
import { useTimetableStore } from "../store/useTimetableStore";
import { Edit2, Save } from "lucide-react";

const Timetable = () => {
  const { subjects, getSubjects } = useSubjectStore();
  const { timetable, getTimetable, saveTimetable } = useTimetableStore();
  const [isEditing, setIsEditing] = useState(false);
  const timeSlots = [
    "08.00 - 08.45", "08.45 - 09.30", "09.45 - 10.30",
    "10.30 - 11.15", "11.30 - 12.15","12.15 - 13.00"
  ];

  useEffect(() => {
    getTimetable();
    getSubjects();
  }, [getTimetable, getSubjects]); 


  const handleSubjectSelect = (day, slotIndex, value) => {
    if (!isEditing) return;
    
    const updatedTimetable = {
      ...timetable,
      [day]: [...(timetable[day] || Array(timeSlots.length).fill(""))]
    };
    
    updatedTimetable[day][slotIndex] = value;
    
    console.log("Sending to backend:", updatedTimetable);
    saveTimetable({ timetable: updatedTimetable });
  };

  const handleSave = async () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 pt-16">
      <div className="container mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Timetable</h1>
          <button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)} 
            className={`btn gap-2 text-lg ${isEditing ? 'btn-success' : 'btn-primary'}`}
          >
            {isEditing ? (
              <>
                <Save className="h-6 w-6" />
                Save
              </>
            ) : (
              <>
                <Edit2 className="h-6 w-6" />
                Edit
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-base md:text-lg [&_td]:border-x [&_td]:border-base-300 [&_th]:border-x [&_th]:border-base-300">
            <thead>
              <tr className="border-b-2 border-base-300">
                <th className="text-base md:text-lg lg:text-xl bg-base-200">Time</th>
                <th className="text-base md:text-lg lg:text-xl bg-base-200">Monday</th>
                <th className="text-base md:text-lg lg:text-xl bg-base-200">Tuesday</th>
                <th className="text-base md:text-lg lg:text-xl bg-base-200">Wednesday</th>
                <th className="text-base md:text-lg lg:text-xl bg-base-200">Thursday</th>
                <th className="text-base md:text-lg lg:text-xl bg-base-200">Friday</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, slotIndex) => (
                <tr key={time} className="border-b border-base-300">
                  <td className="font-semibold text-base md:text-lg bg-base-200">{time}</td>
                  {Object.keys(timetable).map(day => (
                    <td key={`${day}-${slotIndex}`} className="border-x border-base-300">
                      {isEditing ? (
                        <select
                          className="select select-bordered w-full text-base md:text-lg"
                          value={timetable[day][slotIndex]}
                          onChange={(e) => handleSubjectSelect(day, slotIndex, e.target.value)}
                          name={`subject-${day}-${slotIndex}`}
                          id={`subject-${day}-${slotIndex}`}
                        >
                          <option value="">Select subject</option>
                          {subjects.map(subject => (
                            <option key={subject._id} value={subject._id}>
                              {subject.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="block p-2 text-base md:text-lg">
                          {subjects.find(s => s._id === timetable[day][slotIndex])?.name || '-'}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;