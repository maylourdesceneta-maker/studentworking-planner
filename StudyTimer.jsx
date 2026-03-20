import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Clock } from 'lucide-react'
import './StudyTimer.css'

function StudyTimer() {
  const [studyTime, setStudyTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isStudy, setIsStudy] = useState(true)
  const [sessions, setSessions] = useState([])
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      handleSessionComplete()
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const handleSessionComplete = () => {
    if (isStudy) {
      setSessionCount(c => c + 1)
      setSessions([...sessions, { type: 'study', duration: studyTime, completedAt: new Date().toLocaleTimeString() }])
      alert('✅ Study session complete! Time for a break.')
      setIsStudy(false)
      setTimeLeft(breakTime * 60)
    } else {
      alert('⏰ Break time over! Ready to study again?')
      setIsStudy(true)
      setTimeLeft(studyTime * 60)
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsStudy(true)
    setTimeLeft(studyTime * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="timer-container">
      <div className="timer-wrapper">
        {/* Timer Display */}
        <div className="timer-card">
          <div className={`timer-mode ${isStudy ? 'study' : 'break'}`}>
            {isStudy ? '📚 Study Session' : '☕ Break Time'}
          </div>

          <div className="timer-display">
            <div className="timer-value">{formatTime(timeLeft)}</div>
          </div>

          <div className="timer-controls">
            <button 
              className={`control-btn ${isRunning ? 'playing' : ''}`}
              onClick={toggleTimer}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="control-btn reset" onClick={resetTimer}>
              <RotateCcw size={24} />
            </button>
          </div>

          <div className="timer-stats">
            <div className="stat">
              <span className="stat-label">Sessions Completed</span>
              <span className="stat-value">{sessionCount}</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="timer-settings">
          <h3>Pomodoro Settings</h3>
          <div className="setting-row">
            <label>Study Duration (minutes)</label>
            <div className="setting-control">
              <button onClick={() => setStudyTime(Math.max(1, studyTime - 1))}>−</button>
              <input type="number" value={studyTime} min="1" readOnly />
              <button onClick={() => setStudyTime(studyTime + 1)}>+</button>
            </div>
          </div>

          <div className="setting-row">
            <label>Break Duration (minutes)</label>
            <div className="setting-control">
              <button onClick={() => setBreakTime(Math.max(1, breakTime - 1))}>−</button>
              <input type="number" value={breakTime} min="1" readOnly />
              <button onClick={() => setBreakTime(breakTime + 1)}>+</button>
            </div>
          </div>

          <button 
            className="update-btn"
            onClick={() => {
              setIsRunning(false)
              setIsStudy(true)
              setTimeLeft(studyTime * 60)
            }}
          >
            Update Timer
          </button>
        </div>

        {/* Session History */}
        {sessions.length > 0 && (
          <div className="session-history">
            <h3>Session History</h3>
            <div className="sessions-list">
              {sessions.map((session, idx) => (
                <div key={idx} className="session-item">
                  <span className="session-type">{session.type === 'study' ? '📚' : '☕'}</span>
                  <span className="session-duration">{session.duration} min</span>
                  <span className="session-time">{session.completedAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudyTimer
