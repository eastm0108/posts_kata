const HttpControllers = require('../controllers/http');
const PostsControllers = require('../controllers/posts');

const routes = async (req, res) => {
    const { url, method } = req;
    console.log(method, url);

    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    if (url == '/posts' && method == 'GET') {
        PostsControllers.findPosts({ res });
    } else if (url == '/posts' && method == 'POST') {
        req.on('end', async () => PostsControllers.createPosts({ res, body }));
    } else if (url == '/posts' && method == 'DELETE') {
        PostsControllers.deletePosts({ res });
    } else if (url.startsWith('/posts/') && method == 'DELETE') {
        PostsControllers.deletePosts({ res, req });
    } else if (url.startsWith('/posts/') && method == 'PATCH') {
        req.on('end', async () => PostsControllers.updatePosts({ res, body, req }));
    } else if (method == 'OPTIONS') {
        HttpControllers.cors(res);
    } else {
        HttpControllers.notFound(res);
    }
};

module.exports = routes;
