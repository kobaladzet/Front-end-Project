

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
    loop: true,
  });

  const slideCounterHTML = `
    <div class="custom-slide-counter">
        <button class="custom-prev">&#10094;</button>
        <span class="custom-counter">1/4</span>
        <button class="custom-next">&#10095;</button>
    </div>
  `;

  const slideContents = document.querySelectorAll('.slide-content');
  const swiperSlides = document.querySelectorAll('.swiper-slide');

  // Insert counter inside each slide-content (once on page load)
  slideContents.forEach(slideContent => {
    slideContent.insertAdjacentHTML('beforeend', slideCounterHTML);
  });

  function attachButtonListeners() {
    document.querySelectorAll(".custom-prev").forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.replaceWith(newBtn);
    });
    document.querySelectorAll(".custom-next").forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.replaceWith(newBtn);
    });

    document.querySelectorAll(".custom-prev").forEach(btn => {
      btn.addEventListener("click", () => swiper.slidePrev());
    });
    document.querySelectorAll(".custom-next").forEach(btn => {
      btn.addEventListener("click", () => swiper.slideNext());
    });
  }

  attachButtonListeners();

  function addCounters() {
    swiperSlides.forEach(slide => {
      if (!slide.querySelector('.custom-slide-counter')) {
        slide.insertAdjacentHTML('beforeend', slideCounterHTML);
      }
    });
    attachButtonListeners();  
  }

  function removeCounters() {
    swiperSlides.forEach(slide => {
      const counter = slide.querySelector('.custom-slide-counter');
      if (counter) {
        counter.remove();
      }
    });
  }

  function checkWidthAndUpdate() {
    if (window.innerWidth < 1024) {
      removeCounters();
      addCounters();
    } 
  }

  checkWidthAndUpdate();

  const totalSlides = swiper.slides.length;

  function updateCounters() {
    const counters = document.querySelectorAll(".custom-counter");
    const current = swiper.realIndex + 1; // 1-based index of current slide
    counters.forEach(counter => {
      counter.textContent = `${current}/${totalSlides}`;
    });
  }

  swiper.on("slideChange", updateCounters);

  updateCounters();
  

  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });

  window.toggleDropdown = function(event) {
    event.preventDefault();
    const dropdown = event.target.closest('.dropdown');
    dropdown.classList.toggle('active');
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      navMenu.classList.remove('active');
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkWidthAndUpdate, 150);
  });
});
