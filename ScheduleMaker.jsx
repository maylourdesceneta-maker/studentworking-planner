import React, { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import './ScheduleMaker.css'

function ScheduleMaker({ schedule, onAddBlock, onDeleteBlock }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [type, setType] = useState('class')
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && date && startTime && endTime) {
      onAddBlock({ title, date, startTime, endTime, type, location })
      setTitle('')
      setDate('')
      setStartTime('')
      setEndTime('')
      setType('class')
      setLocation('')
    }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`)

  const getScheduleByDay = (day) => {
    return schedule.filter(block => {
      const blockDate = new Date(block.date)
      return blockDate.getDay() === days.indexOf(day) + 1 || (day === 'Sunday' && blockDate.getDay() === 0)
    })
  }

  const typeColors = {
    class: { label: '📚 Class', color: '#7b1fa2' },
    work: { label: '💼 Work', color: '#388e3c' },
    study: { label: '📖 Study', color: '#1976d2' },
    break: { label: '☕ Break', color: '#f57c00' }
  }

  return (
    <div className="schedule-container">
      <div className="schedule-wrapper">
        {/* Add Schedule Block Form */}
        <div className="add-schedule-card">
          <h3>Add Schedule Block</h3>
          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Activity title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-row">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input-field"
                required
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-row">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field"
              >
                <option value="class">Class</option>
                <option value="work">Work Shift</option>
                <option value="study">Study Session</option>
                <option value="break">Break/Meal</option>
              </select>
              <input
                type="text"
                placeholder="Location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
              />
            </div>

            <button type="submit" className="submit-btn">
              <Plus size={20} />
              Add to Schedule
            </button>
          </form>
        </div>

        {/* Type Legend */}
        <div className="legend-section">
          <h4>Activity Types</h4>
          <div className="legend">
            {Object.entries(typeColors).map(([key, value]) => (
              <div key={key} className="legend-item">
                <span className="legend-color" style={{backgroundColor: value.color}}></span>
                <span>{value.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule View */}
        <div className="weekly-schedule">
          <h3>Weekly Schedule</h3>
          <div className="schedule-grid">
            {days.slice(0, 7).map(day => (
              <div key={day} className="day-column">
                <h4 className="day-title">{day}</h4>
                <div className="day-blocks">
                  {getScheduleByDay(day).length === 0 ? (
                    <div className="empty-day">Free day</div>
                  ) : (
                    getScheduleByDay(day)
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map(block => (
                        <div
                          key={block.id}
                          className={`schedule-block type-${block.type}`}
                          style={{borderLeftColor: typeColors[block.type].color}}
                        >
                          <div className="block-header">
                            <span className="block-title">{block.title}</span>
                            <button
                              className="block-delete"
                              onClick={() => onDeleteBlock(block.id)}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="block-time">
                            🕐 {block.startTime} - {block.endTime}
                          </div>
                          {block.location && (
                            <div className="block-location">📍 {block.location}</div>
                          )}
                          <div className="block-type">{typeColors[block.type].label}</div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Schedule Items List */}
        {schedule.length > 0 && (
          <div className="schedule-list-section">
            <h3>All Schedule Items ({schedule.length})</h3>
            <div className="schedule-list">
              {schedule
                .sort((a, b) => {
                  const dateCompare = new Date(a.date) - new Date(b.date)
                  if (dateCompare !== 0) return dateCompare
                  return a.startTime.localeCompare(b.startTime)
                })
                .map(block => (
                  <div key={block.id} className="list-item">
                    <div className="list-item-left">
                      <span
                        className="color-dot"
                        style={{backgroundColor: typeColors[block.type].color}}
                      ></span>
                      <div>
                        <div className="list-title">{block.title}</div>
                        <div className="list-details">
                          {block.date} · {block.startTime} - {block.endTime}
                          {block.location && ` · ${block.location}`}
                        </div>
                      </div>
                    </div>
                    <button
                      className="list-delete"
                      onClick={() => onDeleteBlock(block.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScheduleMaker
