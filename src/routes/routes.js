import {
    Router
} from 'express';

import {
    listing,
    detail,
    showFormCreateNewBook,
    handleFormCreateNewBook,
    updateBook,
    deleteBook
} from '../controllers/book';

const router = Router();

router.get('/', (req, res) => {
    res.redirect('/books');
});

router.get('/books', listing);

router.get('/books/new', showFormCreateNewBook);

router.post('/books/new', handleFormCreateNewBook);

router.get('/books/:id', detail);

router.post('/books/:id/update', updateBook);

router.post('/books/:id/delete', deleteBook);

export default router;