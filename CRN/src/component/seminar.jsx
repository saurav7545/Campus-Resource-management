import React, { useState, useEffect } from 'react'

// Icons as simple SVG components
const SeminarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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

// Capacity options
const capacityOptions = ['Small (up to 20)', 'Medium (21-50)', 'Large (51-100)', 'Extra Large (100+)']

function Seminar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCapacity, setSelectedCapacity] = useState('')
  const [seminarData, setSeminarData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch seminars from API
  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE}/seminars?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch seminars');
      }
      
      const data = await response.json();
      setSeminarData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      // Fallback to sample data if API is not available
      setSeminarData([
        { id: 1, name: 'Seminar Hall A', location: 'Building C, Floor 3', capacity: 100, available: 0, status: 'occupied', features: ['Projector', 'Microphone', 'AC'] },
        { id: 2, name: 'Conference Room', location: 'Building C, Floor 1', capacity: 20, available: 20, status: 'available', features: ['TV Screen', 'Video Conferencing'] },
        { id: 3, name: 'Seminar Hall B', location: 'Building C, Floor 2', capacity: 75, available: 30, status: 'available', features: ['Projector', 'Microphone', 'Whiteboard'] },
        { id: 4, name: 'Meeting Room 1', location: 'Building C, Floor 1', capacity: 15, available: 15, status: 'available', features: ['TV Screen', 'Whiteboard'] },
        { id: 5, name: 'Seminar Hall C', location: 'Building D, Floor 1', capacity: 150, available: 80, status: 'available', features: ['Projector', 'Microphone', 'AC', 'Recording Equipment'] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter seminars based on search criteria
  const filteredSeminars = seminarData.filter(seminar => {
    const matchesName = searchTerm === '' || 
      seminar.name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesCapacity = true
    if (selectedCapacity) {
      if (selectedCapacity === 'Small (up to 20)') {
        matchesCapacity = seminar.capacity <= 20
      } else if (selectedCapacity === 'Medium (21-50)') {
        matchesCapacity = seminar.capacity > 20 && seminar.capacity <= 50
      } else if (selectedCapacity === 'Large (51-100)') {
        matchesCapacity = seminar.capacity > 50 && seminar.capacity <= 100
      } else if (selectedCapacity === 'Extra Large (100+)') {
        matchesCapacity = seminar.capacity > 100
      }
    }
    
    return matchesName && matchesCapacity
  })

  const handleSearch = () => {
    // Map capacity options to API filters
    let filters = {};
    if (selectedCapacity === 'Small (up to 20)') {
      filters.maxCapacity = 20;
    } else if (selectedCapacity === 'Medium (21-50)') {
      filters.minCapacity = 21;
      filters.maxCapacity = 50;
    } else if (selectedCapacity === 'Large (51-100)') {
      filters.minCapacity = 51;
      filters.maxCapacity = 100;
    } else if (selectedCapacity === 'Extra Large (100+)') {
      filters.minCapacity = 101;
    }
    fetchSeminars(filters);
  };

  return (
    <div className="seminar-container">
      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">Find Seminar Halls</h2>
        <p className="search-subtitle">Search by hall name and capacity</p>
        
        <div className="search-form">
          {/* Seminar Hall Name Input */}
          <div className="form-group">
            <label className="form-label">Hall Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Enter hall name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Capacity Dropdown */}
          <div className="form-group">
            <label className="form-label">Capacity</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
              >
                <option value="">Select Capacity</option>
                {capacityOptions.map(cap => (
                  <option key={cap} value={cap}>{cap}</option>
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
          {loading ? 'Loading...' : `Found ${filteredSeminars.length} hall${filteredSeminars.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {loading ? (
          <div className="loading">Loading seminars...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : filteredSeminars.length > 0 ? (
          filteredSeminars.map(seminar => (
            <div key={seminar.id} className="seminar-card">
              <div className="seminar-header">
                <div className="seminar-icon">
                  <SeminarIcon />
                </div>
                <span className={`status-badge ${seminar.status}`}>
                  {seminar.status === 'available' ? 'Available' : 'Occupied'}
                </span>
              </div>
              
              <h3 className="seminar-name">{seminar.name}</h3>
              
              <p className="seminar-location">
                <LocationIcon /> {seminar.location}
              </p>
              
              <div className="seminar-features">
                <span className="features-label">Features:</span>
                <div className="feature-tags">
                  {seminar.features?.map((item, index) => (
                    <span key={index} className="feature-tag">{item}</span>
                  ))}
                </div>
              </div>
              
              <div className="seminar-capacity">
                <div className="capacity-info">
                  <span className="capacity-label">Capacity</span>
                  <span className="capacity-value">{seminar.capacity}</span>
                </div>
                <div className="capacity-info">
                  <span className="capacity-label">Available</span>
                  <span className="capacity-value">{seminar.available}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No seminar halls found matching your criteria.</p>
            <p>Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style>{`
        .seminar-container {
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

        .seminar-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .seminar-card:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
        }

        .seminar-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .seminar-icon {
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

        .seminar-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .seminar-location {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .seminar-features {
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .features-label {
          font-size: 12px;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 8px;
        }

        .feature-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .feature-tag {
          padding: 4px 10px;
          background: var(--bg-secondary);
          border-radius: 12px;
          font-size: 11px;
          color: var(--text-primary);
        }

        .seminar-capacity {
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

export default Seminar
