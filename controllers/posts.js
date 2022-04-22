const Posts = require('../models/posts');
const successHandle = require('../utils/successHandle');
const errorHandle = require('../utils/errorHandle');
const { HTTP_STATUS, ERROR_MESSAGE } = require('../constants/index');

const posts = {
    async createPosts({ res, data }) {
        try {
            const post = JSON.parse(data);
            if (post.content == '') {
                errorHandle(res, {
                    code: HTTP_STATUS.BAD_REQUEST,
                    message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                    error,
                });
            } else {
                const newPost = await Posts.create({ ...post });
                successHandle(res, newPost);
            }
        } catch (error) {
            errorHandle(res, {
                code: HTTP_STATUS.BAD_REQUEST,
                message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                error,
            });
        }
    },
    async findPosts({ res }) {
        try {
            const posts = await Posts.find();

            successHandle(res, posts);
        } catch (error) {
            errorHandle(res, {
                code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: error,
            });
        }
    },
    async deletePosts({ res, req = null }) {
        if (!req) {
            await Posts.deleteMany({});

            successHandle(res, []);
        } else {
            try {
                const id = req.url?.split('/')?.pop();
                const result = await Posts.findByIdAndDelete(id);

                if (result) {
                    successHandle(res, result);
                } else {
                    errorHandle(res, {
                        code: HTTP_STATUS.BAD_REQUEST,
                        message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                        error,
                    });
                }
            } catch (error) {
                errorHandle(res, {
                    code: HTTP_STATUS.BAD_REQUEST,
                    message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                    error,
                });
            }
        }
    },
    async updatePosts({ res, body, req }) {
        try {
            const id = req.url?.split('/')?.pop();
            const post = JSON.parse(body);

            if (post.hasOwnProperty('content') && post.content === '') {
                errorHandle(res, {
                    code: HTTP_STATUS.BAD_REQUEST,
                    message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                    error,
                });
            } else {
                const result = await Posts.findByIdAndUpdate(id, { ...post });

                if (result) {
                    successHandle(res, result);
                } else {
                    errorHandle(res, {
                        code: HTTP_STATUS.BAD_REQUEST,
                        message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                        error,
                    });
                }
            }
        } catch (error) {
            errorHandle(res, {
                code: HTTP_STATUS.BAD_REQUEST,
                message: ERROR_MESSAGE.NOT_FOUND_ID_OR_DATA_ERROR,
                error,
            });
        }
    },
};

module.exports = posts;
