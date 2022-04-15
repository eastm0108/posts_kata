const Posts = require('./models/posts');
const successHandle = require('./utils/successHandle');
const errorHandle = require('./utils/errorHandle');
const { HTTP_STATUS, ERROR_MESSAGE } = require('./constants/index');

async function createPosts(res, data) {
    try {
        const post = JSON.parse(data);
        const newPost = await Posts.create({ ...post });

        successHandle(res, newPost);
    } catch (error) {
        errorHandle(res, {
            code: HTTP_STATUS.BAD_REQUEST,
            message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
            error,
        });
    }
}

module.exports = createPosts;
