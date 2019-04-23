require('dotenv').config();

import express from 'express';
import path from 'path';

import middlewares, {notFoundErrorHandling, errorHandling} from './configs/middlewares';
import routes from './routes/routes';

const app = express();

// serve static files 
app.use(express.static(path.join(__dirname, '../public')));

// set views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

middlewares(app);

app.use(routes);

app.use(notFoundErrorHandling);
app.use(errorHandling);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});