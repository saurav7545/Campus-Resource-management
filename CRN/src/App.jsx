import React, { useState } from 'react'
import './App.css'
import Classroom from './component/classroom'
import Lab from './component/lab'
import Library from './component/library'
import Seminar from './component/seminar'
import SpecialLab from './component/speciallab'
import ExamSeating from './component/examseating'
import LostAndFound from './component/lostandfound'
import Campus3D from './component/campus3d'
import QuickAccessCards from './component/QuickAccessCards'

// Icons as simple SVG components
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1"/>
    <rect x="14" y="3" width="7" height="5" rx="1"/>
    <rect x="14" y="12" width="7" height="9" rx="1"/>
    <rect x="3" y="16" width="7" height="5" rx="1"/>
  </svg>
)

const ClassroomIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h20v18H2z"/>
    <path d="M6 7h4M6 11h4M6 15h4M14 7h4M14 11h4M14 15h4"/>
  </svg>
)

const LabIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
    <circle cx="7" cy="10" r="1"/>
    <circle cx="12" cy="10" r="1"/>
    <circle cx="17" cy="10" r="1"/>
  </svg>
)

const LibraryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 7h8M8 11h8M8 15h4"/>
  </svg>
)

const SeminarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const SpecialLabIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
)

const ExamSeatingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <path d="M9 12h6M9 16h6"/>
  </svg>
)

const LostFoundIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4"/>
    <path d="M12 16h.01"/>
  </svg>
)

const Campus3DIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 20h20"/>
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
    <path d="M12 7v10"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const DoorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18"/>
    <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
    <circle cx="17" cy="12" r="1"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18"/>
    <path d="M5 21V7l8-4 8 4v14"/>
    <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)

// Sample data for resources
const resourcesData = [
  { id: 1, name: 'Computer Lab 1', type: 'lab', location: 'Building A, Floor 1', capacity: 40, available: 28, status: 'available', icon: <LabIcon /> },
  { id: 2, name: 'Classroom 101', type: 'classroom', location: 'Building A, Floor 2', capacity: 60, available: 0, status: 'occupied', icon: <ClassroomIcon /> },
  { id: 3, name: 'Main Library', type: 'library', location: 'Building B, Floor 1', capacity: 200, available: 156, status: 'available', icon: <LibraryIcon /> },
  { id: 4, name: 'Seminar Hall A', type: 'seminar', location: 'Building C, Floor 3', capacity: 100, available: 0, status: 'occupied', icon: <SeminarIcon /> },
  { id: 5, name: 'Special Lab - AI', type: 'speciallab', location: 'Building D, Floor 2', capacity: 25, available: 25, status: 'available', icon: <SpecialLabIcon /> },
  { id: 6, name: 'Computer Lab 2', type: 'lab', location: 'Building A, Floor 1', capacity: 35, available: 0, status: 'occupied', icon: <LabIcon /> },
  { id: 7, name: 'Classroom 102', type: 'classroom', location: 'Building A, Floor 2', capacity: 50, available: 50, status: 'available', icon: <ClassroomIcon /> },
  { id: 8, name: 'Conference Room', type: 'seminar', location: 'Building C, Floor 1', capacity: 20, available: 20, status: 'available', icon: <SeminarIcon /> },
]

