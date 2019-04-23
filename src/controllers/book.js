import DB from '../../models';
import {Op} from 'sequelize';
import paginate from 'express-paginate';

function formFielsdValidation(fields) {
	const errors = [];
	for (let prop in fields) {
		if (!fields[prop]) {
			errors.push(`${prop} is required`);
		}
	}
	return errors;
}

function renderErrorTemplate(res, error) {
	res.render('error', {
		error
	});
}

export const listing = async (req, res) => {
	try {
		const query = req.query.q;
		let books;

		if (!query) {
			books = await DB.Books.findAndCountAll({
				where: {
					title: {
						[Op.not]: null
					}
				},
				limit: req.query.limit,
				offset: req.skip
			});
		} else {
			books = await DB.Books.findAndCountAll({
				where: {
					[Op.or]: [
						{
							title: {
								[Op.like]: `%${query}%`
							}
						}, 
						{
							author: {
								[Op.like]: `%${query}%`
							}
						},
						{
							genre: {
								[Op.like]: `%${query}%`
							}
						},
						{
							year: {
								[Op.like]: `%${query}%`
							}
						}
					],
				},
				limit: req.query.limit,
				offset: req.skip
			});
		}
		
		const pageTitle = 'Book listing';
		const itemCount = books.count;
		const pageCount = Math.ceil(itemCount / req.query.limit);

		res.render('book/listing', {
			pageTitle,
			pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
			books: books.rows
		});
	} catch (error) {
		renderErrorTemplate(res, error);
	}
}

export const showFormCreateNewBook = (req, res) => {
	const pageTitle = 'Creating New Book';
	res.render('book/form', {
		pageTitle
	});
}

export const handleFormCreateNewBook = async (req, res) => {
	try {
		const body = req.body;
		const errors = formFielsdValidation(body);
		const pageTitle = 'Creating New Book';
		const {
			title,
			author,
			genre,
			year
		} = body;

		if (errors.length > 0) {
			res.render('book/form', {
				pageTitle,
				errors
			});
			return;
		}

		const newBook = await DB.Books.create({
			title,
			author,
			genre,
			year
		});
		res.redirect('/books');
	} catch (error) {
		renderErrorTemplate(res, error);
	}
}

export const detail = async (req, res) => {
	try {
		const id = req.params.id;
		const pageTitle = 'Book Detail';
		const book = await DB.Books.findByPk(id);

		if (!book) {
			const error = new Error('Invalid Book ID');
			error.status = 500;
			renderErrorTemplate(res, error);
			return;
		}

		res.render('book/detail', {
			book,
			pageTitle
		});
	} catch (error) {
		renderErrorTemplate(res, error);
	}
}

export const updateBook = async (req, res) => {
	try {
		const body = req.body;
		const errors = formFielsdValidation(body);
		const id = req.params.id;
		const pageTitle = 'Updating Book';
		const {
			title,
			author,
			genre,
			year
		} = body;
		const book = await DB.Books.findByPk(id);

		if (!book) {
			const error = new Error('Invalid Book ID');
			error.status = 500;
			renderErrorTemplate(res, error);
			return;
		}

		if (errors.length > 0) {
			res.render('book/detail', {
				pageTitle,
				book,
				errors
			});
			return;
		}

		const updatedBook = await book.update({
			title,
			author,
			genre,
			year
		});
		res.redirect('/books');
	} catch (error) {
		renderErrorTemplate(res, error);
	}
}

export const deleteBook = async (req, res) => {
	try {
		const id = req.params.id;
		const deletedBook = await DB.Books.destroy({
			where: {
				id
			}
		});


		if (!deletedBook) {
			const error = new Error('Invalid Book ID');
			error.status = 500;
			renderErrorTemplate(res, error);
			return;
		}

		res.redirect('/books');
	} catch (error) {
		renderErrorTemplate(res, error);
	}
}