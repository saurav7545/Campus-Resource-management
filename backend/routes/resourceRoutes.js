const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const Classroom = require('../models/Classroom');
const Lab = require('../models/Lab');
const Library = require('../models/Library');
const Seminar = require('../models/Seminar');
const SpecialLab = require('../models/SpecialLab');

// GET /api/resources/classrooms - Get classrooms (optionally filter by CRN, course, year, section)
router.get('/classrooms', async (req, res) => {
  try {
    const { crn, course, year, section } = req.query;
    
    // Build filter object
    const filter = {};
    if (crn) filter.crn = crn;
    if (course) filter.course = { $regex: course, $options: 'i' };
    if (year) filter.year = year;
    if (section) filter.section = section;

    // Find classrooms with their associated resource
    const classrooms = await Classroom.find(filter).populate('resource');
    
    // Transform data to match frontend expected format
    const transformedData = classrooms.map(classroom => ({
      id: classroom._id,
      crn: classroom.crn,
      name: classroom.resource.name,
      course: classroom.course,
      year: classroom.year,
      section: classroom.section,
      location: `${classroom.resource.building}, Floor ${classroom.resource.floor}`,
      capacity: classroom.resource.capacity,
      available: classroom.resource.available,
      status: classroom.resource.status
    }));

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/resources/labs - Get labs
router.get('/labs', async (req, res) => {
  try {
    const { type } = req.query;
    
    const filter = {};
    if (type) filter.type = type;

    const labs = await Lab.find(filter).populate('resource');
    
    const transformedData = labs.map(lab => ({
      id: lab._id,
      name: lab.resource.name,
      location: `${lab.resource.building}, Floor ${lab.resource.floor}`,
      capacity: lab.resource.capacity,
      available: lab.resource.available,
      status: lab.resource.status,
      type: lab.type,
      equipment: lab.equipment
    }));

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/resources/libraries - Get libraries
router.get('/libraries', async (req, res) => {
  try {
    const libraries = await Library.find().populate('resource');
    
    const transformedData = libraries.map(lib => ({
      id: lib._id,
      name: lib.resource.name,
      location: `${lib.resource.building}, Floor ${lib.resource.floor}`,
      capacity: lib.resource.capacity,
      available: lib.resource.available,
      status: lib.resource.status,
      hours: lib.hours,
      floors: lib.floors
    }));

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/resources/seminars - Get seminars
router.get('/seminars', async (req, res) => {
  try {
    const { minCapacity, maxCapacity } = req.query;
    
    const seminars = await Seminar.find().populate('resource');
    
    let transformedData = seminars.map(seminar => ({
      id: seminar._id,
      name: seminar.resource.name,
      location: `${seminar.resource.building}, Floor ${seminar.resource.floor}`,
      capacity: seminar.resource.capacity,
      available: seminar.resource.available,
      status: seminar.resource.status,
      features: seminar.features
    }));

    // Filter by capacity if provided
    if (minCapacity) {
      transformedData = transformedData.filter(s => s.capacity >= parseInt(minCapacity));
    }
    if (maxCapacity) {
      transformedData = transformedData.filter(s => s.capacity <= parseInt(maxCapacity));
    }

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/resources/speciallabs - Get special labs
router.get('/speciallabs', async (req, res) => {
  try {
    const { researchArea } = req.query;
    
    const filter = {};
    if (researchArea) filter.researchArea = researchArea;

    const specialLabs = await SpecialLab.find(filter).populate('resource');
    
    const transformedData = specialLabs.map(lab => ({
      id: lab._id,
      name: lab.resource.name,
      location: `${lab.resource.building}, Floor ${lab.resource.floor}`,
      capacity: lab.resource.capacity,
      available: lab.resource.available,
      status: lab.resource.status,
      research: lab.researchArea,
      equipment: lab.equipment
    }));

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/resources/seed - Seed initial data (for development)
router.post('/seed', async (req, res) => {
  try {
    // Clear existing data
    await Resource.deleteMany({});
    await Classroom.deleteMany({});
    await Lab.deleteMany({});
    await Library.deleteMany({});
    await Seminar.deleteMany({});
    await SpecialLab.deleteMany({});

    // Create Resources and associated data
    // Classrooms
    const classroomResources = await Resource.insertMany([
      { name: 'Classroom 101', location: 'Building A, Floor 2', capacity: 60, available: 0, status: 'occupied', building: 'Building A', floor: 2 },
      { name: 'Classroom 102', location: 'Building A, Floor 2', capacity: 50, available: 50, status: 'available', building: 'Building A', floor: 2 },
      { name: 'Classroom 103', location: 'Building A, Floor 3', capacity: 55, available: 20, status: 'available', building: 'Building A', floor: 3 },
      { name: 'Classroom 104', location: 'Building A, Floor 3', capacity: 55, available: 0, status: 'occupied', building: 'Building A', floor: 3 },
      { name: 'Classroom 201', location: 'Building B, Floor 1', capacity: 45, available: 45, status: 'available', building: 'Building B', floor: 1 },
      { name: 'Classroom 202', location: 'Building B, Floor 1', capacity: 45, available: 0, status: 'occupied', building: 'Building B', floor: 1 },
      { name: 'Classroom 203', location: 'Building B, Floor 2', capacity: 40, available: 15, status: 'available', building: 'Building B', floor: 2 },
      { name: 'Classroom 301', location: 'Building C, Floor 1', capacity: 35, available: 35, status: 'available', building: 'Building C', floor: 1 },
      { name: 'Classroom 302', location: 'Building C, Floor 1', capacity: 35, available: 10, status: 'available', building: 'Building C', floor: 1 },
      { name: 'Classroom 303', location: 'Building C, Floor 2', capacity: 30, available: 0, status: 'occupied', building: 'Building C', floor: 2 },
    ]);

    await Classroom.insertMany([
      { resource: classroomResources[0]._id, crn: 'CS101A', course: 'Computer Science', year: '1st', section: 'A' },
      { resource: classroomResources[1]._id, crn: 'CS101B', course: 'Computer Science', year: '1st', section: 'B' },
      { resource: classroomResources[2]._id, crn: 'IT201A', course: 'Information Technology', year: '2nd', section: 'A' },
      { resource: classroomResources[3]._id, crn: 'IT201B', course: 'Information Technology', year: '2nd', section: 'B' },
      { resource: classroomResources[4]._id, crn: 'CS301A', course: 'Computer Science', year: '3rd', section: 'A' },
      { resource: classroomResources[5]._id, crn: 'CS301B', course: 'Computer Science', year: '3rd', section: 'B' },
      { resource: classroomResources[6]._id, crn: 'EL301A', course: 'Electronics', year: '3rd', section: 'A' },
      { resource: classroomResources[7]._id, crn: 'CS401A', course: 'Computer Science', year: '4th', section: 'A' },
      { resource: classroomResources[8]._id, crn: 'IT401A', course: 'Information Technology', year: '4th', section: 'A' },
      { resource: classroomResources[9]._id, crn: 'EL401A', course: 'Electronics', year: '4th', section: 'A' },
    ]);

    // Labs
    const labResources = await Resource.insertMany([
      { name: 'Computer Lab 1', location: 'Building A, Floor 1', capacity: 40, available: 28, status: 'available', building: 'Building A', floor: 1 },
      { name: 'Computer Lab 2', location: 'Building A, Floor 1', capacity: 35, available: 0, status: 'occupied', building: 'Building A', floor: 1 },
      { name: 'Computer Lab 3', location: 'Building A, Floor 2', capacity: 45, available: 15, status: 'available', building: 'Building A', floor: 2 },
      { name: 'Computer Lab 4', location: 'Building B, Floor 1', capacity: 30, available: 30, status: 'available', building: 'Building B', floor: 1 },
      { name: 'Physics Lab', location: 'Building B, Floor 2', capacity: 25, available: 10, status: 'available', building: 'Building B', floor: 2 },
      { name: 'Chemistry Lab', location: 'Building B, Floor 2', capacity: 20, available: 0, status: 'occupied', building: 'Building B', floor: 2 },
      { name: 'Biology Lab', location: 'Building B, Floor 2', capacity: 20, available: 0, status: 'occupied', building: 'Building B', floor: 2 },
    ]);

    await Lab.insertMany([
      { resource: labResources[0]._id, type: 'Computer Lab', equipment: ['Computers', 'Projector', 'AC'] },
      { resource: labResources[1]._id, type: 'Computer Lab', equipment: ['Computers', 'Projector'] },
      { resource: labResources[2]._id, type: 'Computer Lab', equipment: ['Computers', 'Projector', 'AC', 'Smartboard'] },
      { resource: labResources[3]._id, type: 'Computer Lab', equipment: ['Computers', 'AC'] },
      { resource: labResources[4]._id, type: 'Physics Lab', equipment: ['Lab Equipment', 'Projector'] },
      { resource: labResources[5]._id, type: 'Chemistry Lab', equipment: ['Lab Equipment', 'Fume Hood'] },
      { resource: labResources[6]._id, type: 'Biology Lab', equipment: ['Lab Equipment', 'Microscopes'] },
    ]);

    // Libraries
    const libraryResources = await Resource.insertMany([
      { name: 'Central Library', location: 'Building B, Floor 1', capacity: 200, available: 156, status: 'available', building: 'Building B', floor: 1 },
      { name: 'pharmacy Library', location: 'Building D, Floor 1', capacity: 100, available: 45, status: 'available', building: 'Building D', floor: 1 },
      { name: 'Digital Library', location: 'Building C, Floor 2', capacity: 50, available: 0, status: 'occupied', building: 'Building C', floor: 2 },
      { name: 'Law Library', location: 'Building E, Floor 1', capacity: 80, available: 60, status: 'available', building: 'Building E', floor: 1 },
    ]);

    await Library.insertMany([
      { resource: libraryResources[0]._id, hours: '8:00 AM - 10:00 PM', floors: 3 },
      { resource: libraryResources[1]._id, hours: '8:00 AM - 8:00 PM', floors: 2 },
      { resource: libraryResources[2]._id, hours: '9:00 AM - 6:00 PM', floors: 1 },
      { resource: libraryResources[3]._id, hours: '9:00 AM - 9:00 PM', floors: 2 },
    ]);

    // Seminars
    const seminarResources = await Resource.insertMany([
      { name: 'Seminar Hall A', location: 'Building C, Floor 3', capacity: 100, available: 0, status: 'occupied', building: 'Building C', floor: 3 },
      { name: 'Conference Room', location: 'Building C, Floor 1', capacity: 20, available: 20, status: 'available', building: 'Building C', floor: 1 },
      { name: 'Seminar Hall B', location: 'Building C, Floor 2', capacity: 75, available: 30, status: 'available', building: 'Building C', floor: 2 },
      { name: 'Meeting Room 1', location: 'Building C, Floor 1', capacity: 15, available: 15, status: 'available', building: 'Building C', floor: 1 },
      { name: 'Seminar Hall C', location: 'Building D, Floor 1', capacity: 150, available: 80, status: 'available', building: 'Building D', floor: 1 },
    ]);

    await Seminar.insertMany([
      { resource: seminarResources[0]._id, features: ['Projector', 'Microphone', 'AC'] },
      { resource: seminarResources[1]._id, features: ['TV Screen', 'Video Conferencing'] },
      { resource: seminarResources[2]._id, features: ['Projector', 'Microphone', 'Whiteboard'] },
      { resource: seminarResources[3]._id, features: ['TV Screen', 'Whiteboard'] },
      { resource: seminarResources[4]._id, features: ['Projector', 'Microphone', 'AC', 'Recording Equipment'] },
    ]);

    // Special Labs
    const specialLabResources = await Resource.insertMany([
      { name: 'AI Research Lab', location: 'Building D, Floor 2', capacity: 25, available: 25, status: 'available', building: 'Building D', floor: 2 },
      { name: 'Cyber Security Lab', location: 'Building D, Floor 3', capacity: 20, available: 0, status: 'occupied', building: 'Building D', floor: 3 },
      { name: 'Data Science Lab', location: 'Building D, Floor 2', capacity: 30, available: 15, status: 'available', building: 'Building D', floor: 2 },
      { name: 'Robotics Lab', location: 'Building E, Floor 1', capacity: 15, available: 10, status: 'available', building: 'Building E', floor: 1 },
      { name: 'Blockchain Lab', location: 'Building D, Floor 3', capacity: 18, available: 18, status: 'available', building: 'Building D', floor: 3 },
    ]);

    await SpecialLab.insertMany([
      { resource: specialLabResources[0]._id, researchArea: 'Artificial Intelligence', equipment: ['GPU Cluster', 'VR Headsets', 'Robots'] },
      { resource: specialLabResources[1]._id, researchArea: 'Cyber Security', equipment: ['Security Tools', 'Network Equipment'] },
      { resource: specialLabResources[2]._id, researchArea: 'Data Science', equipment: ['High Performance PCs', 'Big Data Tools'] },
      { resource: specialLabResources[3]._id, researchArea: 'Robotics', equipment: ['Robots', '3D Printers', 'Sensors'] },
      { resource: specialLabResources[4]._id, researchArea: 'Blockchain', equipment: ['Mining Rigs', 'Test Networks'] },
    ]);

    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
