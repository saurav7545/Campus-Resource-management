# ER Diagram - CRN (Campus Resource Navigator)

## Entities

### 1. RESOURCE (Base Entity - Abstract)
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK) | Unique identifier |
| name | VARCHAR | Resource name |
| location | VARCHAR | Physical location |
| capacity | INT | Total capacity |
| available | INT | Available seats |
| status | ENUM | available/occupied |

### 2. CLASSROOM (Weak Entity - specialization of Resource)
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK, FK→Resource) | Foreign key to Resource |
| course | VARCHAR | Course name |
| year | VARCHAR | Year (1st, 2nd, 3rd, 4th) |
| section | VARCHAR | Section (A, B, C, D) |

### 3. LAB (Weak Entity - specialization of Resource)
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK, FK→Resource) | Foreign key to Resource |
| type | VARCHAR | Lab type |
| equipment_id | INT (FK→Equipment) | Equipment foreign key |

### 4. LIBRARY (Weak Entity - specialization of Resource)
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK, FK→Resource) | Foreign key to Resource |
| hours | VARCHAR | Operating hours |
| floors | INT | Number of floors |

### 5. SEMINAR (Weak Entity - specialization of Resource)
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK, FK→Resource) | Foreign key to Resource |
| features | VARCHAR | Seminar features |

### 6. SPECIALLAB (Weak Entity - specialization of Resource)
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK, FK→Resource) | Foreign key to Resource |
| research_area | VARCHAR | Research specialization |
| equipment_id | INT (FK→Equipment) | Equipment foreign key |

### 7. COURSE
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK) | Unique identifier |
| name | VARCHAR | Course name |

### 8. BUILDING
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK) | Unique identifier |
| name | VARCHAR | Building name |

### 9. YEAR
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK) | Unique identifier |
| name | VARCHAR | Year name (1st, 2nd, 3rd, 4th) |

### 10. SECTION
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK) | Unique identifier |
| name | VARCHAR | Section name (A, B, C, D) |

### 11. EQUIPMENT
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK) | Unique identifier |
| name | VARCHAR | Equipment name |

### 12. RESEARCH_AREA
| Attribute | Type | Description |
|-----------|------|-------------|
| id | INT (PK) | Unique identifier |
| name | VARCHAR | Research area name |

---

## Relationships

```
                    ┌─────────────────┐
                    │     COURSE      │
                    │─────────────────│
                    │ id (PK)         │
                    │ name            │
                    └────────┬────────┘
                             │
                             │ 1:N
                             ▼
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│   BUILDING  │     │    CLASSROOM    │     │    YEAR     │
│─────────────│     │─────────────────│     │─────────────│
│ id (PK)     │◄────│ id (PK, FK)     │     │ id (PK)     │
│ name        │     │ name            │     │ name        │
└──────┬──────┘     │ course_id (FK)  │     └──────┬──────┘
       │            │ year_id (FK)    │            │
       │            │ section_id (FK) │            │ 1:N
       │            │ building_id (FK)│            │
       │            └────────┬────────┘            │
       │                     │                      │
       │ 1:N                 │ 1:1                  │
       ▼                     ▼                      ▼
┌──────────────────────────────────────────────────────────────┐
│                        RESOURCE                               │
│──────────────────────────────────────────────────────────────│
│ id (PK)           │ name          │ location                │
│ capacity          │ available     │ status                  │
└─────────────────────────┬───────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│     LAB       │  │    LIBRARY    │  │    SEMINAR    │
│───────────────│  │───────────────│  │───────────────│
│ id (PK, FK)   │  │ id (PK, FK)   │  │ id (PK, FK)   │
│ type          │  │ hours         │  │ features      │
│ equipment_id  │  │ floors        │  │               │
└───────────────┘  └───────────────┘  └───────┬───────┘
                                              │
                                              ▼
                              ┌───────────────────────────┐
                              │       SPECIALLAB          │
                              │───────────────────────────│
                              │ id (PK, FK)               │
                              │ research_area             │
                              │ equipment_id              │
                              └────────────┬──────────────┘
                                           │
                     ┌─────────────────────┼─────────────────────┐
                     │                     │                     │
                     ▼                     ▼                     ▼
            ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
            │    EQUIPMENT   │    │  RESEARCH_AREA │    │    BUILDING    │
            │────────────────│    │────────────────│    │────────────────│
            │ id (PK)        │    │ id (PK)        │    │ (already shown)│
            │ name          │    │ name           │    └────────────────┘
            └────────────────┘    └────────────────┘
```

