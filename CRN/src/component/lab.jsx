import React, { useState, useEffect } from 'react'

// Icons as simple SVG components
const LabIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
    <circle cx="7" cy="10" r="1"/>
    <circle cx="12" cy="10" r="1"/>
    <circle cx="17" cy="10" r="1"/>
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

// Lab type options
const labTypeOptions = ['Computer Lab', 'Physics Lab', 'Chemistry Lab', 'Biology Lab']

// Floor options
const floorOptions = ['Floor 1', 'Floor 2', 'Floor 3']

function Lab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedFloor, setSelectedFloor] = useState('')
  const [labData, setLabData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch labs from API
  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE}/labs?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch labs');
      }
      
      const data = await response.json();
      setLabData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      // Fallback to sample data if API is not available
      setLabData([
        { id: 1, name: 'Computer Lab 1', location: 'Building A, Floor 1', capacity: 40, available: 28, status: 'available', equipment: ['Computers', 'Projector', 'AC'] },
        { id: 2, name: 'Computer Lab 2', location: 'Building A, Floor 1', capacity: 35, available: 0, status: 'occupied', equipment: ['Computers', 'Projector'] },
        { id: 3, name: 'Computer Lab 3', location: 'Building A, Floor 2', capacity: 45, available: 15, status: 'available', equipment: ['Computers', 'Projector', 'AC', 'Smartboard'] },
        { id: 4, name: 'Computer Lab 4', location: 'Building B, Floor 1', capacity: 30, available: 30, status: 'available', equipment: ['Computers', 'AC'] },
        { id: 5, name: 'Physics Lab', location: 'Building B, Floor 2', capacity: 25, available: 10, status: 'available', equipment: ['Lab Equipment', 'Projector'] },
        { id: 6, name: 'Chemistry Lab', location: 'Building B, Floor 2', capacity: 20, available: 0, status: 'occupied', equipment: ['Lab Equipment', 'Fume Hood'] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter labs based on search criteria
  const filteredLabs = labData.filter(lab => {
    const matchesName = searchTerm === '' || 
      lab.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === '' || lab.name?.toLowerCase().includes(selectedType.toLowerCase())
    const matchesFloor = selectedFloor === '' || lab.location?.toLowerCase().includes(selectedFloor.toLowerCase())
    
    return matchesName && matchesType && matchesFloor
  })

  const handleSearch = () => {
    const filters = {};
    if (selectedType) filters.type = selectedType;
    fetchLabs(filters);
  };

  return (
    <div className="lab-container">
      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">Find Labs</h2>
        <p className="search-subtitle">Search by lab name, type, and location</p>
        
        <div className="search-form">
          {/* Lab Name Input */}
          <div className="form-group">
            <label className="form-label">Lab Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Enter lab name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Lab Type Dropdown */}
          <div className="form-group">
            <label className="form-label">Lab Type</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Select Type</option>
                {labTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
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
          <button className="search-button" onClick={handleSearch}>
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="results-count">
          {loading ? 'Loading...' : `Found ${filteredLabs.length} lab${filteredLabs.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {loading ? (
          <div className="loading">Loading labs...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : filteredLabs.length > 0 ? (
          filteredLabs.map(lab => (
            <div key={lab.id} className="lab-card">
              <div className="lab-header">
                <div className="lab-icon">
                  <LabIcon />
                </div>
                <span className={`status-badge ${lab.status}`}>
                  {lab.status === 'available' ? 'Available' : 'Occupied'}
                </span>
              </div>
              
              <h3 className="lab-name">{lab.name}</h3>
              
              <p className="lab-location">
                <LocationIcon /> {lab.location}
              </p>
              
              <div className="lab-equipment">
                <span className="equipment-label">Equipment:</span>
                <div className="equipment-tags">
                  {lab.equipment?.map((item, index) => (
                    <span key={index} className="equipment-tag">{item}</span>
                  ))}
                </div>
              </div>
              
              <div className="lab-capacity">
                <div className="capacity-info">
                  <span className="capacity-label">Capacity</span>
                  <span className="capacity-value">{lab.capacity}</span>
                </div>
                <div className="capacity-info">
                  <span className="capacity-label">Available</span>
                  <span className="capacity-value">{lab.available}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No labs found matching your criteria.</p>
            <p>Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Inline Styles */}
      <style>{`
        .lab-container {
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

        .lab-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .lab-card:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
        }

        .lab-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .lab-icon {
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

        .lab-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .lab-location {
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .lab-equipment {
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .equipment-label {
          font-size: 12px;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 8px;
        }

        .equipment-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .equipment-tag {
          padding: 4px 10px;
          background: var(--bg-secondary);
          border-radius: 12px;
          font-size: 11px;
          color: var(--text-primary);
        }

        .lab-capacity {
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

export default Lab
