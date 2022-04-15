const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const successHandle = require('./utils/successHandle');
const errorHandle = require('./utils/errorHandle');
const findPosts = require('./findPosts');
const createPosts = require('./createPosts');
const deletePosts = require('./deletePosts');
const updatePosts = require('./updatePosts');
const { HTTP_STATUS, ERROR_MESSAGE, REQUEST_METHOD } = require('./constants/index');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB)
    .then(() => console.log('資料庫連線成功'))
    .catch(() => console.log('資料庫連線失敗'));

const requestListener = async (req, res) => {
    const { url, method } = req;
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    if (url == '/posts' && method == REQUEST_METHOD.GET) {
        findPosts(res);
    } else if (url == '/posts' && method == REQUEST_METHOD.POST) {
        req.on('end', async () => {
            createPosts(res, body);
        });
    } else if (url == '/posts' && method == REQUEST_METHOD.DELETE) {
        deletePosts(res);
    } else if (url.startsWith('/posts/') && method == REQUEST_METHOD.DELETE) {
        deletePosts(res, req);
    } else if (url.startsWith('/posts/') && method == REQUEST_METHOD.PATCH) {
        req.on('end', async () => {
            updatePosts(res, body, req);
        });
    } else if (method == 'OPTIONS') {
        successHandle(res);
    } else {
        errorHandle(res, {
            code: HTTP_STATUS.NOT_FOUND,
            message: ERROR_MESSAGE.NOT_FOUND_ROUTE,
        });
    }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
