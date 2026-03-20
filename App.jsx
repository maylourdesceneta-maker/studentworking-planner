import React, { useState, useEffect } from 'react'
import './App.css'
import Planner from './components/Planner/Planner'
import TodoList from './components/TodoList/TodoList'
import ScheduleMaker from './components/ScheduleMaker/ScheduleMaker'
import TimeBlocking from './components/TimeBlocking/TimeBlocking'
import StudyTimer from './components/StudyTimer/StudyTimer'
import LMS from './components/LMS/LMS'
import Contacts from './components/Contacts/Contacts'
import Navigation from './components/Navigation/Navigation'

function App() {
  const [activeTab, setActiveTab] = useState('planner')
  const [tasks, setTasks] = useState([])
  const [schedule, setSchedule] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('studentPlannerTasks')
    const savedSchedule = localStorage.getItem('studentPlannerSchedule')
    
    if (savedTasks) setTasks(JSON.parse(savedTasks))
    if (savedSchedule) setSchedule(JSON.parse(savedSchedule))
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('studentPlannerTasks', JSON.stringify(tasks))
  }, [tasks])

  // Save schedule to localStorage
  useEffect(() => {
    localStorage.setItem('studentPlannerSchedule', JSON.stringify(schedule))
  }, [schedule])

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const addScheduleBlock = (block) => {
    setSchedule([...schedule, { ...block, id: Date.now() }])
  }

  const deleteScheduleBlock = (id) => {
    setSchedule(schedule.filter(block => block.id !== id))
  }

  return (
    <div className="app-container">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="content">
        {activeTab === 'planner' && (
          <Planner tasks={tasks} schedule={schedule} />
        )}
        
        {activeTab === 'blocks' && (
          <TimeBlocking schedule={schedule} />
        )}
        
        {activeTab === 'todo' && (
          <TodoList 
            tasks={tasks}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
          />
        )}
        
        {activeTab === 'schedule' && (
          <ScheduleMaker
            schedule={schedule}
            onAddBlock={addScheduleBlock}
            onDeleteBlock={deleteScheduleBlock}
          />
        )}

        {activeTab === 'timer' && (
          <StudyTimer />
        )}

        {activeTab === 'lms' && (
          <LMS />
        )}

        {activeTab === 'contacts' && (
          <Contacts />
        )}
      </div>
    </div>
  )
}

export default App
