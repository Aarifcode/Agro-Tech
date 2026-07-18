// script.js - AgroTech website
// handles navbar, dark mode, slider, gallery, faq etc

document.addEventListener('DOMContentLoaded', function () {

  // loading spinner - hide after page load
  var loader = document.querySelector('.loader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (loader) loader.classList.add('hide');
    }, 300);
  });

  // navbar shadow + scroll to top button show/hide
  var navbar = document.querySelector('.navbar');
  var scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', function () {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,.10)';
      } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,.05)';
      }
    }
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.onclick = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // mobile menu toggle
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });
    var links = navMenu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    }
  }

  // dark mode toggle button
  var modeBtn = document.querySelector('.mode-toggle');
  if (modeBtn) {
    // check saved theme
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      modeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    modeBtn.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      var dark = document.body.classList.contains('dark-mode');
      modeBtn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    });
  }

  // animated counters for stats section
  var counters = document.querySelectorAll('.stat-count');
  counters.forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'));
    var suffix = el.getAttribute('data-suffix') || '';
    var count = 0;
    var step = target / 60;
    var timer = setInterval(function () {
      count += step;
      if (count >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(count) + suffix;
      }
    }, 20);
  });

  // testimonial slider
  var slides = document.querySelectorAll('.testi-slide');
  var dots = document.querySelectorAll('.testi-dots span');
  var current = 0;
  function showSlide(i) {
    for (var j = 0; j < slides.length; j++) {
      slides[j].classList.remove('active');
    }
    for (var k = 0; k < dots.length; k++) {
      dots[k].classList.remove('active');
    }
    slides[i].classList.add('active');
    if (dots[i]) dots[i].classList.add('active');
    current = i;
  }
  if (dots.length) {
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showSlide(i); });
    });
    setInterval(function () {
      showSlide((current + 1) % slides.length);
    }, 5000);
  }

  // gallery lightbox
  var galleryImgs = document.querySelectorAll('.gallery-item img');
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = document.querySelector('.lightbox img');
  var lightboxClose = document.querySelector('.lightbox-close');
  if (galleryImgs.length && lightbox) {
    galleryImgs.forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      });
    });
    lightboxClose.addEventListener('click', function () {
      lightbox.classList.remove('active');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // gallery filter buttons
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // faq accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // contact form and newsletter form - just show a message, no backend yet
  var forms = document.querySelectorAll('.contact-form, .newsletter-form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var oldText = btn.innerHTML;
      btn.innerHTML = 'Sent';
      setTimeout(function () {
        btn.innerHTML = oldText;
        form.reset();
      }, 2000);
    });
  });

  // highlight current page in nav menu
  var page = location.pathname.split('/').pop();
  if (page === '') page = 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });

});
