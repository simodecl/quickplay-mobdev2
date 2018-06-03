const Category = require('../models/category');
const errorHandler = require('../utilities/errorHandler');

exports.get_categories = function(req, res, next) {
  const query = Category.find().populate('posts');
  query.sort( { created_at: -1 } );
  query.exec((err, categories) => {
    if (err) return next(err);
    if (categories == null) {
      return errorHandler.handleAPIError(`Categories not found!`, next);
    }
    return res.json(categories);
  });
}

exports.get_category = function(req, res, next) {
  const id = req.params.id;
  const query = Category.findById(id).populate('posts');
  query.exec((err, category) => {
    if (err) return next(err);
    if (category == null) {
      return errorHandler.handleAPIError(`Category not found with id: ${id}`, next);
    }
    return res.json(category);
  });
}

exports.category_create_post = (req, res, next) => {
  if(!req.body || !req.body.name) {
    return errorHandler.handleAPIError(400, `Category must have a name`, next);
  }

  // Get fields
  const categoryFields = {};
  categoryFields.name = req.body.name;
  if (req.body.synopsis) categoryFields.synopsis = req.body.synopsis;

  const category = new Category(categoryFields);
  category.save((err, category) => {
    if (err) return errorHandler.handleAPIError(500, `Could not save the new category`, next);
    res.status(201).json(category);
  });
}