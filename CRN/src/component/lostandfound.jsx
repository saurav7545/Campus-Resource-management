import React, { useState, useEffect } from 'react'

// Icons as simple SVG components
const LostFoundIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4"/>
    <path d="M12 16h.01"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
)

const CategoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)

// Lost and found sample data
const sampleLostFoundData = [
  { id: 1, itemName: 'Blue Backpack', category: 'Bags', location: 'Library', dateFound: '2024-03-10', status: 'unclaimed', description: 'Blue backpack with laptop inside, found near the reading section' },
  { id: 2, itemName: 'Student ID Card', category: 'Documents', location: 'Cafeteria', dateFound: '2024-03-11', status: 'claimed', description: 'Student ID card - Name: John Smith, Department: Computer Science' },
  { id: 3, itemName: 'Black Wallet', category: 'Wallets', location: 'Computer Lab 1', dateFound: '2024-03-12', status: 'unclaimed', description: 'Black leather wallet with some cash and cards' },
  { id: 4, itemName: 'Keys Set', category: 'Keys', location: 'Parking Lot', dateFound: '2024-03-13', status: 'unclaimed', description: 'Set of 3 keys with a red keychain' },
  { id: 5, itemName: 'Water Bottle', category: 'Bottles', location: 'Sports Ground', dateFound: '2024-03-14', status: 'claimed', description: 'Blue thermal water bottle' },
  { id: 6, itemName: 'Textbook - Data Structures', category: 'Books', location: 'Classroom 101', dateFound: '2024-03-15', status: 'unclaimed', description: 'Data Structures and Algorithms textbook, 3rd Edition' },
  { id: 7, itemName: 'Headphones', category: 'Electronics', location: 'Audio Lab', dateFound: '2024-03-15', status: 'unclaimed', description: 'Sony wireless headphones in black case' },
  { id: 8, itemName: 'Umbrella', category: 'Accessories', location: 'Main Entrance', dateFound: '2024-03-16', status: 'claimed', description: 'Black umbrella with silver handle' },
]

// Category options
const categoryOptions = ['All', 'Bags', 'Documents', 'Wallets', 'Keys', 'Bottles', 'Books', 'Electronics', 'Accessories']

// Status options
const statusOptions = ['All', 'unclaimed', 'claimed']

function LostAndFound() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [lostFoundData, setLostFoundData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newItem, setNewItem] = useState({ itemName: '', category: '', location: '', description: '' })

  // Fetch lost and found data
  useEffect(() => {
    fetchLostFound();
  }, []);

  const fetchLostFound = async () => {
    try {
      setLoading(true);
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setLostFoundData(sampleLostFoundData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLostFoundData(sampleLostFoundData);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search criteria
  const filteredData = lostFoundData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSearch = () => {
    // Search is already reactive, this just triggers re-render
  };

  const handleSubmitItem = (e) => {
    e.preventDefault();
    const newId = lostFoundData.length + 1;
    const newEntry = {
      ...newItem,
      id: newId,
      dateFound: new Date().toISOString().split('T')[0],
      status: 'unclaimed'
    };
    setLostFoundData([newEntry, ...lostFoundData]);
    setShowModal(false);
    setNewItem({ itemName: '', category: '', location: '', description: '' });
  };

  // Stats
  const totalItems = lostFoundData.length
  const unclaimedItems = lostFoundData.filter(item => item.status === 'unclaimed').length
  const claimedItems = lostFoundData.filter(item => item.status === 'claimed').length

  return (
    <div className="lostandfound-container">
      {/* Stats Section */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-number">{totalItems}</span>
          <span className="stat-text">Total Items</span>
        </div>
        <div className="stat-item unclaimed">
          <span className="stat-number">{unclaimedItems}</span>
          <span className="stat-text">Unclaimed</span>
        </div>
        <div className="stat-item claimed">
          <span className="stat-number">{claimedItems}</span>
          <span className="stat-text">Claimed</span>
        </div>
        <button className="report-button" onClick={() => setShowModal(true)}>
          + Report Lost Item
        </button>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">Lost & Found</h2>
        <p className="search-subtitle">Find or report lost items on campus</p>
        
        <div className="search-form">
          {/* Search Input */}
          <div className="form-group search-group">
            <label className="form-label">Search</label>
            <div className="input-wrapper">
              <input
                type="text"
                className="form-input"
                placeholder="Search by item name, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}</option>
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
          {loading ? 'Loading...' : `Found ${filteredData.length} item${filteredData.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Results Grid */}
      <div className="results-grid">
        {loading ? (
          <div className="loading">Loading lost & found items...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : filteredData.length > 0 ? (
          filteredData.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <div className="item-icon">
                  <LostFoundIcon />
                </div>
                <span className={`status-badge ${item.status}`}>
                  {item.status === 'unclaimed' ? 'Unclaimed' : 'Claimed'}
                </span>
              </div>
              
              <h3 className="item-name">{item.itemName}</h3>
              
              <div className="item-info">
                <div className="info-row">
                  <CategoryIcon />
                  <span className="info-value">{item.category}</span>
                </div>
                <div className="info-row">
                  <CalendarIcon />
                  <span className="info-value">Found: {item.dateFound}</span>
                </div>
              </div>
              
              <p className="item-location">Location: {item.location}</p>
              
              <p className="item-description">{item.description}</p>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No items found matching your criteria.</p>
            <p>Try adjusting your search filters or report a lost item.</p>
          </div>
        )}
      </div>

      {/* Modal for reporting lost item */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Report Lost Item</h3>
            <form onSubmit={handleSubmitItem}>
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter item name..."
                  value={newItem.itemName}
                  onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Last Known Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Where was it lost?"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Describe the item in detail..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  rows="3"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="submit-button">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inline Styles */}
      <style>{`
        .lostandfound-container {
          padding: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .stats-row {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          align-items: center;
        }

        .stat-item {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 700;
        }

        .stat-text {
          font-size: 12px;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .stat-item.unclaimed .stat-number {
          color: var(--warning);
        }

        .stat-item.claimed .stat-number {
          color: var(--success);
        }

        .report-button {
          margin-left: auto;
          padding: 12px 24px;
          background: linear-gradient(135deg, #ff6b6b, #ff4757);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .report-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 71, 87, 0.3);
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
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 14px 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
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

        .item-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .item-card:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
        }

        .item-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .item-icon {
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

        .status-badge.unclaimed {
          background: #ffaa0033;
          color: var(--warning);
        }

        .status-badge.claimed {
          background: #00ff8833;
          color: var(--success);
        }

        .item-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-value {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .item-location {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }

        .item-description {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
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

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 32px;
          width: 90%;
          max-width: 500px;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .cancel-button {
          flex: 1;
          padding: 12px 24px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-button:hover {
          background: var(--border-color);
        }

        .submit-button {
          flex: 1;
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--accent-cyan), #0088ff);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
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
          
          .stats-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .report-button {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default LostAndFound
