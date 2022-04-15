const { HEADERS } = require('../constants/index');

function errorHandle(res, error = { code: 400, message: '', error: null }) {
    const { code, message } = error;

    res.writeHead(code, HEADERS);
    res.write(
        JSON.stringify({
            status: 'false',
            message,
            error,
        })
    );
    res.end();
}

module.exports = errorHandle;
