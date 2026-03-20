import React, { useState } from 'react'
import { Plus, Trash2, BookOpen, FileText, CheckCircle, Circle } from 'lucide-react'
import './LMS.css'

function LMS() {
  const [courses, setCourses] = useState([])
  const [courseTitle, setCourseTitle] = useState('')
  const [instructor, setInstructor] = useState('')
  const [code, setCode] = useState('')
  const [schedule, setSchedule] = useState('')
  const [room, setRoom] = useState('')
  const [credits, setCredits] = useState('')
  const [activeCourseId, setActiveCourseId] = useState(null)
  const [assignmentTitle, setAssignmentTitle] = useState('')
  const [assignmentDue, setAssignmentDue] = useState('')
  const [assignmentType, setAssignmentType] = useState('assignment')

  const handleAddCourse = (e) => {
    e.preventDefault()
    if (courseTitle.trim()) {
      setCourses([...courses, {
        id: Date.now(),
        title: courseTitle,
        instructor,
        code,
        schedule,
        room,
        credits: parseInt(credits) || 0,
        materials: [],
        assignments: [],
        createdAt: new Date().toLocaleDateString()
      }])
      setCourseTitle('')
      setInstructor('')
      setCode('')
      setSchedule('')
      setRoom('')
      setCredits('')
    }
  }

  const handleAddAssignment = (courseId) => {
    if (assignmentTitle.trim()) {
      const updatedCourses = courses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            assignments: [...course.assignments, {
              id: Date.now(),
              title: assignmentTitle,
              dueDate: assignmentDue,
              type: assignmentType,
              completed: false,
              createdAt: new Date().toLocaleDateString()
            }]
          }
        }
        return course
      })
      setCourses(updatedCourses)
      setAssignmentTitle('')
      setAssignmentDue('')
      setAssignmentType('assignment')
    }
  }

  const toggleAssignment = (courseId, assignmentId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          assignments: course.assignments.map(assignment => {
            if (assignment.id === assignmentId) {
              return { ...assignment, completed: !assignment.completed }
            }
            return assignment
          })
        }
      }
      return course
    })
    setCourses(updatedCourses)
  }

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id))
    if (activeCourseId === id) setActiveCourseId(null)
  }

  const deleteAssignment = (courseId, assignmentId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          assignments: course.assignments.filter(a => a.id !== assignmentId)
        }
      }
      return course
    })
    setCourses(updatedCourses)
  }

  const activeCourse = courses.find(c => c.id === activeCourseId)
  const stats = {
    totalCourses: courses.length,
    totalCredits: courses.reduce((sum, c) => sum + c.credits, 0),
    totalAssignments: courses.reduce((sum, c) => sum + c.assignments.length, 0),
    completedAssignments: courses.reduce((sum, c) => sum + c.assignments.filter(a => a.completed).length, 0)
  }

  return (
    <div className="lms-container">
      <div className="lms-wrapper">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalCourses}</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalCredits}</div>
            <div className="stat-label">Total Credits</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completedAssignments}/{stats.totalAssignments}</div>
            <div className="stat-label">Assignments Done</div>
          </div>
        </div>

        {/* Add Course Form */}
        <div className="add-course-card">
          <h3>Add New Course</h3>
          <form onSubmit={handleAddCourse} className="course-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Course title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Course code (e.g., CS101)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Instructor name"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Schedule (e.g., MWF 10am)"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Room number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Credits"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className="input-field"
                min="0"
              />
            </div>

            <button type="submit" className="submit-btn">
              <Plus size={20} />
              Add Course
            </button>
          </form>
        </div>

        {/* Courses List or Course Detail */}
        {courses.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={48} />
            <p>No courses yet. Add one to get started!</p>
          </div>
        ) : !activeCourse ? (
          <div className="courses-grid">
            {courses.map(course => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => setActiveCourseId(course.id)}
              >
                <div className="course-header">
                  <h4>{course.title}</h4>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteCourse(course.id)
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {course.code && <div className="course-code">{course.code}</div>}
                {course.instructor && <div className="course-info">👨‍🏫 {course.instructor}</div>}
                {course.schedule && <div className="course-info">⏰ {course.schedule}</div>}
                {course.room && <div className="course-info">📍 {course.room}</div>}
                {course.credits > 0 && <div className="course-info">⭐ {course.credits} credits</div>}
                <div className="course-assignments">
                  {course.assignments.length} assignment{course.assignments.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="course-detail">
            <button className="back-btn" onClick={() => setActiveCourseId(null)}>
              ← Back to Courses
            </button>

            <div className="detail-header">
              <div>
                <h3>{activeCourse.title}</h3>
                {activeCourse.code && <div className="detail-code">{activeCourse.code}</div>}
              </div>
              <button className="delete-btn" onClick={() => deleteCourse(activeCourse.id)}>
                <Trash2 size={20} />
              </button>
            </div>

            <div className="course-info-grid">
              {activeCourse.instructor && (
                <div className="info-item">
                  <span className="info-label">Instructor</span>
                  <span className="info-value">{activeCourse.instructor}</span>
                </div>
              )}
              {activeCourse.schedule && (
                <div className="info-item">
                  <span className="info-label">Schedule</span>
                  <span className="info-value">{activeCourse.schedule}</span>
                </div>
              )}
              {activeCourse.room && (
                <div className="info-item">
                  <span className="info-label">Room</span>
                  <span className="info-value">{activeCourse.room}</span>
                </div>
              )}
              {activeCourse.credits > 0 && (
                <div className="info-item">
                  <span className="info-label">Credits</span>
                  <span className="info-value">{activeCourse.credits}</span>
                </div>
              )}
            </div>

            {/* Add Assignment */}
            <div className="add-assignment-card">
              <h4>Add Assignment/Assessment</h4>
              <div className="assignment-form">
                <input
                  type="text"
                  placeholder="Assignment title"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  className="input-field"
                />
                <select
                  value={assignmentType}
                  onChange={(e) => setAssignmentType(e.target.value)}
                  className="input-field"
                >
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="exam">Exam</option>
                  <option value="project">Project</option>
                  <option value="reading">Reading</option>
                </select>
                <input
                  type="date"
                  value={assignmentDue}
                  onChange={(e) => setAssignmentDue(e.target.value)}
                  className="input-field"
                />
                <button
                  className="submit-btn"
                  onClick={() => handleAddAssignment(activeCourse.id)}
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
            </div>

            {/* Assignments List */}
            {activeCourse.assignments.length === 0 ? (
              <div className="empty-state-small">
                <p>No assignments yet. Add one above!</p>
              </div>
            ) : (
              <div className="assignments-list">
                <h4>Assignments & Assessments</h4>
                {activeCourse.assignments.map(assignment => (
                  <div key={assignment.id} className={`assignment-item ${assignment.completed ? 'completed' : ''}`}>
                    <button
                      className="checkbox-btn"
                      onClick={() => toggleAssignment(activeCourse.id, assignment.id)}
                    >
                      {assignment.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                    </button>
                    <div className="assignment-content">
                      <div className="assignment-title">{assignment.title}</div>
                      <div className="assignment-meta">
                        <span className={`assignment-type type-${assignment.type}`}>
                          {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
                        </span>
                        {assignment.dueDate && <span className="assignment-due">Due: {assignment.dueDate}</span>}
                      </div>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => deleteAssignment(activeCourse.id, assignment.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LMS
