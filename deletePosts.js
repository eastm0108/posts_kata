const Posts = require('./models/posts');
const successHandle = require('./utils/successHandle');
const errorHandle = require('./utils/errorHandle');
const { HTTP_STATUS, ERROR_MESSAGE } = require('./constants/index');

async function deletePosts(res, req = null) {
    if (!req) {
        await Posts.deleteMany({});

        successHandle(res, []);
    } else {
        try {
            const id = req.url?.split('/')?.pop();
            const result = await Posts.findByIdAndDelete(id);

            successHandle(res, result);
        } catch (error) {
            errorHandle(res, {
                code: HTTP_STATUS.BAD_REQUEST,
                message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                error,
            });
        }
    }
}

module.exports = deletePosts;
