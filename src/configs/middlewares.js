import bodyParser from 'body-parser';
import paginate from 'express-paginate';
import logger from 'morgan';

export default app => {
    app.set('port', process.env.PORT);

    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(paginate.middleware(10, 50));
}

export const notFoundErrorHandling = (req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
};

export const errorHandling = (err, req, res, next) => {
    res.status(err.status);
    res.render('error', {
        error: err
    });
}