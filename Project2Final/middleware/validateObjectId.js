const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.render('error', {
            message: "Invalid item ID",
            code: 400
        });
    }
    next();
};

module.exports = validateObjectId; 