const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// statically serve everything in the dist folder on the route '/dist'
// app.use('/dist', express.static(path.join(__dirname, '../client/build/static')));

const reviewRouter = require('./routers/reviewRouter');
const authRouter = require('./routers/authRouter')

app.use('/api/review', reviewRouter);
app.use('/api/auth', authRouter);


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