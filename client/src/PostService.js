import axios from axios;

const port = process.env.PORT || 5000;
const url = (process.env.URL || 'http://localhost:') + port + '/api/posts/';

class PostService {
  // Get posts
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            creationDate: new Date(post.creationDate)
          }))
        );
      } catch(error) {
        reject(error);
      }
    });
  }

  // Create post
  static createPost(text) {
    return axios.post(url, {
      text
    });
  }

  // Delete post
  static deletePost(postId) {
    return axios.delete(`${url}${id}`);
  }

}

export default PostService;