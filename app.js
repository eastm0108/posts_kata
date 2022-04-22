const routes = require('./routes');
require('./connection');

const app = async (req, res) => {
    routes(req, res);
};

module.exports = app;
