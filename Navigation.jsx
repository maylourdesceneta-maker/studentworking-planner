import React from 'react'
import { Calendar, CheckSquare, Clock, Timer, BookOpen, Users, Grid3x3 } from 'lucide-react'
import './Navigation.css'

function Navigation({ activeTab, setActiveTab }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">📚 Student Planner</h1>
        
        <ul className="nav-items">
          <li>
            <button
              className={`nav-button ${activeTab === 'planner' ? 'active' : ''}`}
              onClick={() => setActiveTab('planner')}
            >
              <Calendar size={20} />
              <span>Planner</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${activeTab === 'blocks' ? 'active' : ''}`}
              onClick={() => setActiveTab('blocks')}
            >
              <Grid3x3 size={20} />
              <span>Time Blocks</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${activeTab === 'todo' ? 'active' : ''}`}
              onClick={() => setActiveTab('todo')}
            >
              <CheckSquare size={20} />
              <span>To-Do</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              <Clock size={20} />
              <span>Schedule</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${activeTab === 'timer' ? 'active' : ''}`}
              onClick={() => setActiveTab('timer')}
            >
              <Timer size={20} />
              <span>Timer</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${activeTab === 'lms' ? 'active' : ''}`}
              onClick={() => setActiveTab('lms')}
            >
              <BookOpen size={20} />
              <span>Courses</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-button ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              <Users size={20} />
              <span>Contacts</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
