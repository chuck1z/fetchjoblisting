const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

app.get('/example/:id', (req, res) => {
  const id = req.params.id; // Get the value of the "id" parameter from the URL

  // Read the JSON file
  fs.readFile('output.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Error reading JSON file');
      return;
    }

    const jsonData = JSON.parse(data);

    // Check if the provided id exists in the JSON file
    if (jsonData[id]) {
      res.send(jsonData[id]); // Return the specific object with the provided id
    } else {
      res.status(404).send('Object not found');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
