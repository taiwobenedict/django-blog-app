const toggler = document.querySelector(".toggler");
const bars = document.querySelector(".toggler i");
const navHeight = document.querySelector(".main-nav");
const likes = document.querySelectorAll(".likes");
const delModal = document.querySelector(".del-modal");
const delPost = document.querySelector(".del-post");

toggler.onclick = () => {
  bars.classList.toggle("fa-bars");
  bars.classList.toggle("fa-times");
  toggler.classList.toggle("rotate");

  navHeight.style.height =
    navHeight.clientHeight == 0 ? navHeight.scrollHeight + 24 : 0;
};

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("del-post")) {
    delModal.classList.toggle("hidden");
    delModal.onclick = () => {
      delModal.classList.toggle("hidden");
    };
  }
});

// Like Post Asynchroniously

document.body.addEventListener("click", likePost);
function likePost(e) {
  
  if (e.target.classList.contains("likes")) {
    e.preventDefault();
    const like = e.target;
    const id = like.id;

    const csrftoken = document.cookie.slice(10);
    fetch(`${location.origin}/like_post/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "X-Requested-With": "XMLHttpRequest",
      },
      mode: "same-origin",
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.liked) {
          like.classList.replace("far", "fas");
        } else {
          like.classList.replace("fas", "far");
        }
        like.nextElementSibling.innerText = data.total_likes;
      });
  }
}
