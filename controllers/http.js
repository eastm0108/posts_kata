const successHandle = require('../utils/successHandle');
const errorHandle = require('../utils/errorHandle');
const { HTTP_STATUS, ERROR_MESSAGE } = require('../constants/index');

const http = {
    cors(res) {
        successHandle(res);
    },
    notFound(res) {
        errorHandle(res, {
            code: HTTP_STATUS.NOT_FOUND,
            message: ERROR_MESSAGE.NOT_FOUND_ROUTE,
        });
    },
};

module.exports = http;
