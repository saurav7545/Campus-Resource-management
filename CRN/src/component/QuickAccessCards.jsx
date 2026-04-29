import React from 'react'

// Icons as simple SVG components
const ClassroomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h20v18H2z"/>
    <path d="M6 7h4M6 11h4M6 15h4M14 7h4M14 11h4M14 15h4"/>
  </svg>
)

const LabIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
    <circle cx="7" cy="10" r="1"/>
    <circle cx="12" cy="10" r="1"/>
    <circle cx="17" cy="10" r="1"/>
  </svg>
)

const LibraryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M8 7h8M8 11h8M8 15h4"/>
  </svg>
)

const SeminarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

function QuickAccessCards({ onNavigate }) {
  const cards = [
    {
      id: 'classrooms',
      name: 'Classroom',
      icon: <ClassroomIcon />,
      color: '#00d4ff',
      bgColor: 'rgba(0, 212, 255, 0.15)',
      count: 10,
      available: 6
    },
    {
      id: 'labs',
      name: 'Lab',
      icon: <LabIcon />,
      color: '#00ff88',
      bgColor: 'rgba(0, 255, 136, 0.15)',
      count: 6,
      available: 4
    },
    {
      id: 'library',
      name: 'Library',
      icon: <LibraryIcon />,
      color: '#ffaa00',
      bgColor: 'rgba(255, 170, 0, 0.15)',
      count: 1,
      available: 1
    },
    {
      id: 'seminars',
      name: 'Seminar',
      icon: <SeminarIcon />,
      color: '#ff6b6b',
      bgColor: 'rgba(255, 107, 107, 0.15)',
      count: 2,
      available: 1
    }
  ]

  return (
    <div className="quick-access-cards">
      {cards.map((card) => (
        <div 
          key={card.id} 
          className="quick-access-card"
          onClick={() => onNavigate(card.id)}
          style={{ 
            '--card-color': card.color,
            '--card-bg': card.bgColor
          }}
        >
          <div className="quick-access-icon">
            {card.icon}
          </div>
          <div className="quick-access-info">
            <span className="quick-access-name">{card.name}</span>
            <span className="quick-access-count">
              {card.available}/{card.count} Available
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuickAccessCards
