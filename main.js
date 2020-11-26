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
  console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({
    behavior: "smooth",
    // block: "end",
    // inline: "nearest",
  });
});
