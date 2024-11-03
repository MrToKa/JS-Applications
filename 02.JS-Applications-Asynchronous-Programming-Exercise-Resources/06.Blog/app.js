function attachEvents() {
  const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
  const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";

  const elements = {
    btnLoadPosts: document.getElementById("btnLoadPosts"),
    btnViewPost: document.getElementById("btnViewPost"),
    posts: document.getElementById("posts"),
    postTitle: document.getElementById("post-title"),
    postBody: document.getElementById("post-body"),
    postComments: document.getElementById("post-comments"),
  };

  elements.btnLoadPosts.addEventListener("click", loadPosts);
  elements.btnViewPost.addEventListener("click", displayPost);
  let commonData = {};

  function loadPosts() {
    fetch(postsUrl)
      .then((res) => res.json())
      .then((data) => {
        elements.posts.innerHTML = "";
        Object.values(data).forEach((post) => {
          const option = document.createElement("option");
          option.value = post.id;
          option.textContent = post.title;
          elements.posts.appendChild(option);
          commonData[post.id] = post;
        });
      })
      .catch((err) => console.error(err));
  }

  function displayPost() {
    const postId = elements.posts.value;
    const post = commonData[postId];
    elements.postTitle.textContent = post.title;
    elements.postBody.textContent = post.body;

    fetch(commentsUrl)
      .then((res) => res.json())
      .then((data) => {
        elements.postComments.innerHTML = "";
        Object.values(data).forEach((comment) => {
          if (comment.postId === postId) {
            const li = document.createElement("li");
            li.textContent = comment.text;
            elements.postComments.appendChild(li);
          }
        });
      })
      .catch((err) => console.error(err));
  }
}

attachEvents();
