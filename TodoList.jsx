import React, { useState } from 'react'
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react'
import './TodoList.css'

function TodoList({ tasks, onAddTask, onDeleteTask, onToggleTask }) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('assignment')
  const [filter, setFilter] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask({ title, dueDate, priority, category })
      setTitle('')
      setDueDate('')
      setPriority('medium')
      setCategory('assignment')
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    if (filter === 'urgent') return task.priority === 'high' && !task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (a.completed === b.completed) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return a.completed ? 1 : -1
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    urgent: tasks.filter(t => t.priority === 'high' && !t.completed).length
  }

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{color: '#4caf50'}}>{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{color: '#ff9800'}}>{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{color: '#f44336'}}>{stats.urgent}</div>
            <div className="stat-label">Urgent</div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="add-task-card">
          <h3>Add New Task</h3>
          <form onSubmit={handleSubmit} className="task-form">
            <input
              type="text"
              placeholder="Task title (e.g., Math assignment, Work shift)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
            
            <div className="form-row">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-field"
              />
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              >
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
                <option value="work">Work Shift</option>
                <option value="study">Study Session</option>
                <option value="project">Project</option>
                <option value="other">Other</option>
              </select>
              
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="input-field"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <button type="submit" className="submit-btn">
              <Plus size={20} />
              Add Task
            </button>
          </form>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === 'urgent' ? 'active' : ''}`}
            onClick={() => setFilter('urgent')}
          >
            Urgent
          </button>
        </div>

        {/* Tasks List */}
        <div className="tasks-list">
          {sortedTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet! Add one to get started.</p>
            </div>
          ) : (
            sortedTasks.map(task => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <button
                  className="checkbox-btn"
                  onClick={() => onToggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                <div className="task-content">
                  <h4 className="task-title">{task.title}</h4>
                  <div className="task-meta">
                    {task.dueDate && (
                      <span className="task-date">📅 {task.dueDate}</span>
                    )}
                    <span className={`task-category cat-${task.category}`}>
                      {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                    </span>
                    <span className={`task-priority priority-${task.priority}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList
