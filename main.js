"use strict" /* 엄격한 오류 검사를 위해 */;

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  // console.log(Math.round(window.scrollY)); /* 현재 스크롤 위치 */

  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Handle scrolling when tapping on the navbar menu
// 1) navbarmenu의 섹션을 클릭한다.
// 2) 해당 섹션으로 스크롤과 뷰가 이동한다.
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");

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
  } else {
    arrowBnt.classList.remove("visible");
  }
});

arrowBnt.addEventListener("click", () => {
  scrollIntoView("#home");
});

// project filtering & annimation
// 1) 기본적으로 보여지고, 눌렀을때 해당되는 것 외에 것은 제거
// 1) dataset을 이용한다. & classlist를 이용
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  // console.log(projects[0]);
  // console.log(projects[0].dataset.type);

  if (filter == null) {
    return;
  }

  // projectContainer.classList.add("anim-out");

  // projects.forEach((project) => {
  //   // console.log(project.dataset.type);
  //   if (filter === "*" || filter === project.dataset.type) {
  //     project.classList.remove("invisible");
  //   } else {
  //     project.classList.add("invisible");
  //   }
  // });

  // setTimeout(() => {
  //   projectContainer.classList.remove("anim-out");
  // }, 300);

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  // 비동기적 처리하기!
  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    projects.forEach((project) => {
      // console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// Scroll 활성화하기
// 1. 모든 섹션 요소들과 메뉴item 가지고 온다. (section별 id이용)
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // when 스크롤링(관찰대상이 루트 요소를 빠져나가면, 다음메뉴 선택)
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // console.log(entry.target.id, entry.boundingClientRect);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  // 맨위 스크롤 home
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    // 맨아래 스크롤일때 contact
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  // nav메뉴 활성화
  selectNavItem(navItems[selectedNavIndex]);
});

// 수동으로 메뉴선택이 에러발생. 전체화면에서 testimonial 선택시. scroll이 중복 발생.
// 사용자가 마우스나 트랙패드를 이용해서 스크롤 이벤트하는 경우, wheel
// 기존, scroll은 scrollIntoView에 의해 움직이는 스크롤링까지 포함.
