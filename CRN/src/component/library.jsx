import React, { useState, useEffect } from 'react'

// Icons as simple SVG components
const LibraryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 7h8M8 11h8M8 15h4"/>
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

// Floor options
const floorOptions = ['Floor 1', 'Floor 2', 'Floor 3']

function Library() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFloor, setSelectedFloor] = useState('')
  const [libraryData, setLibraryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch libraries from API
  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/libraries`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch libraries');
      }
      
      const data = await response.json();
      setLibraryData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      // Fallback to sample data if API is not available
      setLibraryData([
        { id: 1, name: 'Main Library', location: 'Building B, Floor 1', capacity: 200, available: 156, status: 'available', hours: '8:00 AM - 10:00 PM', floors: 3 },
        { id: 2, name: 'Science Library', location: 'Building D, Floor 1', capacity: 100, available: 45, status: 'available', hours: '8:00 AM - 8:00 PM', floors: 2 },
        { id: 3, name: 'Digital Library', location: 'Building C, Floor 2', capacity: 50, available: 0, status: 'occupied', hours: '9:00 AM - 6:00 PM', floors: 1 },
        { id: 4, name: 'Law Library', location: 'Building E, Floor 1', capacity: 80, available: 60, status: 'available', hours: '9:00 AM - 9:00 PM', floors: 2 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter libraries based on search criteria
  const filteredLibraries = libraryData.filter(lib => {
    const matchesName = searchTerm === '' || 
      lib.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFloor = selectedFloor === '' || lib.location?.toLowerCase().includes(selectedFloor.toLowerCase())
    
    return matchesName && matchesFloor
  })

  return (
    <div className="library-container">
      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">Find Libraries</h2>
        <p className="search-subtitle">Search by library name and location</p>
        
        <div className="search-form">
          {/* Library Name Input */}
          <div className="form-group">
            <label className="form-label">Library Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Enter library name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Floor Dropdown */}
          <div className="form-group">
            <label className="form-label">Floor</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                <option value="">Select Floor</option>
                {floorOptions.map(floor => (
                  <option key={floor} value={floor}>{floor}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="search-button">
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="results-count">
          {loading ? 'Loading...' : `Found ${filteredLibraries.length} library${filteredLibraries.length !== 1 ? 'ries' : 'ry'}`}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {loading ? (
          <div className="loading">Loading libraries...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : filteredLibraries.length > 0 ? (
          filteredLibraries.map(lib => (
            <div key={lib.id} className="library-card">
              <div className="library-header">
                <div className="library-icon">
                  <LibraryIcon />
                </div>
                <span className={`status-badge ${lib.status}`}>
                  {lib.status === 'available' ? 'Available' : 'Occupied'}
                </span>
              </div>
              
              <h3 className="library-name">{lib.name}</h3>
              
              <p className="library-location">
                <LocationIcon /> {lib.location}
              </p>
              
              <div className="library-info">
                <div className="info-item">
                  <span className="info-label">Hours</span>
                  <span className="info-value">{lib.hours}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Floors</span>
                  <span className="info-value">{lib.floors}</span>
                </div>
              </div>
              
              <div className="library-capacity">
                <div className="capacity-info">
                  <span className="capacity-label">Capacity</span>
                  <span className="capacity-value">{lib.capacity}</span>
                </div>
                <div className="capacity-info">
                  <span className="capacity-label">Available</span>
                  <span className="capacity-value">{lib.available}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No libraries found matching your criteria.</p>
            <p>Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style>{`
        .library-container {
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

        .library-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .library-card:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
        }

        .library-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .library-icon {
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

        .library-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .library-location {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .library-info {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 14px;
          font-weight: 600;
        }

        .library-capacity {
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

export default Library
