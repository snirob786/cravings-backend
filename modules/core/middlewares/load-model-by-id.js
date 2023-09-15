module.exports = function (options, populate) {
  return function (req, res, next) {
    var model = options.model.findOne({ _id: req.params.id });
    if (options.populate != undefined) {
      for (let field of options.populate) {
        model.populate({ path: field });
      }
    }
    model.exec((err, doc) => {
      if (err) return next(err);
      if (!doc) return next(404);
      req['model'] = doc;
      next();
    });
  }
}