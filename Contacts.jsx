import React, { useState } from 'react'
import { Plus, Trash2, Mail, Phone, MapPin } from 'lucide-react'
import './Contacts.css'

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('teacher')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [institution, setInstitution] = useState('')
  const [office, setOffice] = useState('')
  const [notes, setNotes] = useState('')
  const [filter, setFilter] = useState('all')

  const handleAddContact = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setContacts([...contacts, {
        id: Date.now(),
        name,
        role,
        email,
        phone,
        institution,
        office,
        notes,
        createdAt: new Date().toLocaleDateString()
      }])
      setName('')
      setEmail('')
      setPhone('')
      setInstitution('')
      setOffice('')
      setNotes('')
      setRole('teacher')
    }
  }

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  const filteredContacts = contacts.filter(c => {
    if (filter === 'all') return true
    return c.role === filter
  })

  const stats = {
    teachers: contacts.filter(c => c.role === 'teacher').length,
    supervisors: contacts.filter(c => c.role === 'supervisor').length,
    advisors: contacts.filter(c => c.role === 'advisor').length
  }

  const roleIcons = {
    teacher: '👨‍🏫',
    supervisor: '💼',
    advisor: '📋'
  }

  return (
    <div className="contacts-container">
      <div className="contacts-wrapper">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍🏫</div>
            <div className="stat-number">{stats.teachers}</div>
            <div className="stat-label">Teachers</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-number">{stats.supervisors}</div>
            <div className="stat-label">Supervisors</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-number">{stats.advisors}</div>
            <div className="stat-label">Advisors</div>
          </div>
        </div>

        {/* Add Contact Form */}
        <div className="add-contact-card">
          <h3>Add New Contact</h3>
          <form onSubmit={handleAddContact} className="contact-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field"
              >
                <option value="teacher">Teacher/Professor</option>
                <option value="supervisor">Work Supervisor</option>
                <option value="advisor">Academic Advisor</option>
              </select>
            </div>

            <div className="form-row">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Institution/Company"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Office/Room number"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
                className="input-field"
              />
            </div>

            <textarea
              placeholder="Additional notes (subject, office hours, etc.)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field textarea"
              rows="3"
            />

            <button type="submit" className="submit-btn">
              <Plus size={20} />
              Add Contact
            </button>
          </form>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Contacts
          </button>
          <button
            className={`filter-btn ${filter === 'teacher' ? 'active' : ''}`}
            onClick={() => setFilter('teacher')}
          >
            Teachers
          </button>
          <button
            className={`filter-btn ${filter === 'supervisor' ? 'active' : ''}`}
            onClick={() => setFilter('supervisor')}
          >
            Supervisors
          </button>
          <button
            className={`filter-btn ${filter === 'advisor' ? 'active' : ''}`}
            onClick={() => setFilter('advisor')}
          >
            Advisors
          </button>
        </div>

        {/* Contacts List */}
        <div className="contacts-list">
          {filteredContacts.length === 0 ? (
            <div className="empty-state">
              <p>No contacts yet. Add one to get started!</p>
            </div>
          ) : (
            filteredContacts.map(contact => (
              <div key={contact.id} className="contact-card">
                <div className="contact-header">
                  <div className="contact-icon">{roleIcons[contact.role]}</div>
                  <div className="contact-title">
                    <h4>{contact.name}</h4>
                    <span className={`contact-role role-${contact.role}`}>
                      {contact.role === 'teacher' ? '👨‍🏫 Teacher/Professor' : contact.role === 'supervisor' ? '💼 Work Supervisor' : '📋 Academic Advisor'}
                    </span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteContact(contact.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="contact-details">
                  {contact.email && (
                    <div className="detail-item">
                      <Mail size={16} />
                      <span>{contact.email}</span>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="detail-item">
                      <Phone size={16} />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  {contact.institution && (
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{contact.institution}</span>
                    </div>
                  )}
                  {contact.office && (
                    <div className="detail-item">
                      <span className="office-label">📍 Office:</span>
                      <span>{contact.office}</span>
                    </div>
                  )}
                </div>

                {contact.notes && (
                  <div className="contact-notes">
                    <strong>Notes:</strong> {contact.notes}
                  </div>
                )}

                <div className="contact-footer">
                  <small>Added on {contact.createdAt}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Contacts
