const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/resources/classrooms',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('API Response:');
      console.log(`Total classrooms: ${jsonData.length}`);
      if (jsonData.length > 0) {
        console.log('First classroom:', JSON.stringify(jsonData[0], null, 2));
      }
    } catch (e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.end();
