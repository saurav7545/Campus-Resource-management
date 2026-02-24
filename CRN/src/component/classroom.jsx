import React, { useState, useEffect } from 'react'

// Icons as simple SVG components
const ClassroomIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h20v18H2z"/>
    <path d="M6 7h4M6 11h4M6 15h4M14 7h4M14 11h4M14 15h4"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
)

// API base URL
const API_BASE = 'http://localhost:5000/api/resources';

// Year options
const yearOptions = ['1st', '2nd', '3rd', '4th']

// Section options
const sectionOptions = ['A', 'B', 'C', 'D']

function Classroom() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [classroomData, setClassroomData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch classrooms from API
  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE}/classrooms?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch classrooms');
      }
      
      const data = await response.json();
      setClassroomData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      // Fallback to sample data if API is not available
      setClassroomData([
        { id: 1, name: 'Classroom 101', course: 'Computer Science', year: '1st', section: 'A', location: 'Building A, Floor 2', capacity: 60, available: 0, status: 'occupied' },
        { id: 2, name: 'Classroom 102', course: 'Computer Science', year: '1st', section: 'B', location: 'Building A, Floor 2', capacity: 50, available: 50, status: 'available' },
        { id: 3, name: 'Classroom 103', course: 'Information Technology', year: '2nd', section: 'A', location: 'Building A, Floor 3', capacity: 55, available: 20, status: 'available' },
        { id: 4, name: 'Classroom 104', course: 'Information Technology', year: '2nd', section: 'B', location: 'Building A, Floor 3', capacity: 55, available: 0, status: 'occupied' },
        { id: 5, name: 'Classroom 201', course: 'Computer Science', year: '3rd', section: 'A', location: 'Building B, Floor 1', capacity: 45, available: 45, status: 'available' },
        { id: 6, name: 'Classroom 202', course: 'Computer Science', year: '3rd', section: 'B', location: 'Building B, Floor 1', capacity: 45, available: 0, status: 'occupied' },
        { id: 7, name: 'Classroom 203', course: 'Electronics', year: '3rd', section: 'A', location: 'Building B, Floor 2', capacity: 40, available: 15, status: 'available' },
        { id: 8, name: 'Classroom 301', course: 'Computer Science', year: '4th', section: 'A', location: 'Building C, Floor 1', capacity: 35, available: 35, status: 'available' },
        { id: 9, name: 'Classroom 302', course: 'Information Technology', year: '4th', section: 'A', location: 'Building C, Floor 1', capacity: 35, available: 10, status: 'available' },
        { id: 10, name: 'Classroom 303', course: 'Electronics', year: '4th', section: 'A', location: 'Building C, Floor 2', capacity: 30, available: 0, status: 'occupied' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter classrooms based on search criteria (client-side filtering for display)
  const filteredClassrooms = classroomData.filter(classroom => {
    const matchesCourse = searchTerm === '' || 
      classroom.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classroom.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === '' || classroom.year === selectedYear
    const matchesSection = selectedSection === '' || classroom.section === selectedSection
    
    return matchesCourse && matchesYear && matchesSection
  })

  const handleSearch = () => {
    // Fetch from API with filters
    const filters = {};
    if (searchTerm) filters.course = searchTerm;
    if (selectedYear) filters.year = selectedYear;
    if (selectedSection) filters.section = selectedSection;
    fetchClassrooms(filters);
  };

  return (
    <div className="classroom-container">
      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">Find Your Classroom</h2>
        <p className="search-subtitle">Search by course, year, and section</p>
        
        <div className="search-form">
          {/* Course Input */}
          <div className="form-group">
            <label className="form-label">Course</label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Enter course name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Year Dropdown */}
          <div className="form-group">
            <label className="form-label">Year</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year} Year</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section Dropdown */}
          <div className="form-group">
            <label className="form-label">Section</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="">Select Section</option>
                {sectionOptions.map(section => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="search-button" onClick={handleSearch}>
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="results-count">
          {loading ? 'Loading...' : `Found ${filteredClassrooms.length} classroom${filteredClassrooms.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {loading ? (
          <div className="loading">Loading classrooms...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : filteredClassrooms.length > 0 ? (
          filteredClassrooms.map(classroom => (
            <div key={classroom.id} className="classroom-card">
              <div className="classroom-header">
                <div className="classroom-icon">
                  <ClassroomIcon />
                </div>
                <span className={`status-badge ${classroom.status}`}>
                  {classroom.status === 'available' ? 'Available' : 'Occupied'}
                </span>
              </div>
              
              <h3 className="classroom-name">{classroom.name}</h3>
              
              <div className="classroom-info">
                <div className="info-row">
                  <span className="info-label">Course:</span>
                  <span className="info-value">{classroom.course}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Year:</span>
                  <span className="info-value">{classroom.year}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Section:</span>
                  <span className="info-value">{classroom.section}</span>
                </div>
              </div>
              
              <p className="classroom-location">
                <LocationIcon /> {classroom.location}
              </p>
              
              <div className="classroom-capacity">
                <div className="capacity-info">
                  <span className="capacity-label">Capacity</span>
                  <span className="capacity-value">{classroom.capacity}</span>
                </div>
                <div className="capacity-info">
                  <span className="capacity-label">Available</span>
                  <span className="capacity-value">{classroom.available}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No classrooms found matching your criteria.</p>
            <p>Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style>{`
        .classroom-container {
          padding: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .search-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .search-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          background: linear-gradient(135deg, var(--accent-cyan), #0088ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .search-form {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 16px;
          align-items: end;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-wrapper,
        .select-wrapper {
          position: relative;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px var(--accent-cyan-dim);
        }

        .form-input::placeholder {
          color: var(--text-secondary);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }

        .search-button {
          padding: 14px 28px;
          background: linear-gradient(135deg, var(--accent-cyan), #0088ff);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          height: 48px;
        }

        .search-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
        }

        .results-count {
          margin-top: 20px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .classroom-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .classroom-card:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
        }

        .classroom-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .classroom-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-cyan-dim);
          color: var(--accent-cyan);
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.available {
          background: #00ff8833;
          color: var(--success);
        }

        .status-badge.occupied {
          background: #ffaa0033;
          color: var(--warning);
        }

        .classroom-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .classroom-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }

        .info-row {
          display: flex;
          gap: 8px;
        }

        .info-label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .info-value {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .classroom-location {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .classroom-capacity {
          display: flex;
          gap: 24px;
        }

        .capacity-info {
          display: flex;
          flex-direction: column;
        }

        .capacity-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .capacity-value {
          font-size: 16px;
          font-weight: 600;
        }

        .no-results, .loading, .error-message {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
        }

        .no-results p, .loading p {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .error-message {
          color: #ff4444;
        }

        @media (max-width: 1024px) {
          .search-form {
            grid-template-columns: 1fr 1fr;
          }
          
          .search-button {
            grid-column: 1 / -1;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .search-form {
            grid-template-columns: 1fr;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Classroom
