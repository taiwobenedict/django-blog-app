// const url = `ws://${window.location.host}/ws/like-post/`;
// const socket = new WebSocket(url);
// const likeBtn = document.querySelectorAll(".likes");
// const totalLikes = document.querySelectorAll(".total_likes");

// likeBtn.forEach((like, i) => {
//   like.addEventListener("click", (e) => {
//     const likeElement = totalLikes[i];

//     socket.send(
//       JSON.stringify({
//         likeId: like.id,
//       })
//     );

//     console.log(like.id);

//     socket.onmessage = (e) => {
//       const postLikes = JSON.parse(e.data);
//       likeElement.textContent = postLikes.total_likes;
//       // console.log(postLikes);
//     };
//   });
// });

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



document.body.addEventListener('click', function (e) {
  if (e.target.classList.contains('del-post')) {
    delModal.classList.toggle('hidden')
    delModal.onclick = () => {
      delModal.classList.toggle("hidden");
    }
  }
})

