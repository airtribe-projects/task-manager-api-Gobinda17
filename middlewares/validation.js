const dataValidation = (req, res, next) => {
    const {title, description, priority} = req.body;
    if(!title || !description || !priority) {
        res.status(400).json({
            status: 'fail',
            message: `${!title ? 'Title' : !description ? 'Description' : !priority ? 'Priority Level' : ''} is required`
        });
    }
    next();
}

const queryValidation = (req, res, next) => {
    const completed = req.query.completed;
    if(completed !== undefined && (completed !== 'true' && completed !== 'false')) {
        res.status(400).json({
            status: 'fail',
            message: 'Query parameter should be either true or false'
        });
    }
    next();

}

module.exports = {dataValidation, queryValidation};