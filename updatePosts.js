const Posts = require('./models/posts');
const successHandle = require('./utils/successHandle');
const errorHandle = require('./utils/errorHandle');
const { HTTP_STATUS, ERROR_MESSAGE } = require('./constants/index');

async function updatePosts(res, data, req) {
    try {
        const id = req.url?.split('/')?.pop();
        const post = JSON.parse(data);
        const result = await Posts.findByIdAndUpdate(id, { ...post });

        successHandle(res, result);
    } catch (error) {
        errorHandle(res, {
            code: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
            error,
        });
    }
}

module.exports = updatePosts;
