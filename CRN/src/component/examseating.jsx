import React, { useState, useEffect } from 'react'

// Icons as simple SVG components
const ExamIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <path d="M9 12h6M9 16h6"/>
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

// Exam seating data
const sampleExamData = [
  { id: 1, examName: 'Mid-Term Exam - CS101', date: '2024-03-15', time: '09:00 AM - 12:00 PM', location: 'Exam Hall A', totalSeats: 100, availableSeats: 25, status: 'available' },
  { id: 2, examName: 'Mid-Term Exam - IT201', date: '2024-03-16', time: '02:00 PM - 05:00 PM', location: 'Exam Hall B', totalSeats: 80, availableSeats: 0, status: 'full' },
  { id: 3, examName: 'End-Term Exam - CS301', date: '2024-03-18', time: '09:00 AM - 12:00 PM', location: 'Exam Hall A', totalSeats: 100, availableSeats: 50, status: 'available' },
  { id: 4, examName: 'Practical Exam - Lab 1', date: '2024-03-19', time: '10:00 AM - 01:00 PM', location: 'Computer Lab 1', totalSeats: 40, availableSeats: 10, status: 'available' },
  { id: 5, examName: 'Mid-Term Exam - EC101', date: '2024-03-20', time: '02:00 PM - 05:00 PM', location: 'Exam Hall C', totalSeats: 60, availableSeats: 0, status: 'full' },
  { id: 6, examName: 'End-Term Exam - IT101', date: '2024-03-21', time: '09:00 AM - 12:00 PM', location: 'Exam Hall B', totalSeats: 80, availableSeats: 35, status: 'available' },
]

// Year options
const yearOptions = ['1st', '2nd', '3rd', '4th']

function ExamSeating() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [examData, setExamData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch exam seating from API
  useEffect(() => {
    fetchExamSeating();
  }, []);

  const fetchExamSeating = async (filters = {}) => {
    try {
      setLoading(true);
      // For now, use sample data as API endpoint may not be available
      // const queryParams = new URLSearchParams(filters).toString();
      // const response = await fetch(`${API_BASE}/exams?${queryParams}`);
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setExamData(sampleExamData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setExamData(sampleExamData);
    } finally {
      setLoading(false);
    }
  };

  // Filter exams based on search criteria
  const filteredExams = examData.filter(exam => {
    const matchesSearch = searchTerm === '' || 
      exam.examName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === '' || exam.examName?.includes(selectedYear)
    
    return matchesSearch && matchesYear
  })

  const handleSearch = () => {
    const filters = {};
    if (searchTerm) filters.search = searchTerm;
    if (selectedYear) filters.year = selectedYear;
    fetchExamSeating(filters);
  };

  return (
    <div className="examseating-container">
      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">Exam Seating</h2>
        <p className="search-subtitle">Find exam venues and available seating</p>
        
        <div className="search-form">
          {/* Exam Name Input */}
          <div className="form-group">
            <label className="form-label">Exam Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Enter exam name..."
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

          {/* Search Button */}
          <button className="search-button" onClick={handleSearch}>
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="results-count">
          {loading ? 'Loading...' : `Found ${filteredExams.length} exam${filteredExams.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {loading ? (
          <div className="loading">Loading exam seating...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : filteredExams.length > 0 ? (
          filteredExams.map(exam => (
            <div key={exam.id} className="exam-card">
              <div className="exam-header">
                <div className="exam-icon">
                  <ExamIcon />
                </div>
                <span className={`status-badge ${exam.status}`}>
                  {exam.status === 'available' ? 'Available' : exam.status === 'full' ? 'Full' : 'Closed'}
                </span>
              </div>
              
              <h3 className="exam-name">{exam.examName}</h3>
              
              <div className="exam-info">
                <div className="info-row">
                  <span className="info-label">Date:</span>
                  <span className="info-value">{exam.date}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Time:</span>
                  <span className="info-value">{exam.time}</span>
                </div>
              </div>
              
              <p className="exam-location">
                <LocationIcon /> {exam.location}
              </p>
              
              <div className="exam-capacity">
                <div className="capacity-info">
                  <span className="capacity-label">Total Seats</span>
                  <span className="capacity-value">{exam.totalSeats}</span>
                </div>
                <div className="capacity-info">
                  <span className="capacity-label">Available</span>
                  <span className="capacity-value">{exam.availableSeats}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No exam seating found matching your criteria.</p>
            <p>Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style>{`
        .examseating-container {
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
          grid-template-columns: 2fr 1fr auto;
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

        .exam-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .exam-card:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
        }

        .exam-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .exam-icon {
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

        .status-badge.full {
          background: #ff444433;
          color: #ff4444;
        }

        .exam-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .exam-info {
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

        .exam-location {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .exam-capacity {
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

export default ExamSeating
