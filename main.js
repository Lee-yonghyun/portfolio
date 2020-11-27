"use strict" /* 엄격한 오류 검사를 위해 */;

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
/* navbar 선택자(element) */
const navbarHeight = navbar.getBoundingClientRect().height;
/* navbar의 height*/

document.addEventListener("scroll", () => {
  console.log(Math.round(window.scrollY)); /* 현재 스크롤 위치 */
  // console.log(`navbarHeight: ${navbarHeight}`);

  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
// 1) navbarmenu의 섹션을 클릭한다.
// 2) 해당 섹션으로 스크롤과 뷰가 이동한다.
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  // console.log(event.target);

  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }

  // console.log(event.target.dataset.link);
  scrollIntoView(link);
  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({
  //   behavior: "smooth",
  //   // block: "end",
  //   // inline: "nearest",
  // });
});

// Handle click on 'contact me' button on home

const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
// 1) 현재 스크롤이, 점점 내려갈수록
// 2) background를 뺀 나머지로 점점 투명해 지도록(중간쯤에서 투명도0.5)

const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// show Arrow up bnt when scrolling dowm
// 1) Arrow bnt 만들기(position:fixed 고정)
// 2) 특정위치에서 생기고 (none ->display:block) (부드럽게?)
// 3) 클릭시 -> 맨위로 올리기 (scrollIntoView이용)

const arrowBnt = document.querySelector(".arrowupBnt");

document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowBnt.classList.add("visible");

    arrowBnt.addEventListener("click", () => {
      scrollIntoView("#home");
    });
  } else {
    arrowBnt.classList.remove("visible");
  }
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
