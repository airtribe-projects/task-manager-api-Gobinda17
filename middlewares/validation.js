const dataValidation = (req, res, next) => {
    const { title, description, completed, priority } = req.body;
    if (!title || !description || typeof (completed) !== 'boolean') {
        res.status(400).json({
            status: 'fail',
            message: `${!title ? 'Title is required.' : !description ? 'Description is required.' : typeof (completed) !== 'boolean' ? 'Completed should be boolean.' : ''}`
        });
    }
    if (!priority) {
        req.body = { ...req.body, priority: "low" };
    }
    next();
}

const queryValidation = (req, res, next) => {
    const completed = req.query.completed;
    if (completed !== undefined && (completed !== 'true' && completed !== 'false')) {
        res.status(400).json({
            status: 'fail',
            message: 'Query parameter should be either true or false'
        });
    }
    next();

}

module.exports = { dataValidation, queryValidation };