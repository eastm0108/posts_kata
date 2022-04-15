const { HEADERS } = require('../constants/index');

function successHandle(res, data = null) {
    if (!data) {
        res.writeHead(200, HEADERS);
        res.end();
    } else {
        res.writeHead(200, HEADERS);
        res.write(
            JSON.stringify({
                status: 'success',
                posts: data,
            })
        );
        res.end();
    }
}

module.exports = successHandle;
