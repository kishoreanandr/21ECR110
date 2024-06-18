const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;
let numberWindow = [];

app.use(express.json()); // to handle JSON payload

const isQualifiedId = (id) => ['p', 'f', 'e', 'r'].includes(id);

const fetchNumber = async (id, token) => {
  const url = `http://20.244.56.144/test/numbers/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 500,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

app.post('/numbers/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  if (!isQualifiedId(id)) {
    return res.status(400).send('Invalid number ID');
  }

  const previousState = [...numberWindow];
  const fetchedNumbers = await fetchNumber(id, token);

  if (fetchedNumbers) {
    fetchedNumbers.forEach((num) => {
      if (!numberWindow.includes(num)) {
        if (numberWindow.length >= windowSize) {
          numberWindow.shift();
        }
        numberWindow.push(num);
      }
    });
  }

  const average = calculateAverage(numberWindow);

  res.json({
    windowPrevState: previousState,
    windowCurrState: numberWindow,
    numbers: fetchedNumbers,
    avg: average.toFixed(2),
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
