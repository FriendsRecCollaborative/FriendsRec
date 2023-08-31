const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config()
const app = express();
const port = 8080;
const fetch = require('cross-fetch')


app.use(cors());
app.use(express.json());

// statically serve everything in the dist folder on the route '/dist'
// app.use('/dist', express.static(path.join(__dirname, '../client/build/static')));

const reviewRouter = require('./routers/reviewRouter');
const authRouter = require('./routers/authRouter')

app.use('/api/review', reviewRouter);
app.use('/api/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../client/build/index.html');
    return res.status(200).sendFile(indexPath);
  })
}
// serve index.html on the route '/'.
// The '/*' is to make sure refresh in browser works with frontend routing (https://ui.dev/react-router-cannot-get-url-refresh)
// if (process.env.NODE_ENV === 'production') {
//   app.get('/*', (req, res) =>
//     res.status(200).sendFile(path.join(__dirname, '../client/build/index.html'))
//   );
// }


/*
 * To-Do: Add a 404 page backup route
 */

app.post('/api/map', async (req, res, next) => {
  const { lat, lng } = req.body.location
  try {
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=restaurant&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(googlePlacesUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});