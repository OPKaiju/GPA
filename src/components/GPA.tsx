import React, { useState } from 'react';

type Course = {
  subject: string;
  grade: keyof typeof gradePoints;
};

const gradePoints = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': null,
} as const;

const GPAComponent: React.FC = () => {
  const [subject, setSubject] = useState<string>('');
  const [grade, setGrade] = useState<keyof typeof gradePoints>('A');
  const [courses, setCourses] = useState<Course[]>([]);
  const [gpa, setGpa] = useState<string | null>(null);

  const handleAddCourse = () => {
    if (!subject.trim()) return;
    setCourses([...courses, { subject, grade }]);
    setSubject('');
    setGrade('A');
  };

  const handleRemoveCourse = (index: number) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(course => gradePoints[course.grade] !== null);
    const totalPoints = validCourses.reduce((sum, course) => sum + (gradePoints[course.grade] ?? 0), 0);
    const gpaValue = validCourses.length > 0 ? (totalPoints / validCourses.length).toFixed(2) : '0.00';
    setGpa(gpaValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <h2 className="text-center text-2xl font-bold mb-4">ระบบคำนวณ GPA</h2>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="ชื่อวิชา"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value as keyof typeof gradePoints)}>
          {Object.keys(gradePoints).map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <button onClick={handleAddCourse}>เพิ่มวิชา</button>
      </div>

      <ul>
        {courses.map((course, index) => (
          <li key={index} style={{ color: course.grade === 'F' ? 'red' : 'black' }}>
            {course.subject} - เกรด: {course.grade}
            <button onClick={() => handleRemoveCourse(index)} style={{ marginLeft: '10px' }}>
              ลบ
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button onClick={calculateGPA}>คำนวณ GPA</button>
        {gpa !== null && <h3>GPA: {gpa}</h3>}
      </div>
    </div>
  );
};

export default GPAComponent;