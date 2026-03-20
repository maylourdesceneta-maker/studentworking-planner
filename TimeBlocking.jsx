import React, { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import './TimeBlocking.css'

function TimeBlocking({ schedule }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [viewType, setViewType] = useState('day') // day or week
  const [newBlock, setNewBlock] = useState({
    title: '',
    startTime: '09:00',
    endTime: '10:00',
    type: 'class',
    location: ''
  })
  const [blocks, setBlocks] = useState([])
  const [editingId, setEditingId] = useState(null)

  // Add or update block
  const handleAddBlock = (e) => {
    e.preventDefault()
    if (newBlock.title.trim()) {
      if (editingId) {
        setBlocks(blocks.map(b => b.id === editingId ? { ...newBlock, id: editingId } : b))
        setEditingId(null)
      } else {
        setBlocks([...blocks, { ...newBlock, id: Date.now(), date: selectedDate }])
      }
      setNewBlock({ title: '', startTime: '09:00', endTime: '10:00', type: 'class', location: '' })
    }
  }

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id))
  }

  const getBlocksForDate = (date) => {
    return blocks.filter(b => b.date === date).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  const getBlocksForDay = (day) => {
    const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const selectedDay = dayMap[new Date(selectedDate).getDay()]
    
    return schedule.filter(s => {
      const blockDate = new Date(s.date)
      const blockDay = dayMap[blockDate.getDay()]
      return blockDay === selectedDay
    })
  }

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  const calculatePosition = (time) => {
    const minutes = timeToMinutes(time)
    return (minutes / 60) * 60 // pixels based on 60px per hour
  }

  const calculateHeight = (startTime, endTime) => {
    const startMin = timeToMinutes(startTime)
    const endMin = timeToMinutes(endTime)
    return ((endMin - startMin) / 60) * 60 // pixels
  }

  const typeColors = {
    class: { bg: '#e3f2fd', border: '#1976d2', text: '#0d47a1' },
    work: { bg: '#e8f5e9', border: '#388e3c', text: '#1b5e20' },
    study: { bg: '#f3e5f5', border: '#7b1fa2', text: '#4a148c' },
    break: { bg: '#fff3e0', border: '#f57c00', text: '#e65100' }
  }

  const hours = Array.from({ length: 14 }, (_, i) => i + 6) // 6 AM to 8 PM

  const allBlocks = [...getBlocksForDate(selectedDate), ...getBlocksForDay(selectedDate)]
  const totalHours = allBlocks.reduce((sum, b) => {
    const duration = timeToMinutes(b.endTime) - timeToMinutes(b.startTime)
    return sum + (duration / 60)
  }, 0)

  const freeHours = 14 - totalHours

  return (
    <div className="timeblocking-container">
      <div className="timeblocking-wrapper">
        {/* Header & Stats */}
        <div className="blocking-header">
          <div className="header-content">
            <h2>📊 Time Blocking & Day View</h2>
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewType === 'day' ? 'active' : ''}`}
                onClick={() => setViewType('day')}
              >
                Day View
              </button>
              <button 
                className={`toggle-btn ${viewType === 'week' ? 'active' : ''}`}
                onClick={() => setViewType('week')}
              >
                Week View
              </button>
            </div>
          </div>

          <div className="date-picker">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>

        {/* Time Stats */}
        <div className="time-stats">
          <div className="stat">
            <span className="stat-value">{totalHours.toFixed(1)}h</span>
            <span className="stat-label">Scheduled</span>
          </div>
          <div className="stat">
            <span className="stat-value">{freeHours.toFixed(1)}h</span>
            <span className="stat-label">Free Time</span>
          </div>
          <div className="stat">
            <span className="stat-value">{allBlocks.length}</span>
            <span className="stat-label">Activities</span>
          </div>
        </div>

        {viewType === 'day' && (
          <>
            {/* Add Block Form */}
            <div className="add-block-card">
              <h3>{editingId ? '✏️ Edit Time Block' : '➕ Add Time Block'}</h3>
              <form onSubmit={handleAddBlock} className="block-form">
                <input
                  type="text"
                  placeholder="Activity name (e.g., Math Class, Work Shift)"
                  value={newBlock.title}
                  onChange={(e) => setNewBlock({ ...newBlock, title: e.target.value })}
                  className="input-field"
                  required
                />

                <div className="form-row">
                  <input
                    type="time"
                    value={newBlock.startTime}
                    onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })}
                    className="input-field"
                    required
                  />
                  <input
                    type="time"
                    value={newBlock.endTime}
                    onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div className="form-row">
                  <select
                    value={newBlock.type}
                    onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value })}
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
                    value={newBlock.location}
                    onChange={(e) => setNewBlock({ ...newBlock, location: e.target.value })}
                    className="input-field"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <Plus size={18} />
                  {editingId ? 'Update Block' : 'Add Block'}
                </button>
              </form>
            </div>

            {/* Time Block Visualization */}
            <div className="timeline-section">
              <h3>Today's Schedule</h3>
              <div className="timeline">
                {/* Hours column */}
                <div className="hours-column">
                  {hours.map(hour => (
                    <div key={hour} className="hour-marker">
                      {String(hour).padStart(2, '0')}:00
                    </div>
                  ))}
                </div>

                {/* Blocks container */}
                <div className="blocks-container">
                  {/* Grid lines */}
                  {hours.map(hour => (
                    <div key={`line-${hour}`} className="hour-line"></div>
                  ))}

                  {/* Time blocks */}
                  {allBlocks.map(block => {
                    const top = calculatePosition(block.startTime)
                    const height = calculateHeight(block.startTime, block.endTime)
                    const color = typeColors[block.type]

                    return (
                      <div
                        key={block.id}
                        className="time-block"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          backgroundColor: color.bg,
                          borderLeft: `4px solid ${color.border}`
                        }}
                      >
                        <div className="block-header">
                          <h4 style={{ color: color.text }}>{block.title}</h4>
                          {block.id && typeof block.id === 'number' && block.id > 1000 && (
                            <button
                              className="block-delete"
                              onClick={() => deleteBlock(block.id)}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        <div className="block-details" style={{ color: color.text }}>
                          <div>🕐 {block.startTime} - {block.endTime}</div>
                          {block.location && <div>📍 {block.location}</div>}
                        </div>
                        <div className="block-type" style={{ background: color.border, color: 'white' }}>
                          {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* List View */}
            {allBlocks.length > 0 && (
              <div className="list-view">
                <h3>Activity List for {selectedDate}</h3>
                <div className="activities-list">
                  {allBlocks.map(block => (
                    <div key={block.id} className="activity-item">
                      <div className="activity-color" style={{ 
                        backgroundColor: typeColors[block.type].border 
                      }}></div>
                      <div className="activity-content">
                        <div className="activity-title">{block.title}</div>
                        <div className="activity-meta">
                          🕐 {block.startTime} - {block.endTime}
                          {block.location && ` • 📍 ${block.location}`}
                        </div>
                      </div>
                      <span className="activity-type">
                        {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                      </span>
                      {block.id && typeof block.id === 'number' && block.id > 1000 && (
                        <button
                          className="delete-btn"
                          onClick={() => deleteBlock(block.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {viewType === 'week' && (
          <div className="week-view">
            <h3>Weekly Overview</h3>
            <div className="week-grid">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="week-day-card">
                  <h4>{day}</h4>
                  <div className="day-blocks-mini">
                    {schedule
                      .filter(s => {
                        const blockDate = new Date(s.date)
                        const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                        return dayMap[blockDate.getDay()] === day
                      })
                      .map(block => (
                        <div
                          key={block.id}
                          className="mini-block"
                          style={{
                            backgroundColor: typeColors[block.type].bg,
                            borderLeft: `3px solid ${typeColors[block.type].border}`
                          }}
                        >
                          <div className="mini-title">{block.title}</div>
                          <div className="mini-time">{block.startTime}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TimeBlocking
