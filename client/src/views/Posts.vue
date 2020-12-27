<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Post something updated... </label>
      <input
        type="text"
        id="create-post"
        v-model="newPostText"
        placeholder="Create post"
      />
      <button @click="createPost">Post!</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        @dblclick="deletePost(post._id)"
        v-for="(post, index) in posts"
        :key="index"
      >
        <div class="created-at">
          {{
            `${post.creationDate.getDate()}/${post.creationDate.getMonth()}/${post.creationDate.getFullYear()}`
          }}
        </div>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      error: "",
      newPostText: "",
    };
  },
  async created() {
    try {
      this.updatePosts(await PostService.getPosts());
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    updatePosts(newPosts) {
      this.posts = newPosts.sort(
        (b, a) => new Date(a.creationDate) - new Date(b.creationDate)
      );
    },
    async createPost() {
      this.error = "";

      if (this.newPostText.length > 0) {
        await PostService.createPost(this.newPostText);
        this.updatePosts(await PostService.getPosts());
      } else {
        this.error = "Posts can't be empty";
      }
    },
    async deletePost(postId) {
      this.error = "";

      await PostService.deletePost(postId);
      this.updatePosts(await PostService.getPosts());
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: lightgreen;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
