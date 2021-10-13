"use strict";

//todo Selecting all the necessary elements

//BUTTONS
const btnOpenModal = document.querySelector(".nav_item-btn");
const btnLeftSlide = document.querySelector(".btn_left");
const btnRightSlide = document.querySelector(".btn_right");
const btnFooterModal = document.querySelector(".a_open-modal");
const btnFooterToTop = document.querySelector(".btn_footer");
//NAV BAR
const navBar = document.querySelector(".nav");
const navLinks = document.querySelector(".nav_links");

//SECTIONS
const sectionOne = document.querySelector("#section-1");
const sectionShow = document.querySelectorAll(".section");

//SLIDES
const slides = document.querySelectorAll(".div_slide");

//MODAL
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn_close-modal");
const btnSendModal = document.querySelector(".btn_send-modal");

//FOOTER
const footerItems = document.querySelector(".ul_footer");

//!MAIN CODE
//?GIVING NAV BAR STICKY
const navObCallFunc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};
const navObserver = new IntersectionObserver(navObCallFunc, {
  root: null,
  threshold: 0.95,
});

navObserver.observe(sectionOne);

//?IMPLEMENTING NAV BAR ITEMS SMOOTH SCROLLS
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav_item")) {
    const getHref = e.target.getAttribute("href");
    document.querySelector(getHref).scrollIntoView({ behavior: "smooth" });
  }
});
//?IMPLEMENTING REVEALING ELEMENT
const obseCallFunc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section_hidden");
  observeReveal.unobserve(entry.target);
};
const observeReveal = new IntersectionObserver(obseCallFunc, {
  root: null,
  threshold: 0.1,
});

sectionShow.forEach(function (sec) {
  sec.classList.add("section_hidden");
  observeReveal.observe(sec);
});

//?IMPLEMENTING SLIDER CHANGE
//**Creating a variable to count each slide */
let countSlides = 0;
//*Creating a variable to count the total amount of slides */
const maxSlides = slides.length;

const previousSlide = () => {
  if (countSlides === 0) countSlides = maxSlides - 1;
  else countSlides--;

  goToSlide(countSlides);
};
const nextSlide = () => {
  if (countSlides === maxSlides - 1) countSlides = 0;
  else countSlides++;

  goToSlide(countSlides);
};
const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
btnLeftSlide.addEventListener("click", previousSlide);
btnRightSlide.addEventListener("click", nextSlide);

//?IMPLEMENTING LAZY IMAGES CHANGE
//Selecting all img elements with data-src attribute
const imgsDataSrc = document.querySelectorAll("img[data-src]");
const imgObCallFunc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () =>
    entry.target.classList.remove("img-lazy")
  );
};

const imgObserver = new IntersectionObserver(imgObCallFunc, {
  root: null,
  threshold: 0.01,
});
imgsDataSrc.forEach((img) => imgObserver.observe(img));

//?OPEN MODAL

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
btnFooterModal.addEventListener("click", openModal);

//? GO BACK TO TOP
btnFooterToTop.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  const hrefTop = e.target.getAttribute("href");
  document.querySelector(hrefTop).scrollIntoView({ behavior: "smooth" });
});

//?NAVIGATION IN FOOTER
footerItems.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("a_footer-link")) {
    const getHref = e.target.getAttribute("href");
    document.querySelector(getHref).scrollIntoView({ behavior: "smooth" });
  }
});

//?SENDING EMAIL
function emailSent() {
  const name = document.getElementById("name").value;

  alert(
    ` Obrigado pelo contacto, ${name}! Entrarei em contacto o mais breve possível =)`
  );
}
