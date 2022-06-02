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
    fetch(`${location.origin}/like_post/  `, {
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

// Infinite Scrolling with Ajax
let mainSide = document.querySelector(".main-side").classList;
let laodData = document.querySelector(".data-loading");
const paginationLink = document.querySelectorAll(".pagination-link");
let formInput = document.getElementById("search");

const option = {
  root: null,
  threshold: 0.5,
};
const observer = new IntersectionObserver(GetData, option);
let page = 2;

function GetData(entries) {
  const entry = entries[0];

  if (entry.isIntersecting) {
    fetch(
      `${document.location.origin}?${
        formInput.value !== "" ? `search=${formInput.value}&` : ""
      }page=${page}`,
      {
        headers: {
          method: "GET",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    )
      .then((response) => response.json())
      .then((posts) => {
        posts.forEach((post) => {
          const html = `
                <div class="post-card">
                  <div class="d-flex">
                    <a href="/user_profile/${post.profile_id}">
                     <img src="${
                       post.profile_image
                     }" alt="user-image" class="user-image">
                    </a>
                    <div class="post-heading">
                      <h4 class="username">${post.username}</h4>
                      <small class="date">${post.date}</small>
                    </div>
                  </div>
                  <div class="post-info">
                    <h3 class="title">${
                      post.title === null ? "" : post.title
                    }</h3>
                    ${
                      post.post_image_name == "kindpng_4517876.png"
                        ? ""
                        : `<img src="${post.post_image}" alt="" class="image">`
                    }
                    <p class="body">
                      ${
                        post.body.length > 150
                          ? post.body.slice(0, 150) +
                            `... <a href="post_details/${post.post_id}" class="read-more cl-fb">Read more</a>`
                          : post.body
                      }
                    </p>
                    
                  </div>
                    <div class="comments d-flex">
                      <a href="post_details/${
                        post.post_id
                      }"><i class="far fa-comment-alt comment"> ${
            post.comment
          }</i></a>
                      <div class="">
                      <i class="fa${
                        post.user_liked ? "s" : "r"
                      } fa-thumbs-up likes" id="${post.post_id}"></i>
                        <span class="total_likes">${post.total_comment}</span>
                      </div>
                    </div>
                </div> 
              
                `;
          laodData.insertAdjacentHTML("beforeBegin", html);

          if (!post.has_next) {
            observer.unobserve(laodData);
            laodData.style.display = "none";
          }
        });
      });
    page++;
  }
}
observer.observe(laodData);



