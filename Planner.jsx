import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Planner.css'

function Planner({ tasks, schedule }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getTasksForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return tasks.filter(task => task.dueDate === dateStr)
  }

  const getScheduleForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return schedule.filter(block => block.date === dateStr)
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  return (
    <div className="planner-container">
      <div className="planner-card">
        <div className="planner-header">
          <button onClick={previousMonth} className="nav-btn">
            <ChevronLeft size={20} />
          </button>
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={nextMonth} className="nav-btn">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, idx) => (
            <div key={idx} className={`calendar-day ${day ? 'active' : 'empty'}`}>
              {day && (
                <>
                  <div className="day-number">{day}</div>
                  <div className="day-items">
                    {getTasksForDate(day).map(task => (
                      <div key={task.id} className={`day-item task ${task.completed ? 'completed' : ''}`}>
                        <span className="item-title">{task.title}</span>
                        <span className={`item-priority priority-${task.priority}`}>{task.priority}</span>
                      </div>
                    ))}
                    {getScheduleForDate(day).map(block => (
                      <div key={block.id} className={`day-item schedule type-${block.type}`}>
                        <span className="item-title">{block.title}</span>
                        <span className="item-time">{block.startTime}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="legend">
          <div className="legend-item">
            <span className="legend-color task"></span>
            <span>Task</span>
          </div>
          <div className="legend-item">
            <span className="legend-color schedule"></span>
            <span>Schedule</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planner
