import axios from 'axios';

const url = '/api/posts/';

class PostService {
  // Get posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios.get(url).then((res) => {
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            creationDate: new Date(post.creationDate)
          }))
        );
      }).catch((err) => reject(err));
    });
  }

  // Create post
  static createPost(text) {
    return axios.post(url, {text});
  }

  // Delete post
  static deletePost(postId) {
    return axios.delete(`${url}${postId}`);
  }

}

export default PostService;