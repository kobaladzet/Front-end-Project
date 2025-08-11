

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper
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

  // Select all .slide-content elements
  const slideContents = document.querySelectorAll('.slide-content');
  // Select all .swiper-slide elements
  const swiperSlides = document.querySelectorAll('.swiper-slide');

  // Insert counter inside each slide-content (once on page load)
  slideContents.forEach(slideContent => {
    slideContent.insertAdjacentHTML('beforeend', slideCounterHTML);
  });

  // Function to attach click handlers to all prev/next buttons
  function attachButtonListeners() {
    // Remove old listeners by replacing buttons with clones
    document.querySelectorAll(".custom-prev").forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.replaceWith(newBtn);
    });
    document.querySelectorAll(".custom-next").forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.replaceWith(newBtn);
    });

    // Re-select buttons after cloning and attach click listeners
    document.querySelectorAll(".custom-prev").forEach(btn => {
      btn.addEventListener("click", () => swiper.slidePrev());
    });
    document.querySelectorAll(".custom-next").forEach(btn => {
      btn.addEventListener("click", () => swiper.slideNext());
    });
  }

  // Attach listeners to the initially added counters
  attachButtonListeners();

  // Functions to add/remove counters inside swiper slides (used below)
  function addCounters() {
    swiperSlides.forEach(slide => {
      if (!slide.querySelector('.custom-slide-counter')) {
        slide.insertAdjacentHTML('beforeend', slideCounterHTML);
      }
    });
    attachButtonListeners();  // Attach listeners after adding counters dynamically
  }

  function removeCounters() {
    swiperSlides.forEach(slide => {
      const counter = slide.querySelector('.custom-slide-counter');
      if (counter) {
        counter.remove();
      }
    });
  }

  // Function to check viewport width and update counters accordingly
  function checkWidthAndUpdate() {
    if (window.innerWidth < 1024) {
      removeCounters();
      addCounters();
    } 
  }

  // Run on load
  checkWidthAndUpdate();

  // Swiper slides count for counter update
  const totalSlides = swiper.slides.length;

  // Select all counters to update text
  const counters = document.querySelectorAll(".custom-counter");

  // Update all counters text to current slide number
  function updateCounters() {
    const current = swiper.realIndex + 1; // 1-based index of current slide
    counters.forEach(counter => {
      counter.textContent = `${current}/${totalSlides}`;
    });
  }

  // Update counters on slide change
  swiper.on("slideChange", updateCounters);

  // Initial counter update
  updateCounters();

  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });

  // Handle dropdown toggles in mobile menu
  window.toggleDropdown = function(event) {
    event.preventDefault();
    const dropdown = event.target.closest('.dropdown');
    dropdown.classList.toggle('active');
  };

  // Close mobile menu when window is resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      navMenu.classList.remove('active');
      // Also close any open dropdowns
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Run checkWidthAndUpdate on window resize with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkWidthAndUpdate, 150);
  });
});
