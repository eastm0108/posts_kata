const Posts = require('./models/posts');
const successHandle = require('./utils/successHandle');
const errorHandle = require('./utils/errorHandle');
const { HTTP_STATUS } = require('./constants/index');

async function findPosts(res) {
    try {
        const posts = await Posts.find();

        successHandle(res, posts);
    } catch (error) {
        errorHandle(res, {
            code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: error,
        });
    }
}

module.exports = findPosts;
