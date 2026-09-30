// Fleura — shared site script

document.addEventListener('DOMContentLoaded', function () {

  // Auto-collapse the mobile nav after a link is tapped
  var navLinks = document.querySelectorAll('#navMenu .nav-link');
  var navCollapseEl = document.getElementById('navMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapseEl && navCollapseEl.classList.contains('show') && window.bootstrap) {
        var collapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
        collapse.hide();
      }
    });
  });

  // Contact page form: no backend yet, so confirm submission client-side
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      var alertBox = document.getElementById('contactFormAlert');
      if (alertBox) {
        alertBox.classList.remove('d-none');
        alertBox.textContent = 'Thanks! Your message has been received — we will get back to you within 1 business day.';
      }
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  // Any newsletter / subscribe form on any page
  document.querySelectorAll('.subscribe-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var msg = form.querySelector('.subscribe-msg');
      if (input && input.value) {
        if (msg) { msg.textContent = 'Subscribed! Watch your inbox for seasonal offers.'; msg.classList.remove('d-none'); }
        form.reset();
      }
    });
  });

  // Play button on the hero opens the video modal (Bootstrap handles the modal itself,
  // this just makes sure the video restarts from the beginning each time it opens)
  var heroVideoModal = document.getElementById('heroVideoModal');
  if (heroVideoModal) {
    var heroVideoEl = heroVideoModal.querySelector('video');
    heroVideoModal.addEventListener('shown.bs.modal', function () {
      if (heroVideoEl) { heroVideoEl.currentTime = 0; heroVideoEl.play(); }
    });
    heroVideoModal.addEventListener('hidden.bs.modal', function () {
      if (heroVideoEl) { heroVideoEl.pause(); }
    });
  }

  // Footer year
  var yearEl = document.getElementById('footerYear');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
