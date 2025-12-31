function clearActive() {
  navItems.forEach(function (item) {
    item.classList.remove("active");
  });
}

window.addEventListener("scroll", function () {
  var scrollPos = window.scrollY;

  clearActive();

  if (scrollPos >= 0 && scrollPos < 743) {
    mainNav.classList.add("active");
  } else if (scrollPos >= 743 && scrollPos < 1819) {
    aboutNav.classList.add("active");
  } else if (scrollPos >= 1819 && scrollPos < 2767) {
    workNav.classList.add("active");
  } else if (scrollPos >= 2767 && scrollPos < 4931) {
    expiNav.classList.add("active");
  } else if (scrollPos >= 4931 && scrollPos < 6916) {
    touNav.classList.add("active");
  } else {
    commNav.classList.add("active");
  }
});

document
  .getElementById("theme-toggle-button")
  .addEventListener("click", function () {
    document.querySelector("html").classList.toggle("dark");
    if (document.querySelector("html").classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

function theme() {
  if (localStorage.getItem("theme") === "dark") {
    document.querySelector("html").classList.add("dark");
  } else {
    document.querySelector("html").classList.remove("dark");
  }
}

theme();
//###########################################

var portfolioGrid = document.getElementById("portfolio-grid");
var cards = portfolioGrid.querySelectorAll("[data-category]");

var normalClasses = [
  "bg-white",
  "dark:bg-slate-800",
  "text-slate-600",
  "dark:text-slate-300",
  "border-slate-300",
  "dark:border-slate-700",
  "hover:bg-slate-100",
  "dark:hover:bg-slate-700",
];

var activeClasses = [
  "bg-linear-to-r",
  "from-primary",
  "to-secondary",
  "text-white",
  "hover:shadow-lg",
  "hover:shadow-primary/50",
  "active",
];

var portFilterBtns = document.querySelectorAll(".portfolio-filter");

portFilterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    portFilterBtns.forEach((b) => {
      b.classList.remove(...activeClasses, "active");
      b.classList.add(...normalClasses);
    });

    this.classList.remove(...normalClasses);
    this.classList.add(...activeClasses, "active");

    var filter = this.dataset.filter;

    cards.forEach((card) => {
      var category = card.dataset.category;

      if (filter === "all" || category === filter) {
        showCard(card);
      } else {
        hideCard(card);
      }
    });
  });
});

function hideCard(card) {
  card.classList.add("hide");
  card.classList.remove("show");

  setTimeout(() => {
    card.style.display = "none";
  }, 300);
}

function showCard(card) {
  card.style.display = "block";

  requestAnimationFrame(() => {
    card.classList.remove("hide");
    card.classList.add("show");
  });
}

//##############################################################

var settingBtn = document.getElementById("settings-toggle");
var closeSide = document.getElementById("close-settings");

settingBtn.addEventListener("click", function () {
  document
    .querySelector("#settings-sidebar")
    .classList.remove("translate-x-full");
  settingBtn.style.right = "20rem";
});

closeSide.addEventListener("click", function () {
  document.querySelector("#settings-sidebar").classList.add("translate-x-full");
  settingBtn.style.right = "0";
});

//##########################################################

var carousel = document.getElementById("testimonials-carousel");

var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");

var indicators = document.querySelectorAll(".carousel-indicator");

var transitions = ["trans1", "trans2", "trans3", "trans4"];
var currentIndex = 0;

carousel.classList.add(transitions[currentIndex]);
setActiveIndicator(currentIndex);

function goToSlide(index) {
  carousel.classList.remove(transitions[currentIndex]);

  currentIndex = index;

  carousel.classList.add(transitions[currentIndex]);
  setActiveIndicator(currentIndex);
}

function setActiveIndicator(realIndex) {
  var indicatorsCount = indicators.length;
  var indicatorIndex = indicatorsCount - 1 - realIndex;

  indicators.forEach((btn) => {
    btn.classList.remove("bg-accent", "scale-125");
    btn.classList.add("bg-slate-400", "dark:bg-slate-600");
    btn.setAttribute("aria-selected", "false");
  });

  indicators[indicatorIndex].classList.remove(
    "bg-slate-400",
    "dark:bg-slate-600"
  );
  indicators[indicatorIndex].classList.add("bg-accent", "scale-125");
  indicators[indicatorIndex].setAttribute("aria-selected", "true");
}

nextBtn.addEventListener("click", function () {
  var prevIndex = (currentIndex - 1 + transitions.length) % transitions.length;
  goToSlide(prevIndex);
});

prevBtn.addEventListener("click", function () {
  var nextIndex = (currentIndex + 1) % transitions.length;
  goToSlide(nextIndex);
});

indicators.forEach((btn) => {
  btn.addEventListener("click", function () {
    var indicatorIndex = Number(this.dataset.index);
    var realIndex = transitions.length - 1 - indicatorIndex;
    goToSlide(realIndex);
  });
});