function App() {
  const [activeNav, setActiveNav] = useState('dashboard')

const navItems = [
    { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { id: 'classrooms', icon: <ClassroomIcon />, label: 'Classrooms' },
    { id: 'labs', icon: <LabIcon />, label: 'Labs' },
    { id: 'library', icon: <LibraryIcon />, label: 'Library' },
    { id: 'seminars', icon: <SeminarIcon />, label: 'Seminars' },
    { id: 'speciallabs', icon: <SpecialLabIcon />, label: 'Special Labs' },
{ id: 'examseating', icon: <ExamSeatingIcon />, label: 'Exam Seating' },
    { id: 'lostandfound', icon: <LostFoundIcon />, label: 'Lost & Found' },
    { id: 'campus3d', icon: <Campus3DIcon />, label: '3D Campus' },
  ]

// Calculate stats
  const totalResources = resourcesData.length
  const availableResources = resourcesData.filter(r => r.status === 'available').length
  const occupiedResources = resourcesData.filter(r => r.status === 'occupied').length
  const totalCapacity = resourcesData.reduce((acc, r) => acc + r.capacity, 0)
  const totalAvailable = resourcesData.reduce((acc, r) => acc + r.available, 0)

  // Get page title based on active nav
  const getPageTitle = () => {
    switch(activeNav) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Welcome back! Monitor campus resources in real-time' }
      case 'classrooms':
        return { title: 'Classrooms', subtitle: 'Find and book classroom spaces' }
      case 'labs':
        return { title: 'Labs', subtitle: 'Computer labs and specialized laboratories' }
      case 'library':
        return { title: 'Library', subtitle: 'Study spaces and resources' }
      case 'seminars':
        return { title: 'Seminars', subtitle: 'Seminar halls and conference rooms' }
case 'speciallabs':
        return { title: 'Special Labs', subtitle: 'Specialized research laboratories' }
      case 'examseating':
        return { title: 'Exam Seating', subtitle: 'Find exam venues and available seating' }
case 'lostandfound':
        return { title: 'Lost & Found', subtitle: 'Find or report lost items on campus' }
      case 'campus3d':
        return { title: '3D Campus', subtitle: 'Explore campus in 3D view' }
      default:
        return { title: 'Dashboard', subtitle: 'Welcome back! Monitor campus resources in real-time' }
    }
  }

  const pageTitle = getPageTitle()

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>CRN</h1>
          <span>Campus Resource Navigator</span>
        </div>
        <ul className="nav-menu">
          {navItems.map(item => (
            <li 
              key={item.id} 
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-title">
            <h2>{pageTitle.title}</h2>
            <p>{pageTitle.subtitle}</p>
          </div>
          <div className="header-actions">
            <QuickAccessCards onNavigate={setActiveNav} />
            <div className="search-box">
              <span className="search-icon"><SearchIcon /></span>
              <input type="text" placeholder="Search resources..." />
            </div>
            <div className="user-avatar">AD</div>
          </div>
        </header>

        {/* Content based on active navigation */}
        {activeNav === 'dashboard' && (
          <div className="dashboard-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon blue"><BuildingIcon /></div>
                </div>
                <div className="stat-value">{totalResources}</div>
                <div className="stat-label">Total Resources</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon green"><DoorIcon /></div>
                </div>
                <div className="stat-value">{availableResources}</div>
                <div className="stat-label">Available Now</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon orange"><UsersIcon /></div>
                </div>
                <div className="stat-value">{occupiedResources}</div>
                <div className="stat-label">Currently Occupied</div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon red"><ClockIcon /></div>
                </div>
                <div className="stat-value">{totalCapacity}</div>
                <div className="stat-label">Total Seats</div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="section-header">
              <h3 className="section-title">Campus Resources</h3>
            </div>
            
            <div className="resources-grid">
              {resourcesData.map(resource => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-header">
                    <div className="resource-icon">{resource.icon}</div>
                    <span className={`resource-status ${resource.status}`}>
                      {resource.status === 'available' ? 'Available' : resource.status === 'occupied' ? 'Occupied' : 'Closed'}
                    </span>
                  </div>
                  <h4 className="resource-name">{resource.name}</h4>
                  <p className="resource-location">
                    <LocationIcon /> {resource.location}
                  </p>
                  <div className="resource-details">
                    <div className="resource-detail">
                      <span className="resource-detail-label">Capacity</span>
                      <span className="resource-detail-value">{resource.capacity}</span>
                    </div>
                    <div className="resource-detail">
                      <span className="resource-detail-label">Available</span>
                      <span className="resource-detail-value">{resource.available}</span>
                    </div>
                    <div className="resource-detail">
                      <span className="resource-detail-label">Type</span>
                      <span className="resource-detail-value" style={{ textTransform: 'capitalize' }}>{resource.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === 'classrooms' && <Classroom />}
        
        {activeNav === 'labs' && <Lab />}

        {activeNav === 'library' && <Library />}

        {activeNav === 'seminars' && <Seminar />}

{activeNav === 'speciallabs' && <SpecialLab />}

        {activeNav === 'examseating' && <ExamSeating />}

{activeNav === 'lostandfound' && <LostAndFound />}

        {activeNav === 'campus3d' && <Campus3D />}
      </main>
    </div>
  )
}

export default App
