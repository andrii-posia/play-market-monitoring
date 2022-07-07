const errorRespondHandler = (err, req, res, next) => {
    if (!err.status) res.status(500).json({message: 'Internal server error'});

    res.status(err.status).json(err);
};

module.exports = errorRespondHandler;