---

## Relationship Details

| Relationship | Entity 1 | Entity 2 | Type | Description |
|--------------|----------|----------|------|--------------|
| has | Classroom | Course | N:1 | A classroom belongs to one course |
| has | Classroom | Year | N:1 | A classroom is for one year |
| has | Classroom | Section | N:1 | A classroom has one section |
| located_in | Resource | Building | N:1 | Resources are located in buildings |
| specializes | Classroom | Resource | 1:1 | Classroom is a type of Resource |
| specializes | Lab | Resource | 1:1 | Lab is a type of Resource |
| specializes | Library | Resource | 1:1 | Library is a type of Resource |
| specializes | Seminar | Resource | 1:1 | Seminar is a type of Resource |
| specializes | SpecialLab | Resource | 1:1 | SpecialLab is a type of Resource |
| has | Lab | Equipment | N:M | Labs have equipment |
| has | SpecialLab | Equipment | N:M | SpecialLabs have equipment |
| has | SpecialLab | ResearchArea | N:1 | SpecialLabs have research areas |

---

## Cardinality Notation Summary

- **Resource** (1) ────< (N) **Building** : Many resources can be in one building
- **Classroom** (N) ────< (1) **Course** : Many classrooms belong to one course
- **Classroom** (N) ────< (1) **Year** : Many classrooms for one year
- **Classroom** (N) ────< (1) **Section** : Many classrooms have one section
- **Classroom** (N) ────< (1) **Building** : Many classrooms in one building
- **Lab** (N) ────< (1) **Building** : Many labs in one building
- **Lab** (N) ────< (N) **Equipment** : Labs can have multiple equipment
- **Library** (N) ────< (1) **Building** : Many libraries in one building
- **Seminar** (N) ────< (1) **Building** : Many seminars in one building
- **SpecialLab** (N) ────< (1) **Building** : Many special labs in one building
- **SpecialLab** (N) ────< (1) **ResearchArea** : Many labs for one research area
- **SpecialLab** (N) ────< (N) **Equipment** : Special labs can have multiple equipment

---

## Entity-Relationship Diagram (Mermaid Syntax)

```
mermaid
erDiagram
    COURSE ||--o{ CLASSROOM : "belongs to"
    YEAR ||--o{ CLASSROOM : "assigned to"
    SECTION ||--o{ CLASSROOM : "has"
    BUILDING ||--o{ CLASSROOM : "located in"
    BUILDING ||--o{ LAB : "located in"
    BUILDING ||--o{ LIBRARY : "located in"
    BUILDING ||--o{ SEMINAR : "located in"
    BUILDING ||--o{ SPECIALLAB : "located in"
    
    RESOURCE ||--o| CLASSROOM : "specializes"
    RESOURCE ||--o| LAB : "specializes"
    RESOURCE ||--o| LIBRARY : "specializes"
    RESOURCE ||--o| SEMINAR : "specializes"
    RESOURCE ||--o| SPECIALLAB : "specializes"
    
    LAB }o--o{ EQUIPMENT : "has"
    SPECIALLAB }o--o{ EQUIPMENT : "has"
    SPECIALLAB ||--o| RESEARCH_AREA : "specializes in"

    COURSE {
        int id PK
        string name
    }

    YEAR {
        int id PK
        string name
    }

    SECTION {
        int id PK
        string name
    }

    BUILDING {
        int id PK
        string name
    }

    RESOURCE {
        int id PK
        string name
        string location
        int capacity
        int available
        string status
    }

    CLASSROOM {
        int id PK
        string name
        string course
        string year
        string section
    }

    LAB {
        int id PK
        string name
        string type
    }

    LIBRARY {
        int id PK
        string name
        string hours
        int floors
    }

    SEMINAR {
        int id PK
        string name
        string features
    }

    SPECIALLAB {
        int id PK
        string name
        string research_area
    }

    EQUIPMENT {
        int id PK
        string name
    }

    RESEARCH_AREA {
        int id PK
        string name
    }
