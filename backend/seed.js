const https = require('https');
const http = require('http');

// Function to make POST request
function postData(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          resolve(data);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

async function seedDatabase() {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/resources/seed',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log('Seeding database...');
    const response = await postData(options, '');
    console.log('Response:', response);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    console.log('\nMake sure:');
    console.log('1. MongoDB is running on your machine');
    console.log('2. Backend server is running (npm run dev)');
  }
}

seedDatabase();
